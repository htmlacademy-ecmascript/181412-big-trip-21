import PointListView from '../view/point-list-view.js'; // обертка ul
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common.js';


export default class PointsListPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #presenterContainerElement = null; // DOM-элемент, куда положим весь презентер
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #allPointPresenters = new Map();

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР, список ul!
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
    render(this.#sortComponent, this.#presenterContainerElement, RenderPosition.AFTERBEGIN);
  }

  // Отдельный приватный метод для отрисовки ПУСТОГО ЛИСТА
  #renderNoPoints() {
    render(this.#noPointComponent, this.#presenterContainerElement);
  }

  // Отдельный приватный метод для отрисовки ВСЕХ ТОЧЕК
  #renderPointsList() {
    if(this.#points.length) {
      render(this.#pointListComponent, this.#presenterContainerElement); // вставили обертку ul
      // Вставляем ТОЧКИ, пользуясь приватным методом
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint({point: this.#points[i], destinations: this.#destinations, offers: this.#offers});
      }
      this.#renderSort(); // Вставляем сортировку
    } else {
      this.#renderNoPoints();
    }
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

    this.#renderPointsList();
  }

  // Обработчик при обновлении точки
  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#allPointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#points);
  };

  #handleModeChange = () => {
    this.#allPointPresenters.forEach((presenter) => presenter.resetView());
  };
}
