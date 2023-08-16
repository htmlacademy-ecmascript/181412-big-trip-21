import {createElement} from '../render.js';

function createTripInfoTemplate() {
  return '<section class="trip-main__trip-info  trip-info"></section>';
}

export default class TripInfoView {
  getTemplate() { // Получем шаблон элемента (кусок HTML-разметки)
    return createTripInfoTemplate();
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
