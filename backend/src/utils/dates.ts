/** Devuelve el tiempo actual en formato HH:MM:SS */
export function getNowTime() {
  const now = new Date();
  const hours =   formatDigit(now.getHours()); // 0-23
  const minutes = formatDigit(now.getMinutes()); // 0-59
  const seconds = formatDigit(now.getSeconds()); // 0-59

  return (`${hours}:${minutes}:${seconds}`);
}

/** Devuelve la fecha actual en formato dd-mm-yyyy */
export function getNowDate() {
  const now = new Date();
  const day =     formatDigit(now.getDay());
  const month =   formatDigit(now.getMonth());
  const year =    formatDigit(now.getFullYear());
  return (`${day}-${month}-${year}`);
}

/** Devuelve la fecha y tiempo actual en formato 'dd-mm-yyyy HH:MM:SS'*/
export function getNowDnT() {
  return (`${getNowDate()} ${getNowTime()}`);
}

function formatDigit(digit: number) {
  if (digit > 9) 
    return digit;
  else
    return `0${digit}`;
}