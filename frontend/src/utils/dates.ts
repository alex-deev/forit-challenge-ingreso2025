/** Devuelve el tiempo en formato HH:MM:SS */
export function getTime(date: Date) {
  const hours =   formatDigit(date.getHours()); // 0-23
  const minutes = formatDigit(date.getMinutes()); // 0-59
  const seconds = formatDigit(date.getSeconds()); // 0-59

  return (`${hours}:${minutes}:${seconds}`);
}

/** Devuelve la fecha en formato dd-mm-yyyy */
export function getDate(date: Date) {
  const day =     formatDigit(date.getDate());
  const month =   formatDigit(date.getMonth());
  const year =    formatDigit(date.getFullYear());
  return (`${day}-${month}-${year}`);
}

/** Devuelve la fecha y tiempo en formato 'dd-mm-yyyy HH:MM:SS'*/
export function getDnT(date: Date) {
  return (`${getDate(date)} ${getTime(date)}`);
}

function formatDigit(digit: number) {
  if (digit > 9) 
    return digit;
  else
    return `0${digit}`;
}