// Функция для получения случайного элемента массива, аргументом передаем массив
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Функция для получения случайного числа из указанного диапазона
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export {getRandomArrayElement, getRandomNumber};
