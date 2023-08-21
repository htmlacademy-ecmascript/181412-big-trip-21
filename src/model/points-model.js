import {getRandomTask, mockDestinations, mockOffers, mockPoints} from '../mock/points.js';

const POINT_COUNT = 5;

export default class PointsModel {
  // Сформируем массив указанной длины из случайных точек моков
  points = mockPoints;
  destinations = mockDestinations;
  offers = mockOffers;

  // метод для получения сформированного массива точек
  getAllPoints() {
    return this.points;
  }

  getRandomPoints() {
    return Array.from({length: POINT_COUNT}, getRandomTask);
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
