const getRandomInteger = (min,max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);};


function maxLenghtString (string,maxLenght) {
  return string.length <= maxLenght;
}
maxLenghtString('Привет',10);


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

const DESCRIPTIONS = [
  'Запомнил навсегда!',
  'Считаю это фото лучшее!',
  'Как вам это?',
  'Круто, да?'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


function photoDescription (_, countPosition) {
  const randImage = countPosition + 1;

  return {
    id: randImage,
    url: `photos/${randImage}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger (15,200),
    comment: Array.from({length: getRandomInteger (1,10)}, listComments)
  };
}

function listComments () {

  return {
    id: getRandomInteger (200,300),
    avatar: `img/avatar-${getRandomInteger (1,6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
}

const GENERATED_DATA_AMOUNT = 25;
const generateIdentifies = Array.from({length: GENERATED_DATA_AMOUNT}, photoDescription);


const someFunc = () => generateIdentifies;
someFunc(); //ESlint
