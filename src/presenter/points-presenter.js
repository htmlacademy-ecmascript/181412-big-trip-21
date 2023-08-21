import PointListView from '../view/point-list-view.js'; // обертка ul
import PointView from '../view/point-view.js'; // point
import EditPointFormView from '../view/edit-point-form-view.js'; // форма создания/редактирования
import {render} from '../render.js';


export default class PointsPresenter {
  pointListComponent = new PointListView();

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getRandomPoints()]; // Это наш массив точек, которые мы отрисовываем
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(this.pointListComponent, this.presenterContainerElement); // вставили обертку ul

    // Вставляем ФОРМУ СОЗДАНИЯ/РЕДАКТИРОВАНИЯ ТОЧКИ. Передаем объект с точкой, а также _массивы destinations и offers_
    render(new EditPointFormView({point: this.points[0], destinations: this.destinations, offers: this.offers}), this.pointListComponent.getElement());
    //console.log('Точка для формы создания', this.points[0])

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({point: this.points[i], destinations: this.destinations, offers: this.offers}), this.pointListComponent.getElement());
    }
  }
}
