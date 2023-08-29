import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js'; // point
import PointEditFormView from '../view/point-edit-form-view.js'; // форма создания/редактирования

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #point = null;
  #destinations = [];
  #offers = [];
  #handleDataChange = null;

  constructor({pointListContainer, onDataChange}) {
    this.#pointListContainer = pointListContainer; // сюда сохранили обертку ul
    this.#handleDataChange = onDataChange;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditFormComponent = this.#pointEditFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditFormComponent = new PointEditFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onCollapseClick: this.#handleFormCollapse,
    });

    // Если точка или форма еще не были отрисованы, то только тогда создаем форму/точку
    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditFormComponent.element)) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditFormComponent);
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #handleFormCollapse = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
