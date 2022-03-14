const getRandomInteger = (min,max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function maxLengthString (string,maxLenght) {
  return string.length <= maxLenght;
}

const getTemplate = function (templateID, contentTag) {
  const template = document.querySelector(templateID).content;
  const content = template.querySelector(contentTag);
  const clonedContent = content.cloneNode(true);
  return clonedContent;
};

export {getRandomInteger, getRandomArrayElement, maxLengthString, getTemplate};
