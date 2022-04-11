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

// document.removeEventListener('click', onGlobalClick);
// document.removeEventListener('keydown', onGlobalKeyDown);


getData((cardPhoto) => {
  renderPhotoList(cardPhoto);
});

setUserFormSubmit(closeForm);
