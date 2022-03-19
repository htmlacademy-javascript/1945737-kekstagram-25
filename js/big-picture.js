import {toggleVisibleBigPicture} from './util.js';

const SELECTORS = {
  bigPicture: '.big-picture',
  img: '.big-picture__img img',
  like: '.likes-count',
  commentsCount: '.comments-count',
  comments: '.social__comments',
  socialComment: '.social__comment-count',
  commentsLoader: '.comments-loader',
  description: '.social__caption'
};

const bigPicture = document.querySelector(SELECTORS.bigPicture);
const image = bigPicture.querySelector(SELECTORS.img);
const likeCount = bigPicture.querySelector(SELECTORS.like);
const commentCount = bigPicture.querySelector(SELECTORS.commentsCount);
const comments = bigPicture.querySelector(SELECTORS.comments);
const socialComment = bigPicture.querySelector(SELECTORS.socialComment);
const commentsLoader = bigPicture.querySelector(SELECTORS.commentsLoader);
const descriptionsText = bigPicture.querySelector(SELECTORS.description);
const body = document.body;

commentsLoader.classList.add('hidden');
socialComment.classList.add('hidden');

const generateCommentLayout = (src, alt, description) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.width = '35';
  commentImage.height = '35';
  commentImage.src = src;
  commentImage.alt = alt;
  const text = document.createElement('p');
  text.textContent = description;
  text.classList.add('social__caption');
  comment.append(commentImage);
  comment.append(text);
  return comment;
};


const openBigPicture = ({description, comment, likes, url}) => {
  body.classList.add('modal-open');
  comments.innerHTML = '';
  image.src = url;
  descriptionsText.textContent = description;
  likeCount.textContent = likes;
  commentCount.textContent = comment.length;

  comment.forEach((data) => {
    const {name, message, avatar} = data;
    const commentNode = generateCommentLayout(avatar, name, message);
    comments.append(commentNode);
  });

  toggleVisibleBigPicture(true, 'hidden');
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  toggleVisibleBigPicture(false, 'hidden');
};

const isClose = bigPicture.classList.contains('hidden');

export {openBigPicture, closeBigPicture, bigPicture, isClose};
