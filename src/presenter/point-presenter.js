import {render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js'; // point
import PointEditFormView from '../view/point-edit-form-view.js'; // форма создания/редактирования

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #point = null;
  #destinations = [];
  #offers = [];

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer; // сюда сохранили обертку ul
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });

    this.#pointEditFormComponent = new PointEditFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onCollapseClick: this.#handleFormCollapse,
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  // Метод, что происходит по нажатию на Esc
  #escKeyDownHandler = (evt) => { // По нажатию на Esc происходит смена формы на точку
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleFormCollapse = () => {
    this.#replaceFormToPoint();
  };
}
