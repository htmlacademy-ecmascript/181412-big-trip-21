import {humanizePointDueDate} from '../utils/point.js';
import {TIME_FORMAT, FULL_DATE_EDIT_FORMAT} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = { // Это объект с описанием точки по умолчанию. ПУСТАЯ ТОЧКА/ФОРМА РЕДАКТИРОВАНИЯ
  type: 'flight',
  offers: [],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  destination: ''
};

function createEditFormTemplate(point, destinationsList, OffersList) {
  const {type, offers, basePrice, dateFrom, dateTo, destination} = point;
  //console.log("point формы редактирования - ", point)

  const dateStart = humanizePointDueDate(dateFrom, FULL_DATE_EDIT_FORMAT); // например, 19/03/19
  const dateEnd = humanizePointDueDate(dateTo, FULL_DATE_EDIT_FORMAT); // например, 19/03/25
  const timeStart = humanizePointDueDate(dateFrom, TIME_FORMAT); // например, 10:30
  const timeEnd = humanizePointDueDate(dateTo, TIME_FORMAT); // например, 12:30

  // DESTINATIONS
  // Сначала получаем из массива объектов ВСЕХ destinations ТОЛЬКО ТОТ объект, что указан в точке
  const pointDestinationObj = destinationsList.find((item) => item.id === destination);
  // Функиция для отрисовывания картинок
  function createDestinationPicturesTemplate() {
    if(pointDestinationObj) { // Если destination есть, то отрисовываем картинки
      return pointDestinationObj.pictures.map((picture) =>
        `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
      ).join('');
    }
  }
  const destinationPicturesTemplate = createDestinationPicturesTemplate();
  // Функция для отрисовывания БЛОКА DESTINATIONS
  function createDestinationsBlockTemplate() {
    if (pointDestinationObj) {
      return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${pointDestinationObj.description}</p>
              <div class="event__photos-container">
                <div class="event__photos-tape">${destinationPicturesTemplate}</div>
              </div>
            </section>`;
    } else {
      return '';
    }
  }
  const DestinationsBlockTemplate = createDestinationsBlockTemplate();

  // OFFERS
  // Сначала получаем из массива объектов ВСЕХ offers ТОЛЬКО ТОТ объект, что указан в точке
  const typeOffersObj = OffersList.find((item) => item.type === type);
  // Функция для отрисовки инпутов офферов (чекнутых или нет)
  const createTypeOffersTemplate = () => typeOffersObj.offers.map((offer) => {
    const isChecked = offers.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id="${offer.id}" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
  const typeOffersTemplate = createTypeOffersTemplate();
  // Функция для отрисовывания БЛОКА OFFERS
  function createOffersBlockTemplate() {
    if (typeOffersObj.offers.length > 0) {
      return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${typeOffersTemplate}
              </div>
            </section>`;
    } else {
      return '';
    }
  }
  const OffersBlockTemplate = createOffersBlockTemplate();

  //////////////////////////
  // Event type list
  function createEventTypeListItemsTemplate() {
    return OffersList.map((offer) =>
      `<div class="event__type-item">
         <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
         <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
       </div>`
    ).join('');
  }
  const EventTypeListItemsTemplate = createEventTypeListItemsTemplate();

  // Destinations list - список городов для выбора
  function createDestinationListItemsTemplate() {
    return destinationsList.map((item) =>
      `<option value="${item.name}"></option>`
    ).join('');
  }
  const DestinationListItemsTemplate = createDestinationListItemsTemplate();

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${EventTypeListItemsTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestinationObj ? pointDestinationObj.name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${DestinationListItemsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart} ${timeStart}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd} ${timeEnd}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>

                </header>
                <section class="event__details">
                ${OffersBlockTemplate}
                ${DestinationsBlockTemplate}
                </section>
              </form>
            </li>`;
}

export default class PointEditFormView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleCollapseClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  // При создании экземляра класса Формы мы должны передать объект с данными точки,
  // а также массивы destinations и offers
  constructor({point = BLANK_POINT, destinations, offers, onFormSubmit, onCollapseClick}) {
    super();
    // просто глубоко копируем пришедший объект с данными точки, обращаться this._state
    this._setState(PointEditFormView.parsePointToState(point));

    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCollapseClick = onCollapseClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#collapseClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelectorAll('.event__type-input')
      .forEach((input) => input.addEventListener('change', this.#typeChangeHandler));
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('change', this.#offersChangeHandler));

    this.#setDatepicker();
  }

  get template() { // Получем ШАБЛОН элемента (кусок HTML-разметки)
    return createEditFormTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  // Метод для превращения данных точки в СОСТОЯНИЕ (точка + новые свойства)
  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  // Метод для превращения данных состояния в ТОЧКУ (точка - удалили лишние новые свойства)
  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destinations.find((item) => item.name === evt.target.value);
    this.updateElement({
      destination: selectedDestination?.id,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedCheckboxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const updatedCheckedCheckboxes = [];
    checkedCheckboxes.map((element) => updatedCheckedCheckboxes.push(parseInt(element.dataset.id, 10)));
    this._setState({
      offers: updatedCheckedCheckboxes,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    //console.log('при отправке', this._state)
    this.#handleFormSubmit(PointEditFormView.parseStateToPoint(this._state)); // Сворачиваем форму в точку уже с !новыми! данными Состояния!
  };

  #collapseClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCollapseClick(PointEditFormView.parseStateToPoint(this._state));
  };

  reset(point) {
    this.updateElement(
      PointEditFormView.parsePointToState(point)
    );
  }
}
