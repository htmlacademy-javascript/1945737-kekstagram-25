import {openBigPicture, closeBigPicture} from './big-picture.js';
import {generateIdentifies} from './data.js';
import {generateCard} from './user-photos.js';
import './form.js';
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
  }
};

const onGlobalKeyDown = (evt) => {
  const key = evt.keyCode;
  if (key === 27) {
    closeBigPicture();

  }
};

document.addEventListener('click', onGlobalClick);
document.addEventListener('keydown', onGlobalKeyDown);
