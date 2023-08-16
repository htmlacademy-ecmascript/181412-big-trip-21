import EventListView from '../view/event-list-view.js'; // обертка ul
import EventView from '../view/event-view.js'; // event
import AddFormView from '../view/add-form-view.js'; // форма создания
import {render} from '../render.js';

export default class EventPresenter {
  addFormComponent = new AddFormView();
  eventListComponent = new EventListView();

  // При создании экзмепляра класса передаем ОБЪЕКТ с указанием контейнера (DOM-элемента!),
  // куда положим список событий
  constructor({eventContainer}) {
    this.eventContainer = eventContainer; // это DOM-элемент!!!
  }

  init() {
    render(this.eventListComponent, this.eventContainer); // вставили обертку ul

    render(this.addFormComponent, this.eventListComponent.getElement()); // вставили форму редактирования

    for (let i = 0; i < 3; i++) {
      render(new EventView, this.eventListComponent.getElement());
    }
  }
}
