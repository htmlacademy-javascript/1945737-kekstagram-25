import {openBigPicture, closeBigPicture, isCloseBigPicture} from './user-big-picture.js';
import {generateCard} from './user-photos.js';
import {closeForm, canCloseForm} from './form.js';
import {setUserFormSubmit} from './form-validation.js';
import {getData} from './api.js';
import {openFilter, setActiveFilterButton, filtersFunctionSortMap} from './filter.js';
import {isEscapeKey, debounce} from './util.js';

const pictures = document.querySelector('.pictures');

let photosFromServer = [];

const RERENDER_DELAY = 500;

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

const renderSortingPhoto = (button) => {
  const filterType = button.getAttribute('id');
  setActiveFilterButton(button);
  const sortFunction = filtersFunctionSortMap[filterType];
  const newPhoto = sortFunction(photosFromServer);
  deleteLastPhotos();
  renderPhotoList(newPhoto);
};

const debounceRenderSortingPhoto = debounce((button) => renderSortingPhoto (button), RERENDER_DELAY);

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
    debounceRenderSortingPhoto(isFilterButton);
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
});

document.addEventListener('click', onGlobalClick);
document.addEventListener('keydown', onGlobalKeyDown);
