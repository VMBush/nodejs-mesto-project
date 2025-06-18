import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import {
  BadRequestError,
  MestoDefaultError,
  NotFoundError,
} from '../types/errors';

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  User.find({})
    .then((users) => {
      if (!users) {
        throw new MestoDefaultError();
      }
      res.status(200).send(users);
    })
    .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw new BadRequestError(
          'Переданы некорректные данные при создании пользователя.',
        );
      }
      res.status(201).send(user);
    })
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};
