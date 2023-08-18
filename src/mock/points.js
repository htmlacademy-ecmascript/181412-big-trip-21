import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    type: 'taxi',
    offers: [1, 2],
    basePrice: 500,
    dateFrom: '2023-06-11T03:45:56.845Z',
    dateTo: '2023-07-12T05:00:13.375Z',
    isFavorite: true,
    destination: 3
  },
  {
    type: 'bus',
    offers: [1, 3],
    basePrice: 40,
    dateFrom: '2023-09-11T02:30:56.845Z',
    dateTo: '2023-09-12T04:00:13.375Z',
    isFavorite: true,
    destination: 2
  },
  {
    type: 'train',
    offers: [1, 2],
    basePrice: 200,
    dateFrom: '2023-10-11T02:30:56.845Z',
    dateTo: '2023-10-12T06:00:13.375Z',
    isFavorite: true,
    destination: 3
  },
  {
    type: 'ship',
    offers: [1, 2],
    basePrice: 80,
    dateFrom: '2023-08-10T01:30:56.845Z',
    dateTo: '2023-08-12T04:00:13.375Z',
    isFavorite: true,
    destination: 2
  },
  {
    type: 'drive',
    offers: [1, 2],
    basePrice: 90,
    dateFrom: '2023-09-11T05:30:56.845Z',
    dateTo: '2023-09-11T07:00:13.375Z',
    isFavorite: true,
    destination: 1
  },
  {
    type: 'flight',
    offers: [1, 2, 3],
    basePrice: 150,
    dateFrom: '2023-06-11T03:15:56.845Z',
    dateTo: '2023-06-12T03:45:13.375Z',
    isFavorite: true,
    destination: 2
  },
  {
    type: 'check-in',
    offers: [1, 2],
    basePrice: 150,
    dateFrom: '2023-07-11T03:30:56.845Z',
    dateTo: '2023-07-12T05:30:13.375Z',
    isFavorite: false,
    destination: 1
  },
  {
    type: 'sightseeing',
    offers: [1, 2],
    basePrice: 100,
    dateFrom: '2023-08-11T03:30:56.845Z',
    dateTo: '2023-08-21T07:00:13.375Z',
    isFavorite: false,
    destination: 2
  },
  {
    type: 'restaurant',
    offers: [1, 2],
    basePrice: 100,
    dateFrom: '2023-08-10T03:30:56.845Z',
    dateTo: '2023-08-10T04:15:13.375Z',
    isFavorite: false,
    destination: 1
  }
];

const BLANK_POINT = { // Это объект с описанием точки по умолчанию. ПУСТАЯ ТОЧКА
  type: '',
  offers: [1, 3],
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  destination: 2
}

// Функция для получения случайной точки из массива точек
function getRandomTask() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomTask, BLANK_POINT};
