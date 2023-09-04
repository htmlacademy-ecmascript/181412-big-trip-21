import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition, replace, remove} from '../framework/render.js';
import {SortType} from '../const.js';
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
  }

  get points() { // Получаем точки и сразу их сортируем в зависимости от установленного типа
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDate);
        break;
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByDuration);
        break;
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
        break;
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, this.destinations, this.offers);
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
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint({point: this.points[i]});
    }
  }

  #renderTrip() {
    if(!this.points.length) {
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
    this.#renderTrip();
  }

  // Обработчик при обновлении точки
  #handlePointChange = (updatedPoint) => {
    this.#allPointPresenters.get(updatedPoint.id).init(updatedPoint, this.destinations, this.offers);
  };

  #handleModeChange = () => {
    this.#allPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#renderSort(); // Перерисовываем сортировку с новым типом
    this.#clearPointsList();
    this.#renderPointsList();
  };
}
