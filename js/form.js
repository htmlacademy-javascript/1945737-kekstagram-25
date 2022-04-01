import {body} from './big-picture.js';
import {textHashtags, textDescription} from './validation.js';


const file = document.querySelector('#upload-file');
const modalPhotoRedactor = document.querySelector('.img-upload__overlay');
const photo = modalPhotoRedactor.querySelector('img');
const scaleControlValue = document.querySelector('.scale__control--value');

file.addEventListener('change', (evt) => {
  modalPhotoRedactor.classList.remove('hidden');
  body.classList.add('modal-open');

  //console.log(evt.target.files);
  //у file тип file (input?). поэтому есть свойство files
  //с помощью target извлекается из FileList элемент [0]
  photo.src = URL.createObjectURL(evt.target.files[0]);
  scaleControlValue.value = '100%';
  photo.style.transform = 'scale(1)';

});

const scaleControlButtons = document.querySelector('.img-upload__scale');
const scaleControlSmaller = scaleControlButtons.querySelector('.scale__control--smaller');
const scaleControlBigger = scaleControlButtons.querySelector('.scale__control--bigger');

const step = 25;

function onClickScContrSmall () {
  const value = scaleControlValue.value;
  const newValue = parseInt(value, 10) - step;
  if (newValue <= 0) {
    return;
  }
  scaleControlValue.value = `${newValue  }%`;
  photo.style.transform = `scale(${newValue/100})`;
}

function onClickScContrBig () {
  const value = scaleControlValue.value;
  const newValue = parseInt(value, 10) + step;
  if (newValue > 100) {
    return;
  }
  scaleControlValue.value = `${newValue  }%`;
  photo.style.transform = `scale(${newValue/100})`;
}


scaleControlSmaller.addEventListener('click',onClickScContrSmall);
scaleControlBigger.addEventListener('click',onClickScContrBig);

//эффекты
const effectRadio = modalPhotoRedactor.querySelectorAll('.effects__radio');
const effectsPreviews = modalPhotoRedactor.querySelectorAll('.effects__preview');


const previewsSelectors = [
  '.effects__preview--none',
  '.effects__preview--chrome',
  '.effects__preview--sepia',
  '.effects__preview--marvin',
  '.effects__preview--phobos',
  '.effects__preview--heat'
];

const onClickEffect = function (effectsPreview, previewsSelector) {
  effectsPreview.addEventListener('click', ()=> {
    photo.classList.add(previewsSelector);
  });
};

for (let i = 0; i < effectsPreviews.length; i++) {
  onClickEffect(effectsPreviews[i], previewsSelectors[i]);
  effectRadio[i].classList.remove('visually-hidden');
}


const closeForm = () => {
  body.classList.remove('modal-open');
  modalPhotoRedactor.classList.add('hidden');
};

const canCloseForm = () => {
  const isCloseForm = modalPhotoRedactor.classList.contains('hidden');
  const isActiveHashtag = document.activeElement === textHashtags;
  const isActiveDescription = document.activeElement === textDescription;
  return !isCloseForm && !isActiveHashtag && !isActiveDescription;
};

export {closeForm, canCloseForm};
