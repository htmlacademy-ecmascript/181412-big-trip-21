import {getRandomTask, mockDestinations, mockOffers} from '../mock/points.js';

const POINT_COUNT = 6;

export default class PointsModel {
  // Сформируем массив указанной длины из случайных точек моков
  points = Array.from({length: POINT_COUNT}, getRandomTask);
  destinations = mockDestinations;
  offers = mockOffers;

  // метод для получения сформированного массива точек
  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
