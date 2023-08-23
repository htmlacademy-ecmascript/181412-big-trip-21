import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoMainTemplate() {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>
            <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
          </div>`;
}

export default class TripInfoMainView extends AbstractView{
  get template() { // Получем шаблон элемента (кусок HTML-разметки)
    return createTripInfoMainTemplate();
  }
}
