import {getRandomArrayElement, getRandomNumber} from '../utils/common.js';
import {nanoid} from 'nanoid';

const mockPoints = [
  {
    type: 'taxi',
    offers: [1, 2],
    basePrice: 500,
    dateFrom: '2023-06-11T03:45:56.845Z',
    dateTo: '2023-07-12T05:00:13.375Z',
    isFavorite: true,
    destination: ''
  },
  {
    type: 'bus',
    offers: [1, 3],
    basePrice: 40,
    dateFrom: '2023-09-11T02:30:56.845Z',
    dateTo: '2023-09-12T04:00:13.375Z',
    isFavorite: true,
    destination: '2'
  },
  {
    type: 'train',
    offers: [1, 2],
    basePrice: 200,
    dateFrom: '2023-10-11T02:30:56.845Z',
    dateTo: '2023-10-12T06:00:13.375Z',
    isFavorite: true,
    destination: '0'
  },
  {
    type: 'ship',
    offers: [],
    basePrice: 80,
    dateFrom: '2023-08-10T01:30:56.845Z',
    dateTo: '2023-08-12T04:00:13.375Z',
    isFavorite: true,
    destination: '2'
  },
  {
    type: 'drive',
    offers: [1, 2],
    basePrice: 90,
    dateFrom: '2023-09-11T05:30:56.845Z',
    dateTo: '2023-09-11T07:00:13.375Z',
    isFavorite: true,
    destination: '1'
  },
  {
    type: 'flight',
    offers: [1, 2, 3],
    basePrice: 150,
    dateFrom: '2023-08-22T03:15:56.845Z',
    dateTo: '2023-08-25T03:45:13.375Z',
    isFavorite: true,
    destination: '0'
  },
  {
    type: 'check-in',
    offers: [1],
    basePrice: 150,
    dateFrom: '2023-07-11T03:30:56.845Z',
    dateTo: '2023-07-12T05:30:13.375Z',
    isFavorite: false,
    destination: '1'
  },
  {
    type: 'sightseeing',
    offers: [1, 2],
    basePrice: 100,
    dateFrom: '2023-08-11T03:30:56.845Z',
    dateTo: '2023-08-21T07:00:13.375Z',
    isFavorite: false,
    destination: '3'
  },
  {
    type: 'restaurant',
    offers: [2],
    basePrice: 100,
    dateFrom: '2023-08-10T03:30:56.845Z',
    dateTo: '2023-08-10T04:15:13.375Z',
    isFavorite: false,
    destination: '2'
  }
];

const mockDestinations = [
  {
    id: '0',
    description: 'Столица России, город федерального значения, административный центр Центрального федерального округа и центр Московской области',
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Moscow  Moscow '
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Moscow  Moscow '
      }
    ]
  },
  {
    id: '1',
    description: 'Saint Petersburg, formerly known as Petrograd (1914–1924) and later Leningrad (1924–1991; see below), is the second-largest city in Russia after Moscow.',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Saint Petersburg Saint Petersburg'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Saint Petersburg1 Saint Petersburg1'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Saint Petersburg2 Saint Petersburg2'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Saint Petersburg3 Saint Petersburg3'
      }
    ]
  },
  {
    id: '2',
    description: 'Is the largest city and administrative centre of Novosibirsk Oblast and the Siberian Federal District in Russia.',
    name: 'Novosibirsk',
    pictures: []
  },
  {
    id: '3',
    description: 'Is a city and the administrative centre of Sverdlovsk Oblast and the Ural Federal District, Russia.',
    name: 'Yekaterinburg ',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Yekaterinburg  Yekaterinburg '
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'Yekaterinburg  Yekaterinburg '
      }
    ]
  }
];

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Select radio station',
        price: 120
      },
      {
        id: 2,
        title: 'Order Uber',
        price: 20
      },
      {
        id: 3,
        title: 'Non-smoking driver',
        price: 5
      },
      {
        id: 4,
        title: 'Baby chair',
        price: 5
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Select radio station',
        price: 120
      },
      {
        id: 2,
        title: 'Window seat',
        price: 20
      },
      {
        id: 3,
        title: 'reclining seat',
        price: 20
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 2,
        title: 'Business Class',
        price: 100
      },
      {
        id: 3,
        title: 'Vegan lunch',
        price: 15
      },
      {
        id: 4,
        title: 'Choose a seat',
        price: 5
      },
      {
        id: 5,
        title: 'Taxi at the gangway',
        price: 40
      },
    ]
  },
  {
    'type': 'train',
    'offers': [{
      id: 1,
      title: 'Select radio station',
      price: 120
    },
    {
      id: 2,
      title: 'Bottom shelf',
      price: 20
    }]
  },
  {
    type: 'ship',
    offers: []
  },
  {
    type: 'drive',
    offers: [{
      id: 1,
      title: 'Non-smoking driver',
      price: 120
    },
    {
      id: 2,
      title: 'Air conditioning',
      price: 20
    }]
  },
  {
    type: 'check-in',
    offers: [{
      id: 1,
      title: 'Additional cleaning',
      price: 120
    },
    {
      id: 2,
      title: 'Early settlement',
      price: 20
    }]
  },
  {
    type: 'sightseeing',
    offers: [{
      id: 1,
      title: 'Skip-the-line entry',
      price: 120
    },
    {
      id: 2,
      title: 'Personal guide',
      price: 20
    },
    {
      id: 3,
      title: 'Lunch included',
      price: 20
    }
    ]
  },
  {
    type: 'restaurant',
    offers: [{
      id: 1,
      title: 'Table by the window',
      price: 12
    },
    {
      id: 2,
      title: 'Personal waiter',
      price: 20
    }]
  },
];

// Функция для получения случайной точки из массива точек
function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

function getDestinations() {
  return mockDestinations;
}

function getOffers() {
  return mockOffers;
}

export {getRandomPoint, mockDestinations, mockOffers, mockPoints, getDestinations, getOffers};
