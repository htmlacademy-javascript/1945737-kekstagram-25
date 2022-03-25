import {body} from './big-picture.js';
import {pressEscape} from './util.js';


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

//как реализовать не понимаю
URL.revokeObjectURL(photo.src);

/*const scaleControlSmaller = document.querySelector('.scale__control--smaller');

scaleControlSmaller.addEventListener('click', () => {
    const step = 0.25;
    const value = scaleControlValue.value;
    const newValue = parseInt(value, 10) - step;
    if (newValue<0) {

        return;
    }

    value = newValue;
    photo.style.transform = `scale(${newValue/100})`;
});*/


//закрыть модалку
const buttonCancel = document.querySelector('#upload-cancel');

buttonCancel.addEventListener ('click', () => {
  modalPhotoRedactor.classList.add('hidden');
  body.classList.remove('modal-open');
});


document.addEventListener('keydown', (evt) => {
  if (pressEscape(evt)) {
    evt.preventDefault();
    modalPhotoRedactor.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

