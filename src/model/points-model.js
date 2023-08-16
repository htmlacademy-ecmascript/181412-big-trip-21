import {getRandomTask} from '../mock/points.js';

const POINT_COUNT = 7;

export default class PointsModel {
  // формируем массив указанной длины из случайных точек
  points = Array.from({length: POINT_COUNT}, getRandomTask);

  // метод для получения сформированного массива точек
  getPoints() {
    console.log(this.points);
    return this.points;
  }
}
