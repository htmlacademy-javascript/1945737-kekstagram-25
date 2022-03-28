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


// commentsLoader.classList.add('hidden');
// socialComment.classList.add('hidden');

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

//const delTextHTML = socialComment.removeChild('5 из ');

const openBigPicture = ({description, comment, likes, url}) => {
  body.classList.add('modal-open');
  comments.innerHTML = '';
  image.src = url;
  descriptionsText.textContent = description;
  likeCount.textContent = likes;
  // socialComment.textContent = '';
  // socialComment.textContent = `5 из ${  comment.length} комментариев`;

  // commentsLoader.classList.remove('hidden');

  // if (comment.length <= 5) {
  //   socialComment.textContent = `${comment.length} из ${comment.length} комментариев`;
  //   commentsLoader.classList.add('hidden');
  // }

  comment.forEach((data, i) => {
    const {name, message, avatar} = data;
    const commentNode = generateCommentLayout(avatar, name, message);
    // if ( i > 4) {
    //   commentNode.style.display = 'none';
    //   commentCount.textContent = `5 из ${  comment.length} комментариев`;
    // }
    comments.append(commentNode);
  });

  toggleVisibleBigPicture(true, 'hidden');
};


// commentsLoader.addEventListener('click', () => {
//   const elements = comments.children;
//   for (let i = 0; i < elements.length; i++) {
//     const el = elements[i];
//     el.style.display = 'flex';
//   }
//   commentsLoader.classList.add('hidden');
//   commentCount.textContent = `${elements.length  } из ${  elements.length}`;
// });

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  toggleVisibleBigPicture(false, 'hidden');
};

const isCloseBigPicture = bigPicture.classList.contains('hidden');

export {openBigPicture, closeBigPicture, bigPicture, isCloseBigPicture, body};
