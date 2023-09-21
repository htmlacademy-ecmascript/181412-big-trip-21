const DATE_FORMAT = 'MMM DD'; /* Вывод просто ДАТЫ слева в точке, например, MAR 18 */
const HEADER_DATE_FORMAT = 'DD MMM '; /* Вывод просто ДАТЫ слева в точке, например, MAR 18 */
const TIME_FORMAT = 'HH:mm'; /* Вывод времени в точке, например, 10:30 */
const FULL_DATE_FORMAT = 'YY-MM-DD'; /* Для подстановки в <time datetime=""> точки, например, 2019-03-18 */
const FILTER_DAY_FORMAT = 'YYYY-MM-DD';
const TIME_DAY_FORMAT = 'DD/MM/YY hh:mm';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, FILTER_DAY_FORMAT, HEADER_DATE_FORMAT, TIME_DAY_FORMAT, FilterType, SortType, UserAction, UpdateType};
