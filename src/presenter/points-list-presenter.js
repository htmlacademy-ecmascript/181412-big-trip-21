import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition, replace, remove} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointsByDuration, sortPointsByPrice, sortPointsByDate} from '../utils/point.js';


export default class PointsListPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #presenterContainerElement = null; // DOM-элемент, куда положим весь презентер
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #allPointPresenters = new Map();

  #currentSortType = SortType.DAY; // дефолтное состояние сортировки
  #sourcedPoints = []; // сюда сохраним исходный массив

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.#presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#pointsModel = pointsModel;
  }

  // Отдельный приватный метод для отрисовки ОДНОЙ ТОЧКИ
  #renderPoint({point, destinations, offers}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, destinations, offers);
    this.#allPointPresenters.set(point.id, pointPresenter);
  }

  // Отдельный приватный метод для отрисовки СОРТИРОВКИ
  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    if(prevSortComponent){
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    }else{
      render(this.#sortComponent, this.#presenterContainerElement);
    }
    render(this.#sortComponent, this.#presenterContainerElement, RenderPosition.AFTERBEGIN);
  }

  // Отдельный приватный метод для отрисовки ПУСТОГО ЛИСТА
  #renderNoPoints() {
    render(this.#noPointComponent, this.#presenterContainerElement);
  }

  // Отдельный приватный метод для отрисовки ВСЕХ ТОЧЕК
  #renderPointsList() {
    render(this.#pointListComponent, this.#presenterContainerElement); // вставили обертку ul
    // Вставляем ТОЧКИ, пользуясь приватным методом
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint({point: this.#points[i], destinations: this.#destinations, offers: this.#offers});
    }
  }

  #renderTrip() {
    if(!this.#points.length) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }

  // Отдельный приватный метод для очистки списка точек
  #clearPointsList() {
    this.#allPointPresenters.forEach((presenter) => presenter.destroy());
    this.#allPointPresenters.clear();
  }

  init() {
    this.#points = [...this.#pointsModel.points]; // Это наш массив точек, которые мы отрисовываем
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#sourcedPoints = [...this.#pointsModel.points]; // сохраняем исходный массив (для восстановлени исходного порядка сортировки)

    this.#renderTrip();
  }

  // Обработчик при обновлении точки
  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#points, updatedPoint);
    this.#allPointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#points);
  };

  #handleModeChange = () => {
    this.#allPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints (sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointsByDate);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointsByDuration);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
    this.#renderSort();
  };
}
