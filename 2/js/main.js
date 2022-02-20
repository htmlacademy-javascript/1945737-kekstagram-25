function getRandomInteger(min,max) {
  min = Math.ceil(min);
  max = Math.trunc(max);
  if (min<0 || max <= min) {
    return false;
  }
  return Math.trunc(Math.random()*(max-min+1)+min);
}
getRandomInteger(0.4,2);


function maxLenghtString (string,maxLenght) {
  return(string.length <= maxLenght);
}
maxLenghtString('Привет',10);
