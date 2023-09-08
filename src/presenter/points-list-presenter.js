import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {UpdateType, SortType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import {sortPointsByDuration, sortPointsByPrice, sortPointsByDate} from '../utils/point.js';


export default class PointsListPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #sortComponent = null;
  #noPointComponent = null;
  #presenterContainerElement = null; // DOM-элемент, куда положим весь презентер
  #pointsModel = null;
  #filterModel = null;

  #allPointPresenters = new Map();

  #currentSortType = SortType.DAY; // дефолтное состояние сортировки
  #filterType = FilterType.EVERYTHING;

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel, filterModel}) {
    this.#presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

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

  // Отдельный приватный метод для отрисовки СОРТИРОВКИ
  #renderSort() {
    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#presenterContainerElement, RenderPosition.AFTERBEGIN);
  }

  // Отдельный приватный метод для отрисовки ПУСТОГО ЛИСТА
  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType,
    });
    render(this.#noPointComponent, this.#presenterContainerElement);
  }

  #renderBoard() {
    const pointCount = this.points.length;

    if(!pointCount) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      render(this.#pointListComponent, this.#presenterContainerElement); // вставили обертку ul
      for (let i = 0; i < this.points.length; i++) {
        this.#renderPoint({point: this.points[i]});
      }
    }
  }

  // Отдельный приватный метод для ОЧИСТКИ списка точек
  #clearBoard({resetSortType = false} = {}) {
    this.#allPointPresenters.forEach((presenter) => presenter.destroy());
    this.#allPointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderBoard();
  }

  // Метод вызывается, когда мы хотим выполнить какое-то действие, которое приводит к обновлению модели
  #handleViewAction = (actionType, updateType, update) => {
    //console.log({actionType, updateType, update});
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
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
    }
  };

  #handleModeChange = () => {
    this.#allPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
