import {getRandomTask, BLANK_POINT} from '../mock/points.js';

const POINT_COUNT = 4;

export default class PointsModel {
  // Сформируем массив указанной длины из случайных точек моков
  points = Array.from({length: POINT_COUNT}, getRandomTask);
  blankPoint = BLANK_POINT;

  // метод для получения сформированного массива точек
  getPoints() {
    return this.points;
  }

  getBlankPoint() {
    return this.blankPoint;
  }
}
