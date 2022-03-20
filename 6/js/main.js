import {openBigPicture, closeBigPicture} from './big-picture.js';
import {generateIdentifies} from './data.js';
import {generateCard} from './user-photos.js';


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

const handleGlobalClick = (evt) => {
  const element = evt.target;

  if (element.closest('.cancel')) {
    closeBigPicture();
  }
};

const handleGlobalKeyDown = (evt) => {
  const key = evt.keyCode;
  if (key === 27) {
    //const target = evt.target;
    //if (target.className !== 'cancel') {return;}
    closeBigPicture();

  }
};

document.addEventListener('click', handleGlobalClick);
document.addEventListener('keydown', handleGlobalKeyDown);
