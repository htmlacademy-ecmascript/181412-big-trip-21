import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {FILTER_DAY_FORMAT} from '../const.js';
dayjs.extend(duration);

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
    case (minutes < 60):
      return differentTime.format('mm[M]');
  }
}

/* ФУНКЦИИ ФИЛЬТРАЦИИ */
// Точка, у которой дата начала ДО(больше) текущей
// Текущая ДО начала
const isFuturePoint = (dateStart) => {
  const formatDateStart = humanizePointDueDate(dateStart, FILTER_DAY_FORMAT);
  //console.log('дата Начала Больше?', formatDateStart)
  //console.log('текущей даты', '2023-05-14')
  return dayjs().isBefore(dayjs(formatDateStart));
};

// Точка, у которой дата начала ДО текущей, а дата окончания ПОСЛЕ текущей
// Текущая ПОСЛЕ начала и ДО конца
const isPresentPoint = (dateStart, dateEnd) => {
  const formatDateStart = humanizePointDueDate(dateStart, FILTER_DAY_FORMAT);
  const formatDateEnd = humanizePointDueDate(dateEnd, FILTER_DAY_FORMAT);

  //console.log('текущая дата', '2023-08-23')
  //console.log(formatDateStart, '- эта дата ПОСЛЕ текущей?', dayjs().isAfter(dayjs(formatDateStart)))
  //console.log(formatDateEnd, '- эта дата ДО текущей?', dayjs().isBefore(dayjs(formatDateEnd)))
  return dayjs().isAfter(dayjs(formatDateStart)) && dayjs().isBefore(dayjs(formatDateEnd));
};

// Точка, у которой дата начала ПОСЛЕ(меньше) текущей
// текущая ПОСЛЕ конца
const isPastPoint = (dateEnd) => {
  const formatDateEnd = humanizePointDueDate(dateEnd, FILTER_DAY_FORMAT);
  //console.log('дата Окончания меньше?', formatDateEnd)
  //console.log('текущей даты', '2023-05-14')
  //console.log(dayjs().isAfter(dayjs(formatDateEnd)))
  return dayjs().isAfter(dayjs(formatDateEnd));
};

export {humanizePointDueDate, calculateDiffTime, isFuturePoint, isPastPoint, isPresentPoint};
