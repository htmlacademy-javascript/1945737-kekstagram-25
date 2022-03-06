const getRandomInteger = (min,max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function maxLenghtString (string,maxLenght) {
  return string.length <= maxLenght;
}

export {getRandomInteger, getRandomArrayElement, maxLenghtString};
