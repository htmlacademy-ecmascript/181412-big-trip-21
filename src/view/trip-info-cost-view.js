import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoCostTemplate() {
  return `<p class="trip-info__cost">
            Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
          </p>`;
}

export default class TripInfoMainView extends AbstractView {
  get template() { // Получем шаблон элемента (кусок HTML-разметки)
    return createTripInfoCostTemplate();
  }
}
