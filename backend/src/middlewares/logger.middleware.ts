import { NextFunction, Request, Response } from 'express';
import { getNowDate, getNowDnT, getNowTime } from '../utils/dates';


// Debe ser el primer middleware
export function InLogger(req: Request, res: Response, next: NextFunction) {
  let { method, originalUrl } = req;
  if (method === 'DELETE') method = 'DEL';
  const msg = `\x1b[33m-> ${method}\x1b[0m\t${originalUrl}\t${getNowDnT()}`;
  console.log(msg);
  next();
}

// Debe ser el útlimo middleware
export function OutLogger(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    const finalStatus = res.statusCode;
    const msg = `\x1b[33m<------\t${finalStatus}\x1b[0m`;
    console.log(msg);
  });
  next();
}

export default InLogger;