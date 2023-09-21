import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointsApiService = null;
  error = false;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      // const points = [];
      this.#points = points.map(this.#adaptToClient); // Точки адаптируем, destinations и offers не надо
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
      this.error = false;
    } catch (err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
      this.error = true;
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
  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      // Просто добавляем обновленную точку в начало + копируем исходный массив точек
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint); // Уведомляем об изменении!!!
    } catch (err) {
      throw new Error('Can\'t add task');
    }
  }

  // Метод для УДАЛЕНИЯ точки
  async deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id); // В массиве все точек ищем index той, у которой id совпадает с id обновленной точки

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      // Удаляем обновленную (удаленную!) точку
      this.#points = [
        ...this.#points.slice(0, index), // часть ДО обновленной точки
        ...this.#points.slice(index + 1) // часть ПОСЛЕ обноленной точки
      ];
      this._notify(updateType); // Уведомляем об изменении!!! Удаляемую точку не передаем, так как ее удалили

    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  }
}
