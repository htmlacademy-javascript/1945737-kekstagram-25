import {openBigPicture, closeBigPicture, isCloseBigPicture} from './big-picture.js';
import {generateIdentifies} from './data.js';
import {generateCard} from './user-photos.js';
import {closeForm, isActiveDescription, isActiveHashtag, isCloseForm} from './form.js';
import './validation.js';

const pics = document.querySelector('.pictures');


generateIdentifies.forEach((cardData) => {
  const card = generateCard (cardData);
  card.addEventListener('click', () => {
    //const element = evt.currentTarget;
    //const id = element.getAtribute('data-id');
    openBigPicture(cardData);
  });
  pics.append(card);
});

const onGlobalClick = (evt) => {
  const element = evt.target;

  if (element.closest('.cancel')) {
    closeBigPicture();
    closeForm();
  }
};

const onGlobalKeyDown = (evt) => {
  const key = evt.keyCode;
  if (key === 27 && !isCloseBigPicture) {
    closeBigPicture();
  }
  if (key === 27 && !isCloseForm && !isActiveHashtag && !isActiveDescription) {
    closeForm();
  }
};

document.addEventListener('click', onGlobalClick);
document.addEventListener('keydown', onGlobalKeyDown);
