import {bigPicture} from './big-picture.js';

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

const toggleVisibleBigPicture = (flag, className) => {
  const action = flag ? 'remove': 'add';
  bigPicture.classList[action](className);

};

const showError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  maxLengthString,
  getTemplate,
  toggleVisibleBigPicture,
  showError
};
