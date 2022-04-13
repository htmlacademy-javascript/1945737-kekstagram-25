import {getRandomInteger} from './util.js';

const settings = {
  filterWrapper: '.img-filters',
  filterWrapperInActiveClass: 'img-filters--inactive',
  filterButtonActiveClass: 'img-filters__button--active',
};

const filterWrapper = document.querySelector(settings.filterWrapper);

const openFilter = () => filterWrapper.classList.remove(settings.filterWrapperInActiveClass);

const setActiveFilterButton = (button) => {
  const prevActiveButton = filterWrapper.querySelector(`.${settings.filterButtonActiveClass}`);
  prevActiveButton.classList.remove(settings.filterButtonActiveClass);
  button.classList.add(settings.filterButtonActiveClass);
};

const getRandomPhotos = (photos) => {
  const photosCopy = photos.slice();
  const newPhotos = [];
  for (let index = 0; index < 10; index++) {
    const generatedRandomItem = getRandomInteger(0, photosCopy.length);
    newPhotos.push(photosCopy[generatedRandomItem]);
    photosCopy.splice(generatedRandomItem, 1);
  }
  return newPhotos;
};

const getSortPhotosByComments = (photos) => {
  const photoCopy = photos.slice();
  return photoCopy.sort((photoA, photoB) => {
    const commentA = photoA.comments.length;
    const commentB = photoB.comments.length;
    return commentB - commentA;
  });
};

const filtersFunctionSortMap = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => getRandomPhotos(photos),
  'filter-discussed': (photos) => getSortPhotosByComments(photos),
};

export {
  openFilter,
  setActiveFilterButton,
  filtersFunctionSortMap,
};
