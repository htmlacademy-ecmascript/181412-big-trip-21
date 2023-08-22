import PointListView from '../view/point-list-view.js'; // обертка ul
import PointView from '../view/point-view.js'; // point
import PointEditFormView from '../view/point-edit-form-view.js'; // форма создания/редактирования
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import {render, replace} from '../framework/render.js';


export default class PointsPresenter {
  #pointListComponent = new PointListView(); // обертка ul для point, это класс
  #presenterContainerElement = null; // DOM-элемент, куда положим весь презентер
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР, список ul!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.#presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#pointsModel = pointsModel;
  }

  // Отдельный приватный метод для отрисовки ОДНОЙ ТОЧКИ
  #renderPoint({point, destinations, offers}) {
    // Метод, что происходит по нажатию на Esc
    const escKeyDownHandler = (evt) => { // По нажатию на Esc происходит смена формы на точку
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    // Создаем экзмепляр класса ТОЧКИ
    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => { // Действие по клику на кнопку: замена точки на форму
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    // Создаем экзмепляр класса ФОРМЫ
    const pointEditFormComponent = new PointEditFormView({
      point,
      destinations,
      offers,
      onFormSubmit: () => { //Действие при отправке формы: замена формы на точку
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => { // Действие по клику на кнопку: замена точки на форму
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditFormComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditFormComponent);
    }

    render(pointComponent, this.#pointListComponent.element); // вставляем точку/форму в обертку ul
  }

  // Отдельный приватный метод для отрисовки ВСЕХ ТОЧЕК
  #renderPointsList() {
    if(this.#points.length) {
      // вставили обертку ul
      render(this.#pointListComponent, this.#presenterContainerElement);
      // Вставляем ТОЧКИ, пользуясь приватным методом
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint({point: this.#points[i], destinations: this.#destinations, offers: this.#offers});
      }
      // Вставляем сортировку
      render(new SortView(), this.#presenterContainerElement);
    } else {
      render(new NoPointView(), this.#presenterContainerElement);
    }
  }

  init() {
    this.#points = [...this.#pointsModel.points]; // Это наш массив точек, которые мы отрисовываем
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderPointsList();
  }


}
