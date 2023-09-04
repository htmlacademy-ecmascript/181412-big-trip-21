import {getRandomPoint} from '../mock/points.js';
import Observable from '../framework/observable.js';

const POINT_COUNT = 9;

export default class PointsModel extends Observable {
  // Сформируем массив указанной длины из случайных точек моков
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #destinations = null;
  #offers = null;

  constructor({destinations, offers}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
  }

  // метод для получения сформированного массива точек
  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
