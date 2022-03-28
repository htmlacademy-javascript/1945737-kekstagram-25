const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const mistakeTextHashtag = 'неверно введен хэштег';
const mistakeTextDescription = 'длина не больше 140 симв';


const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(textHashtags, (value) => {
  const allHashtags = value.split(' ');
  let isValid = true;

  if (allHashtags.length > 5) {
    return false;
  }

  if (value === '') {
    return true;
  }
  const countItems = allHashtags.reduce((acc, item) => {
    acc[item] = acc[item] ? acc[item] + 1 : 1;
    return acc;
  }, {});
  const count = Object.values(countItems);
  const isNotDouble = count.every((number) => number === 1);
  if (!isNotDouble) {
    return false;
  }


  allHashtags.forEach((hashtag) => {
    // eslint-disable-next-line no-empty
    if (/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(hashtag)) {
    } else {
      isValid = false;
    }
  });

  return isValid;
}, mistakeTextHashtag);


pristine.addValidator(textDescription, (value) => {
  if (value.length > 140) {
    return false;
  }
  return true;

}, mistakeTextDescription);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    form.submit();
  }

});

export {textHashtags, textDescription};
