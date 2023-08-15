import TripInfoView from './view/trip-info-view.js'; // обертка section
import TripInfoMainView from './view/trip-info-main-view.js'; // title
import TripInfoCostView from './view/trip-info-cost-view.js'; // cost
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventPresenter from './presenter/event-presenter.js';
import {render,RenderPosition} from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView(); // экземпляр класс обертки section
const eventPresenter = new EventPresenter({eventContainer: siteTripEventsElement});

// Отрисовываем элементы в Header:
// сначала обертка section
render(tripInfoComponent, siteTripMainElement, RenderPosition.AFTERBEGIN);
// в обертку section добавляем title
render(new TripInfoMainView(), tripInfoComponent.getElement());
// потом в обертку section добавляем cost
render(new TripInfoCostView(), tripInfoComponent.getElement());

// Отрисовываем фильтры в Header:
render(new FilterView(), siteFilterElement, RenderPosition.BEFOREEND);

// Отрисовываем сортировку в Main:
render(new SortView(), siteTripEventsElement);

// Отрисовываем список events, там же форма редактирования
eventPresenter.init();
