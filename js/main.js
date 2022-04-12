import {openBigPicture, closeBigPicture, isCloseBigPicture} from './big-picture.js';
import {generateCard} from './user-photos.js';
import {closeForm, canCloseForm} from './form.js';
import {setUserFormSubmit} from './validation.js';
import {getData} from './api.js';
import { openFilter, setActiveFilterButton, filtersFunctionSortMap } from './filter.js';
import { isEscapeKey, debounce } from './util.js';


const pictures = document.querySelector('.pictures');

let photosFromServer = [];

const renderPhotoList = (photoList) => {
  photoList.forEach((cardData) => {
    const card = generateCard (cardData);
    card.addEventListener('click', () => {
      openBigPicture(cardData);
    });
    pictures.append(card);
  });
};

const deleteLastPhotos = () => {
  const allLastPhoto = pictures.querySelectorAll('.picture');
  allLastPhoto.forEach((photo) => photo.remove());
};

const onGlobalClick = (evt) => {
  const element = evt.target;
  const isClosetButton = element.closest('.cancel');
  const isFilterButton = element.closest('.img-filters__button');

  if (isClosetButton) {
    closeBigPicture();
    closeForm();
    return;
  }

  if (isFilterButton) {
    const filterType = element.getAttribute('id');
    setActiveFilterButton(isFilterButton);
    const sortFunction = filtersFunctionSortMap[filterType];
    const newPhoto = sortFunction(photosFromServer);
    deleteLastPhotos();
    renderPhotoList(newPhoto);
    // const RERENDER_DELAY = 500;
    // openFilter(debounce(
    //   () => renderPhotoList(newPhoto),
    //   RERENDER_DELAY,
    // ));
  }
};


const onGlobalKeyDown = (evt) => {
  const key = evt.keyCode;
  if (isEscapeKey(key) && !isCloseBigPicture()) {
    closeBigPicture();
    return;
  }
  if (isEscapeKey(key) && canCloseForm()) {
    closeForm();
  }
};


setUserFormSubmit();

getData((cardPhoto) => {
  photosFromServer = cardPhoto;
  openFilter();
  renderPhotoList(cardPhoto);
  // openFilter(debounce(
  //   () => renderPhotoList(cardPhoto),
  //   RERENDER_DELAY,
  // ));
});

debounce();//ESlint

document.addEventListener('click', onGlobalClick);
document.addEventListener('keydown', onGlobalKeyDown);
