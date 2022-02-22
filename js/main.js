function getRandomInteger(min,max) {
  min = Math.abs(min);
  max = Math.abs(max);
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);}
getRandomInteger(5,2);


function maxLenghtString (string,maxLenght) {
  return string.length <= maxLenght;
}
maxLenghtString('Привет',10);
