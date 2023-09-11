import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditFormComponent = null;

  #mode = Mode.DEFAULT;

  #point = null;
  #destinations = [];
  #offers = [];

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer; // сюда сохранили обертку ul
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      isNewPoint: false,
      onFormSubmit: this.#handleFormSubmit,
      onCollapseClick: this.#handleFormCollapse,
      onDeleteClick: this.#handleDeleteClick,
    });

    // Если точка или форма еще не были отрисованы, то только тогда создаем форму/точку
    if (prevPointComponent === null || prevPointEditFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditFormComponent, prevPointEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditFormComponent);
  }

  resetView() { // Если находимся в режиме редактирования, то меняем Форму на Точку
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  // Метод, что происходит по нажатию на Esc
  #escKeyDownHandler = (evt) => { // По нажатию на Esc происходит смена формы на точку
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditFormComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      point,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormCollapse = () => {
    // При сворачивании формы в точку данные !не сохраняем
    // this.#pointEditFormComponent.reset(this.#point);
    // this.#replaceFormToPoint();
    this.resetView();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };
}
