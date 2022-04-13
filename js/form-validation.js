import {getTemplate} from './util.js';
import {sendData} from './api.js';
import {body} from './user-big-picture.js';
import {closeForm} from './form.js';

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const mistakeTextHashtag = 'Разрешено использовать латинские и русские буквы, цифры. Текст хэштега не более 20 символов, включая #. Количество хэштегов не более пяти';
const mistakeTextDescription = 'Длина текста не более 140 символов';

const error = getTemplate('#error', 'section');
const success = getTemplate('#success', 'section');

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

pristine.addValidator(textDescription, validatorDescription, mistakeTextDescription);
pristine.addValidator(textHashtags, allHashtagValidator, mistakeTextHashtag);


//сообщения о неудачной/успешной отправке
const errorTemplate = () => {
  const errorNode = error.cloneNode(true);
  closeForm();
  body.append(errorNode);
  errorNode.addEventListener('click', function getError () {
    errorNode.classList.add('hidden');
    errorNode.remove();
    errorNode.removeEventListener('click', getError);
  });
};

const successTemplate = () => {
  const successNode = success.cloneNode(true);
  closeForm();
  body.append(successNode);
  successNode.addEventListener('click', function getSuccess () {
    successNode.classList.add('hidden');
    successNode.remove();
    successNode.removeEventListener('click', getSuccess);
  });
};


const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    const onSuccess = () => {
      successTemplate();
      form.reset();
    };

    const onError = () => {
      errorTemplate();
      form.reset();
    };

    const formData = new FormData(evt.target);
    sendData(onSuccess, onError, formData);
  });
};

export {
  textHashtags,
  textDescription,
  setUserFormSubmit,
  errorTemplate,
  successTemplate
};
