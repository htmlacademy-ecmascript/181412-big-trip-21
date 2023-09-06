import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {SortType, UserAction} from '../const.js';
import {sortPointsByDuration, sortPointsByPrice, sortPointsByDate} from '../utils/point.js';


export default class PointsListPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #presenterContainerElement = null; // DOM-элемент, куда положим весь презентер
  #pointsModel = null;

  #allPointPresenters = new Map();

  #currentSortType = SortType.DAY; // дефолтное состояние сортировки

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.#presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModeEvent);
  }

  get points() { // Получаем точки и сразу их сортируем в зависимости от установленного типа
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDate);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByDuration);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }
    return this.#pointsModel.points;
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
      this.#currentSortType = SortType.DEFAULT;
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

  #handleModeEvent = (updateType, data) => {
    switch (updateType) {
      case updateType.PATCH:
        this.#allPointPresenters.get(data.id).init(data, this.destinations, this.offers); // Обновить ЧАСТЬ списка, например, одну задачу
        break;
      case updateType.MINOR:
        this.#clearBoard(); // Обновили СПИСОК (например, удалили/добавили задачу)
        this.#renderBoard();
        break;
      case updateType.MAJOR:
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
