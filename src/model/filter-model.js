import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() { // геттер для получения текущего значения фильтра
    return this.#filter;
  }

  setFilter (updateType, receivedFilter) {
    this.#filter = receivedFilter;

    this._notify(updateType, receivedFilter);
  }

}
