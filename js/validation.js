import {getTemplate} from './util.js';
import {sendData} from './api.js';
import { body } from './big-picture.js';
import {closeForm} from './form.js';

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const mistakeTextHashtag = 'неверно введен хэштег';
const mistakeTextDescription = 'длина не больше 140 симв';


const validatorHashtag = (value) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(value) || value === '';
const validatorDescription = (value) => value.length < 141;

const hasDouble = (allHashtags) => {
  const countItems = allHashtags.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1;
    return acc;
  }, {});
  const count = Object.values(countItems);
  return count.every((number) => number === 1);
};


const allHashtagValidator = (value) => {
  const allHashtags = value.split(' ');
  const isValidHashtag = allHashtags.every(validatorHashtag);
  const amountHashtags = allHashtags.length < 6;
  const isNotDouble = hasDouble(allHashtags);
  return isValidHashtag && isNotDouble && amountHashtags;
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(textHashtags, allHashtagValidator, mistakeTextHashtag);
pristine.addValidator(textDescription, validatorDescription, mistakeTextDescription);

const errorTemplate = () => {
  const error = getTemplate('#error', 'section');
  closeForm();
  body.append(error);
  error.addEventListener('click', () => {
    error.classList.add('hidden');
  });
};

const successTemplate = () => {
  const success = getTemplate('#success', 'section');
  closeForm();
  body.append(success);
  success.addEventListener('click', () => {
    success.classList.add('hidden');
  });
};


const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => successTemplate(),
        () => errorTemplate(),
        new FormData(evt.target),
      );
    }
    // body.removeChild(body.firstChild);
    evt.target.reset();
  });
};

export {textHashtags, textDescription, setUserFormSubmit, errorTemplate, successTemplate};
