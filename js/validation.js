const form = document.querySelector('.img-upload__form');
//const textHashtags = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error-text',
});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    //console.log('not ok');
  }
  /*for (let i = 0; i >= 5; i++) {
    textHashtags[i] = textHashtags.value;
    console.log(textHashtags);


}*/
});
