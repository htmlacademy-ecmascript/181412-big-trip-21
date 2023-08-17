import {getRandomTask} from '../mock/points.js';

const POINT_COUNT = 3;

export default class PointsModel {
  // Сформируем массив указанной длины из случайных точек моков
  points = Array.from({length: POINT_COUNT}, getRandomTask);

  // метод для получения сформированного массива точек
  getPoints() {
    return this.points;
  }
}
