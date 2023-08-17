import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);
// Функция для получения случайного элемента массива, аргументом передаем массив
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Функция для преобразования даты в нужный формат
function humanizePointDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

/* Функция для расчета разницы */
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

export {getRandomArrayElement, humanizePointDueDate, calculateDiffTime};
