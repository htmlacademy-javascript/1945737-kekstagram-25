import {showError} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .catch(() => {
      showError('Ошибка загрузки данных. Попробуйте позже');
    })
    .then((cardPhoto) => {
      onSuccess(cardPhoto);
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showError('Ошибка загрузки данных. Попробуйте позже');
      }
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    });
};

export {getData, sendData};
