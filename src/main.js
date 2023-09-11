import TripInfoView from './view/trip-info-view.js'; // обертка section
import TripInfoMainView from './view/trip-info-main-view.js'; // title
import TripInfoCostView from './view/trip-info-cost-view.js'; // cost
import PointsListPresenter from './presenter/points-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {render, RenderPosition} from './framework/render.js';
import {getDestinations, getOffers} from './mock/points.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from "./point-api-service";

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const AUTHORIZATION = 'Basic qwertyqwerty';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  destinations: getDestinations(),
  offers: getOffers()
});

const filterModel = new FilterModel();

const tripInfoComponent = new TripInfoView(); // экземпляр класс обертки section
const pointListPresenter = new PointsListPresenter({
  presenterContainerElement: siteTripEventsElement,
  pointsModel,
  filterModel,
  onNewTaskDestroy: handleNewTaskFormClose
});

const newPointButtonView = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewTaskFormClose() {
  newPointButtonView.element.disabled = false;
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonView.element.disabled = true;
}

// Отрисовываем элементы в Header:
// сначала обертка section
render(tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
// в обертку section добавляем title
render(new TripInfoMainView(), tripInfoComponent.element);
// потом в обертку section добавляем cost
render(new TripInfoCostView(), tripInfoComponent.element);

//добавляем кнопку
render(newPointButtonView, siteTripMainElement);

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  pointsModel
});

filterPresenter.init();
pointListPresenter.init();
