import {openBigPicture, closeBigPicture, isCloseBigPicture} from './big-picture.js';
//import {generateIdentifies} from './data.js';
import {generateCard} from './user-photos.js';
import {closeForm, canCloseForm} from './form.js';
import './validation.js';
import {setUserFormSubmit} from './validation.js';
import {getData} from './api.js';
import './filter.js';


const pics = document.querySelector('.pictures');

const renderPhotoList = (photoList) => {
  photoList.forEach((cardData) => {
    const card = generateCard (cardData);
    card.addEventListener('click', () => {
    //const element = evt.currentTarget;
    //const id = element.getAtribute('data-id');
      openBigPicture(cardData);
    });
    pics.append(card);
  });
};


const onGlobalClick = (evt) => {
  const element = evt.target;

  if (element.closest('.cancel')) {
    closeBigPicture();
    closeForm();
    // element.style.display = 'none';
  }
};

const onGlobalKeyDown = (evt) => {
  const key = evt.keyCode;
  if (key === 27 && !isCloseBigPicture()) {
    closeBigPicture();
  }
  if (key === 27 && canCloseForm()) {
    closeForm();
  }
};

document.addEventListener('click', onGlobalClick);
document.addEventListener('keydown', onGlobalKeyDown);

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

  // setTimeout(() => {
  //   alertContainer.remove();
  // }, ALERT_SHOW_TIME);
};


// const error = () => {

// };

const loadPhoto = getData((renderPhotoList),showError('Ошибка загрузки данных. Попробуйте позже'));
loadPhoto();

// getData((cardPhoto) => {
//   renderPhotoList(cardPhoto);
//   showError('Ошибка загрузки данных. Попробуйте позже');
// });

setUserFormSubmit(closeForm);
