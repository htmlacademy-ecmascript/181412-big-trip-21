// Функция для получения случайного элемента массива, аргументом передаем массив
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Функция для получения случайного числа из указанного диапазона
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Функция для получения обновленной точки
// возвращает такую точку из массива, у кот. id совпадает c id переданной
function updateItem(items, updateItem) {
  return items.map((item) => item.id === updateItem.id ? updateItem : item);
}

export {getRandomArrayElement, getRandomNumber, updateItem};
