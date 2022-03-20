import {getTemplate} from './util.js';

const pictureTemplate = getTemplate('#picture', 'a');

const pictureTitle = document.querySelector('.pictures__title');
pictureTitle.classList.remove('visually-hidden');

export function generateCard ({url, likes, comment, id}) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comment.length;
  picture.dataset.id = id;
  return picture;
}
