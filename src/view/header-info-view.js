import AbstractView from '../framework/view/abstract-view.js';
import {HEADER_DATE_FORMAT} from '../const.js';
import {humanizePointDueDate} from '../utils/point.js';

function createHeaderInfoTemplate(points, destinations, offers) {
  // Функция для отрисовки Title
  function createTitleTemplate() {
    const pointsLength = points.length;
    const startCity = destinations.find((item) => item.id === points[0].destination);
    const middleCity = destinations.find((item) => item.id === points[1]?.destination);
    const endCity = destinations.find((item) => item.id === points.at(-1)?.destination);

    switch (pointsLength) {
      case 1:
        return `${startCity.name}`;
      case 2:
        return `${startCity.name} — ${endCity.name}`;
      case 3:
        return `${startCity.name} — ${middleCity.name} — ${endCity.name}`;
      default:
        return `${startCity.name} — ... — ${endCity.name}`;
    }
  }
  const titleTemplate = createTitleTemplate();

  //Функция для отрисовки ДАТ
  function createDateTemplate() {
    const dateFrom = new Date(points[0].dateFrom);
    const dateTo = new Date(points.at(-1).dateTo);
    const dateFromFormatted = humanizePointDueDate(points[0].dateFrom, HEADER_DATE_FORMAT);
    const dateToFormatted = humanizePointDueDate(points.at(-1).dateTo, HEADER_DATE_FORMAT);

    if(points.length === 1) {
      return `${humanizePointDueDate(points[0].dateFrom, HEADER_DATE_FORMAT)}`;
    }

    if (dateFrom.getMonth() === dateTo.getMonth()) {
      return `${dateFromFormatted} — ${dateTo.getDate()}`;
    } else {
      return `${dateFromFormatted} — ${dateToFormatted}`;
    }
  }
  const dateTemplate = createDateTemplate();

  function getTripPrice() {
    let basePrices = 0;
    let offersPrices = 0;

    points.forEach((point) => {
      basePrices += point.basePrice;

      const typeOffersObj = offers.find((offer) => offer.type === point.type);
      const checkedOffers = point.offers;

      typeOffersObj.offers.forEach((offer) => {
        if (checkedOffers.some((checkedOffer) => checkedOffer === offer.id)) {
          offersPrices += offer.price;
        }
      });
    });
    return basePrices + offersPrices;
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${titleTemplate}</h1>
                <p class="trip-info__dates">${dateTemplate}</p>
            </div>
            <p class="trip-info__cost">Total: €&nbsp;<span class="trip-info__cost-value">${getTripPrice()}</span></p>
          </section>`;
}

export default class HeaderInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() { // Получем шаблон элемента (кусок HTML-разметки)
    return createHeaderInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
