// Функция для получения случайного элемента массива, аргументом передаем массив
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement};
