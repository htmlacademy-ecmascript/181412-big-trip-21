import TripInfoView from './view/trip-info-view.js'; // обертка section
import TripInfoMainView from './view/trip-info-main-view.js'; // title
import TripInfoCostView from './view/trip-info-cost-view.js'; // cost
import FilterView from './view/filter-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import {render, RenderPosition} from './framework/render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();

const tripInfoComponent = new TripInfoView(); // экземпляр класс обертки section
const pointPresenter = new PointsPresenter({
  presenterContainerElement: siteTripEventsElement,
  pointsModel,
});

// Отрисовываем элементы в Header:
// сначала обертка section
render(tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
// в обертку section добавляем title
render(new TripInfoMainView(), tripInfoComponent.element);
// потом в обертку section добавляем cost
render(new TripInfoCostView(), tripInfoComponent.element);

// Отрисовываем фильтры в Header:
render(new FilterView(), siteFilterElement, RenderPosition.BEFOREEND);

pointPresenter.init();
