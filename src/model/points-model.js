import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient); // Точки адаптируем, destinations и offers не надо
      //console.log('points', this.#points);

      this.#destinations = await this.#pointsApiService.destinations;
      //console.log('destinations', this.#destinations);
      this.#offers = await this.#pointsApiService.offers;
      //console.log('offers', this.#offers);
    } catch (err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
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

  // геттер для получения points
  get points() {
    return this.#points;
  }

  // геттер для получения destinations
  get destinations() {
    return this.#destinations;
  }

  // геттер для получения offers
  get offers() {
    return this.#offers;
  }

  // Метод для ОБНОВЛЕНИЯ точки
  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id); // В массиве все точек ищем index той, у которой id совпадает с id обновленной точки

    if (index === -1) {
      throw new Error('Can\'t update unexisting point'); // Если такой нет - выкидываем ошибку
    }

    // Вставляем обновленную точку
    try {
      const response = await this.#pointsApiService.updatePoint(update); // находим по id точку
      const updatedPoint = this.#adaptToClient(response); // переводим в наш формат

      this.#points = [
        ...this.#points.slice(0, index), // часть ДО обновленной точки
        updatedPoint, // Заменяем обновленную точку
        ...this.#points.slice(index + 1) // часть ПОСЛЕ обноленной точки
      ];
      this._notify(updateType, updatedPoint); // Уведомляем об изменении!!!
    } catch (err) {
      throw new Error('Can\'t update point');
    }
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
