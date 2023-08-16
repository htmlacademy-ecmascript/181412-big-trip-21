import PointListView from '../view/point-list-view.js'; // обертка ul
import PointView from '../view/point-view.js'; // point
import EditPointFormView from '../view/edit-point-form-view.js'; // форма создания
import {render} from '../render.js';

export default class PointsPresenter {
  addFormComponent = new EditPointFormView();
  eventListComponent = new PointListView();

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  // - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  // - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()]; // Это наш массив точек, которые мы отрисовываем

    render(this.eventListComponent, this.presenterContainerElement); // вставили обертку ul

    render(this.addFormComponent, this.eventListComponent.getElement()); // вставили форму редактирования

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.eventListComponent.getElement());
    }
  }
}
