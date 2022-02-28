const getRandomInteger = (min,max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);};

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Джо',
  'Владимир',
  'Алеша',
];


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


function photoDescription () {

  return {
    id: getRandomInteger (1,25),
    url: `photos/${getRandomInteger (1,25)}.jpg`,
    description: 'Было супер!',
    likes: getRandomInteger (15,200),
    comment: listComments()
  };
}

function listComments () {

  return {
    id: getRandomInteger (1,25),
    avatar: `img/avatar-${getRandomInteger (1,6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
}

const generateIdentifs = Array.from({length: 25},photoDescription);
generateIdentifs();
