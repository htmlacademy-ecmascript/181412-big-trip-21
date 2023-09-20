import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {FILTER_DAY_FORMAT} from '../const.js';
dayjs.extend(duration);

const MINUTES_IN_HOUR = 60;

// Функция для преобразования даты в нужный формат
function humanizePointDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

/* Функция для расчета разницы дат */
function calculateDiffTime(dateStart, dateEnd) {
  const start = dayjs(dateStart);
  const end = dayjs(dateEnd);
  const differentTime = dayjs.duration(end.diff(start));

  const {days, hours, minutes} = differentTime.$d;

  switch (true) {
    case (days > 0):
      return differentTime.format('DD[D] HH[H] mm[M]');
    case (hours > 0):
      return differentTime.format('HH[H] mm[M]');
    case (minutes < MINUTES_IN_HOUR):
      return differentTime.format('mm[M]');
  }
}

/* ФУНКЦИИ ФИЛЬТРАЦИИ */
// Точка, у которой дата начала ДО(больше) текущей
// Текущая ДО начала
const isFuturePoint = (dateStart) => {
  const formatDateStart = humanizePointDueDate(dateStart, FILTER_DAY_FORMAT);
  return dayjs().isBefore(dayjs(formatDateStart));
};

// Точка, у которой дата начала ДО текущей, а дата окончания ПОСЛЕ текущей
// Текущая ПОСЛЕ начала и ДО конца
const isPresentPoint = (dateStart, dateEnd) => {
  const formatDateStart = humanizePointDueDate(dateStart, FILTER_DAY_FORMAT);
  const formatDateEnd = humanizePointDueDate(dateEnd, FILTER_DAY_FORMAT);

  return dayjs().isAfter(dayjs(formatDateStart)) && dayjs().isBefore(dayjs(formatDateEnd));
};

// Точка, у которой дата начала ПОСЛЕ(меньше) текущей
// текущая ПОСЛЕ конца
const isPastPoint = (dateEnd) => {
  const formatDateEnd = humanizePointDueDate(dateEnd, FILTER_DAY_FORMAT);
  return dayjs().isAfter(dayjs(formatDateEnd));
};

/*ФУНКЦИИ СОРТИРОВКИ*/
function sortPointsByDuration(pointA, pointB) { // По длительности
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBDuration - pointADuration;
}

function sortPointsByPrice(pointA, pointB) { // По цене
  const pointAPrice = pointA.basePrice;
  const pointBPrice = pointB.basePrice;

  return pointBPrice - pointAPrice;
}

function sortPointsByDate(pointA, pointB) { // По дате
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}


export {humanizePointDueDate, calculateDiffTime, isFuturePoint, isPastPoint, isPresentPoint, sortPointsByDuration, sortPointsByPrice, sortPointsByDate};
