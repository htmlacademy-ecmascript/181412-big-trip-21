const DATE_FORMAT = 'MMM DD'; /* Вывод просто ДАТЫ слева в точке, например, MAR 18 */
const TIME_FORMAT = 'HH:mm'; /* Вывод времени в точке, например, 10:30 */
const FULL_DATE_FORMAT = 'YY-MM-DD'; /* Для подстановки в <time datetime=""> точки, например, 2019-03-18 */
const FULL_DATE_EDIT_FORMAT = 'DD/MM/YY';
const FILTER_DAY_FORMAT = 'YYYY-MM-DD';

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

export {DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, FULL_DATE_EDIT_FORMAT, FILTER_DAY_FORMAT, FilterType, SortType};
