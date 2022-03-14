import {generateIdentifies} from './data.js';
import {generateCard} from './user-photos.js';

const pics = document.querySelector('.pictures');
pics.querySelector('h2').classList.remove('visually-hidden');

const pictureData = generateIdentifies;

pictureData.forEach((cardData) => {
  const card = generateCard (cardData);
  pics.append(card);
});
