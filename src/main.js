import TripInfoView from './view/trip-info-view.js'; // обертка section
import TripInfoMainView from './view/trip-info-main-view.js'; // title
import TripInfoCostView from './view/trip-info-cost-view.js'; // cost
import FilterView from "./view/filter-view.js";
import {render,RenderPosition} from './render'

const siteHeaderElement = document.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripInfoView = new TripInfoView // экземпляр класс обертки section

// Отрисовываем элементы в Header:
// сначала обертка section
render(tripInfoView, siteTripMainElement, RenderPosition.AFTERBEGIN);
// в обертку section добавляем title
render(new TripInfoMainView, tripInfoView.getElement());
// потом в обертку section добавляем cost
render(new TripInfoCostView, tripInfoView.getElement());

// Отрисовываем фильтры в Header:
render(new FilterView, siteFilterElement, RenderPosition.BEFOREEND)
