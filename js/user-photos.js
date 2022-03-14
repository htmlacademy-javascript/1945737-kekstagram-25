import {getTemplate} from './util.js';

const pictureTemplate = getTemplate('#picture', 'a');

export function generateCard ({url, likes, comment}) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comment.length;
  return picture;
}
