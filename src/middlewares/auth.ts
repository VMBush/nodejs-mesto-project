import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UnauthorizedError } from '../types/errors';
import { TRequestUser } from '../types/requestUser';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, config.secretKey);
    req.user = payload as TRequestUser;
  } catch {
    throw new UnauthorizedError('Необходима авторизация');
  }
  next();
};
