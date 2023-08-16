import {createElement} from '../render.js';

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventListView {
  getTemplate() { // Получем шаблон элемента (кусок HTML-разметки)
    return createEventListTemplate();
  }

  getElement() { // Создаем DOM-элемент
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    //console.log(this.element)

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
