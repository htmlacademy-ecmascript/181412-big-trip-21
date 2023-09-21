import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import SortView from '../view/sort-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {UpdateType, SortType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import {sortPointsByDuration, sortPointsByPrice, sortPointsByDate} from '../utils/point.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PointsListPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();
  #headerInfoComponent = null;
  #presenterContainer = null; // DOM-элемент, куда положим весь презентер
  #headerInfoContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #isLoading = true;
  #isError = null;

  #allPointPresenters = new Map();
  #newPointPresenter = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #currentSortType = SortType.DAY; // дефолтное состояние сортировки
  #filterType = FilterType.EVERYTHING;

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainer, headerInfoContainer, pointsModel, filterModel, onNewTaskDestroy}) {
    this.#presenterContainer = presenterContainer; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#headerInfoContainer = headerInfoContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#isError = this.#pointsModel.error;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  // Отдельный приватный метод для отрисовки ОДНОЙ ТОЧКИ
  #renderPoint({point}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, this.destinations, this.offers);
    this.#allPointPresenters.set(point.id, pointPresenter);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.offers);

    // if(this.#noPointComponent !== null) {
    //   remove(this.#noPointComponent);
    // }
  }

  // Отдельный приватный метод для отрисовки СОРТИРОВКИ
  #renderSort() {
    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#presenterContainer, RenderPosition.AFTERBEGIN);
  }

  // Отдельный приватный метод для отрисовки ПУСТОГО ЛИСТА
  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType,
    });
    render(this.#noPointComponent, this.#presenterContainer);
    remove(this.#loadingComponent);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#presenterContainer);
  }

  #renderError() {
    render(this.#errorComponent, this.#presenterContainer);
  }

  #renderBoard() {
    const pointCount = this.points.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isError && !this.points.length || !this.destinations.length || !this.offers.length) {
      this.#renderError();
      return;
    }

    render(this.#pointListComponent, this.#presenterContainer); // вставили обертку ul

    if (!pointCount && !this.#isError) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();

      for (let i = 0; i < this.points.length; i++) {
        this.#renderPoint({point: this.points[i]});
      }
      this.#renderHeaderInfo();
    }
  }

  #renderHeaderInfo() {
    this.#headerInfoComponent = new HeaderInfoView(this.points, this.destinations, this.offers);
    render(this.#headerInfoComponent, this.#headerInfoContainer, RenderPosition.AFTERBEGIN);
  }

  // Отдельный приватный метод для ОЧИСТКИ списка точек
  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#allPointPresenters.forEach((presenter) => presenter.destroy());
    this.#allPointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#headerInfoComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderBoard();
  }

  // Метод вызывается, когда мы хотим выполнить какое-то действие, которое приводит к обновлению модели
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#allPointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#allPointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#allPointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#allPointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#allPointPresenters.get(data.id).init(data, this.destinations, this.offers); // Обновить ЧАСТЬ списка, например, одну задачу
        break;
      case UpdateType.MINOR:
        this.#clearBoard(); // Обновили СПИСОК (например, удалили/добавили задачу)
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true}); // Очистили доску, сбросили сортировку
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#allPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
