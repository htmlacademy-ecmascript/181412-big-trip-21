import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'}) // получаем данные с сервера
      .then(ApiService.parseResponse); // преобразуем в json
  }

  get destinations() {
    return this._load({url: 'destinations'}) // получаем данные с сервера
      .then(ApiService.parseResponse); // преобразуем в json
  }

  get offers() {
    return this._load({url: 'offers'}) // получаем данные с сервера
      .then(ApiService.parseResponse); // преобразуем в json
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsApiService.adaptToServer(point)), // отправляем К СЕРВЕРУ уже адаптированную  В ЕГО ФОРМАТ точку
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  // метод для преобразования наш формат точек ----> в формат данных сервера
  static adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
