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
const socialComments = bigPicture.querySelector(SELECTORS.comments);
const socialCommentCount = bigPicture.querySelector(SELECTORS.socialComment);
const commentsLoader = bigPicture.querySelector(SELECTORS.commentsLoader);
const descriptionsText = bigPicture.querySelector(SELECTORS.description);
const body = document.body;


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

const openBigPicture = ({description, comments, likes, url}) => {
  body.classList.add('modal-open');
  socialComments.innerHTML = '';
  image.src = url;
  descriptionsText.textContent = description;
  likeCount.textContent = likes;
  socialCommentCount.textContent = '';
  socialCommentCount.textContent = `5 из ${  comments.length} комментариев`;

  commentsLoader.classList.remove('hidden');

  if (comments.length <= 5) {
    socialCommentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    commentsLoader.classList.add('hidden');
  }

  comments.forEach((data, commentNumber) => {
    const {name, message, avatar} = data;
    const commentNode = generateCommentLayout(avatar, name, message);
    if (commentNumber > 4) {
      commentNode.style.display = 'none';
      commentCount.textContent = `5 из ${  comments.length} комментариев`;
    }
    socialComments.append(commentNode);
  });

  toggleVisibleBigPicture(true, 'hidden');
};


commentsLoader.addEventListener('click', () => {
  const elements = [socialComments.children];
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    el.style.display = 'flex';
  }
  commentsLoader.classList.add('hidden');
  socialCommentCount.textContent = `${elements.length} из ${  elements.length} комментариев`;
});

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  toggleVisibleBigPicture(false, 'hidden');
};

const isCloseBigPicture = () => bigPicture.classList.contains('hidden');

export {openBigPicture, closeBigPicture, bigPicture, isCloseBigPicture, body};
