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
const effectItems = modalPhotoRedactor.querySelectorAll('.effects__item');

const previewsSelectors = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};

const setEffectOnPhoto = (effect) => {
  const allEffectClasses = Object.values(previewsSelectors);
  photo.classList.remove(...allEffectClasses);
  photo.classList.add(effect);
};

const setNewEffect = function (evt) {
  const element = evt.currentTarget;
  const radioInput = element.querySelector('.effects__radio');
  const effectName = radioInput.value;
  const effectClass = previewsSelectors[effectName];
  setEffectOnPhoto(effectClass);
};

effectItems.forEach((effectLabel) => effectLabel.addEventListener('click', setNewEffect));


//слайдер
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const effectSepia= modalPhotoRedactor.querySelector('#effect-sepia');
const effectsPreviewSepia= modalPhotoRedactor.querySelector('.effects__preview--sepia');

effectLevelValue.value = '50';

noUiSlider.create(effectLevelSlider, {
  toltips: true,
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

});

effectsPreviewSepia.addEventListener('change', () => {
  // for ( let i >= 1, i=i+0.1) {
  // effectSepia.style.filter = 'sepia(0)';
  // }
  // effectSepia.style.filter = 'sepia(0)';
  if (effectSepia.checked) {
    photo.style.filter = 'sepia(0)';
  //   effectLevelSlider.noUiSlider.updateOptions({
  //     range: {
  //       min: 0,
  //       max: 1,
  //     },
  //     start: 1,
  //     step: 0.1,
  //   });
  // } else {
  //   effectLevelSlider.noUiSlider.updateOptions({
  //     range: {
  //       min: 0,
  //       max: 100,
  //     },
  //     step: 1,
  //   });
  }
});


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
