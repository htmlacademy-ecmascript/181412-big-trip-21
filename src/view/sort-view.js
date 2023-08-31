import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createSortItemTemplate(sortItem){
  const disabled = ['event', 'offer'];
  return `
    <div class="trip-sort__item  trip-sort__item--${sortItem.type}">
      <input
        id="sort-${sortItem.type}"
        class="trip-sort__input visually-hidden"
        data-sort-type="${sortItem.type}"
        type="radio"
        name="trip-sort"
        value="sort-${sortItem.type}"
        ${(sortItem.isChecked) ? 'checked' : ''}
        ${(disabled.includes(sortItem.type)) ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortItem.type}">${sortItem.type}</label>
    </div>
  `;
}

function createSortTemplate({sortMap}){
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortMap.map((sortItem) => createSortItemTemplate(sortItem)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortMap = null;

  constructor({sortType, onSortTypeChange}) {
    super();
    this.#sortMap = Object.values(SortType)
      .map((type) => ({
        type,
        isChecked: (type === sortType)
      }));

    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template(){
    return createSortTemplate({
      sortMap: this.#sortMap
    });
  }
}
