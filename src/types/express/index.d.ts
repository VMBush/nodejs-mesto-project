/* eslint-disable no-unused-vars */
import * as express from 'express';
import { TRequestUser } from '../requestUser';

declare global {
  namespace Express {
    interface Request {
      user: TRequestUser;
    }
  }
}
