import {showError} from './util.js';
const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showError('Ошибка загрузки данных. Попробуйте позже');
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showError('Ошибка загрузки данных. Попробуйте позже');
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
