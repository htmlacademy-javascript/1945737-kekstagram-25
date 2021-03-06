import {body} from './user-big-picture.js';
import {textHashtags, textDescription} from './form-validation.js';

const file = document.querySelector('#upload-file');
const modalPhotoRedactor = document.querySelector('.img-upload__overlay');
const photo = modalPhotoRedactor.querySelector('img');
const scaleControlValue = document.querySelector('.scale__control--value');

const scaleControlButtons = document.querySelector('.img-upload__scale');
const scaleControlSmaller = scaleControlButtons.querySelector('.scale__control--smaller');
const scaleControlBigger = scaleControlButtons.querySelector('.scale__control--bigger');

const step = 25;

const effectItems = modalPhotoRedactor.querySelectorAll('.effects__item');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const previewsSelectors = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};

const effectsSettings = {
  chrome: {
    max: 1,
    step: 0.1,
    css: (value) => `grayscale(${value})`,
  },
  sepia: {
    max: 1,
    step: 0.1,
    css: (value) => `sepia(${value})`,
  },
  marvin: {
    max: 100,
    step: 1,
    css: (value) => `invert(${value}%)`,
  },
  phobos: {
    max: 3,
    step: 0.1,
    css: (value) => `blur(${value}px)`,
  },
  heat: {
    max: 3,
    step: 0.1,
    css: (value) => `brightness(${value})`,
  },
};


//масштаб изображения, эффекты
const onClickScContrSmall = function () {
  const value = scaleControlValue.value;
  const newValue = parseInt(value, 10) - step;
  if (newValue <= 0) {
    return;
  }
  scaleControlValue.value = `${newValue  }%`;
  photo.style.transform = `scale(${newValue/100})`;
};

const onClickScContrBig = function () {
  const value = scaleControlValue.value;
  const newValue = parseInt(value, 10) + step;
  if (newValue > 100) {
    return;
  }
  scaleControlValue.value = `${newValue  }%`;
  photo.style.transform = `scale(${newValue/100})`;
};

const removeAllEffectClasses = () => {
  const allEffectClasses = Object.values(previewsSelectors);
  photo.classList.remove(...allEffectClasses);
};

const resetAttributes = () => {
  photo.removeAttribute('src');
  removeAllEffectClasses();
};

const removePhotoTransformStyle = () => {
  photo.style.transform = 'unset';
};

const removePhotoFilterStyle = () => {
  photo.style.filter = 'unset';
};

const setEffectOnPhoto = (effect) => {
  removeAllEffectClasses();
  photo.classList.add(effect);
};


//слайдер
const createRangeSlider = function ({stepSlider, max, css}) {
  const slider = noUiSlider.create(effectLevelSlider, {
    start: max,
    step: stepSlider,
    range: {
      min: 0,
      max
    }
  });
  effectLevelValue.value = max;

  slider.on('update', (...rest) => {
    const [,,arrayValue] = rest;
    const [value] = arrayValue;
    const cssValue = css(value);
    photo.style.filter = cssValue;
    effectLevelValue.value = value;
  });
};

const destroySlider = function () {
  if (!effectLevelSlider.noUiSlider) {
    return;
  }
  effectLevelSlider.noUiSlider.destroy();
};

const setNewEffect = function (evt) {
  const element = evt.currentTarget;
  const radioInput = element.querySelector('.effects__radio');
  const effectName = radioInput.value;
  const effectClass = previewsSelectors[effectName];
  const sliderSettingsForEffect = effectsSettings[effectName];
  destroySlider();
  removePhotoFilterStyle();
  setEffectOnPhoto(effectClass);
  if (effectName !== 'none') {
    createRangeSlider(sliderSettingsForEffect);
  }
};


//закрытие формы
const closeForm = () => {
  body.classList.remove('modal-open');
  modalPhotoRedactor.classList.add('hidden');
  resetAttributes();
  destroySlider();
  removePhotoTransformStyle();
  removePhotoFilterStyle();
};

const canCloseForm = () => {
  const isCloseForm = modalPhotoRedactor.classList.contains('hidden');
  const isActiveHashtag = document.activeElement === textHashtags;
  const isActiveDescription = document.activeElement === textDescription;
  return !isCloseForm && !isActiveHashtag && !isActiveDescription;
};


//обработчики
file.addEventListener('change', (evt) => {
  modalPhotoRedactor.classList.remove('hidden');
  body.classList.add('modal-open');
  photo.src = URL.createObjectURL(evt.target.files[0]);
  scaleControlValue.value = '100%';
  photo.style.transform = 'scale(1)';
  photo.classList.add('effects__preview--none');
});

effectItems.forEach((effectLabel) => effectLabel.addEventListener('click', setNewEffect));

scaleControlSmaller.addEventListener('click',onClickScContrSmall);
scaleControlBigger.addEventListener('click',onClickScContrBig);

export {
  closeForm,
  canCloseForm,
  resetAttributes
};
