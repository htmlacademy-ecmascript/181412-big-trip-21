import {createElement} from '../render.js';
import {humanizePointDueDate, calculateDiffTime} from '../utils.js';
import {DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT} from '../const.js';

function createPointTemplate(point) {
  const {type, basePrice, dateFrom, dateTo, isFavorite} = point;

  const dateStart = humanizePointDueDate(dateFrom, DATE_FORMAT); // например, SEP 11
  const dateFullStart = humanizePointDueDate(dateFrom, FULL_DATE_FORMAT); // например, 2019-03-18
  const dateFullEnd = humanizePointDueDate(dateTo, FULL_DATE_FORMAT); // например, 2019-03-18
  const timeStart = humanizePointDueDate(dateFrom, TIME_FORMAT); // например, 10:30
  const timeEnd = humanizePointDueDate(dateTo, TIME_FORMAT); // например, 10:30
  const pointDuration = calculateDiffTime(dateFrom, dateTo);
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFullStart}">${dateStart}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} Amsterdam</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFullStart}T${timeStart}">${timeStart}</time>
                    —
                    <time class="event__end-time" datetime="${dateFullEnd}T${timeEnd}">${timeEnd}</time>
                  </p>
                  <p class="event__duration">${pointDuration}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    +€&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventListView {
  constructor({point}) { // При создании экземляра класса мы должны передать объект с данными (создаем в презентере)
    this.point = point;
  }

  getTemplate() { // Получем шаблон элемента (кусок HTML-разметки)
    return createPointTemplate(this.point); // Для отрисовки используем пришедшие данные объекта
  }

  getElement() { // Создаем DOM-элемент
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
