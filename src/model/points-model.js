import {getRandomPoint} from '../mock/points.js';
import Observable from '../framework/observable.js';

const POINT_COUNT = 9;

export default class PointsModel extends Observable {
  // Сформируем массив указанной длины из случайных точек моков
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #destinations = null;
  #offers = null;
  #pointsApiService = null;

  constructor({pointsApiService, destinations, offers}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointsApiService.points.then((points) => {
      console.log('Это points', points.map(this.#adaptToClient));
    });

    this.#pointsApiService.destinations.then((destinations) => {
      console.log('Это destinations', destinations);
    });

    this.#pointsApiService.offers.then((offers) => {
      console.log('Это offers', offers);
    });
  }

  // метод для преобразования формат данных сервера ----> в наш формат точек
  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
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

  // Метод для ОБНОВЛЕНИЯ точки
  updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id); // В массиве все точек ищем index той, у которой id совпадает с id обновленной точки

    if (index === -1) {
      throw new Error('Can\'t update unexisting point'); // Если такой нет - выкидываем ошибку
    }

    // Вставляем обновленную точку
    this.#points = [
      ...this.#points.slice(0, index), // часть ДО обновленной точки
      updatedPoint, // Обновленная точка
      ...this.#points.slice(index + 1) // часть ПОСЛЕ обноленной точки
    ];

    this._notify(updateType, updatedPoint); // Уведомляем об изменении!!!
  }

  // Метод для ДОБАВЛЕНИЯ точки
  addPoint(updateType, updatedPoint) {
    // Просто добавляем обновленную точку в начало + копируем исходный массив точек
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];

    this._notify(updateType, updatedPoint); // Уведомляем об изменении!!!
  }

  // Метод для УДАЛЕНИЯ точки
  deletePoint (updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id); // В массиве все точек ищем index той, у которой id совпадает с id обновленной точки

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    // Удаляем обновленную точку
    this.#points = [
      ...this.#points.slice(0, index), // часть ДО обновленной точки
      ...this.#points.slice(index + 1) // часть ПОСЛЕ обноленной точки
    ];

    this._notify(updateType); // Уведомляем об изменении!!! Удаляемую точку не передаем, так как ее удалили
  }


}
