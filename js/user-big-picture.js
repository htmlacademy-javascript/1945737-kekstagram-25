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
const step = 5;
let stepNow = 5;

//комментарии к большому фото
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
  text.classList.add('social__text');
  comment.append(commentImage);
  comment.append(text);
  return comment;
};

const toggleVisibleBigPicture = (flag, className) => {
  const action = flag ? 'remove': 'add';
  bigPicture.classList[action](className);
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
  stepNow += step;
  toggleVisibleBigPicture(true, 'hidden');
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  toggleVisibleBigPicture(false, 'hidden');
};

const isCloseBigPicture = () => bigPicture.classList.contains('hidden');


//вывод комментариев по 5
commentsLoader.addEventListener('click', () => {
  const elements = [...socialComments.children];
  for (let i = 0; i < elements.slice(0, stepNow).length; i++) {
    const el = elements[i];
    el.style.display = 'flex';
  }
  const actualStep = stepNow < elements.length ? stepNow : elements.length;
  socialCommentCount.textContent = `${actualStep} из ${elements.length} комментариев`;
  if (stepNow >= elements.length) {
    commentsLoader.classList.add('hidden');
    stepNow = step;
  } else {
    stepNow += step;
  }
});

export {
  openBigPicture,
  closeBigPicture,
  bigPicture,
  isCloseBigPicture,
  body
};
