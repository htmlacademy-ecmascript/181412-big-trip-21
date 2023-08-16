import PointListView from '../view/point-list-view.js'; // обертка ul
import PointView from '../view/point-view.js'; // point
import EditPointFormView from '../view/edit-point-form-view.js'; // форма создания
import {render} from '../render.js';

export default class PointPresenter {
  addFormComponent = new EditPointFormView();
  eventListComponent = new PointListView();

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием контейнера (DOM-элемента!),
  // куда положим САМ ПРЕЗЕНТЕР!
  constructor({presenterContainerElement}) {
    this.presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для всего списка, а не для точек
  }

  init() {
    render(this.eventListComponent, this.presenterContainerElement); // вставили обертку ul

    render(this.addFormComponent, this.eventListComponent.getElement()); // вставили форму редактирования

    for (let i = 0; i < 3; i++) {
      render(new PointView, this.eventListComponent.getElement());
    }
  }
}
