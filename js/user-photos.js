import {generateIdentifies} from './data.js';

const pics = document.querySelector('.pictures');
pics.querySelector('h2').classList.remove('visually-hidden');

const pictureTemplate = document.querySelector('#picture')
  .innerHTML
  .querySelector('a');

const picturesArr = generateIdentifies();
const pictureFragment = document.createDocumentFragment();

picturesArr.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').like = likes;
  picture.querySelector('.picture__comments').comment = comments;
  pictureFragment.append(picture);
});

pics.append(pictureFragment);
