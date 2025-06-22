import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';
import {
  BadRequestError,
  ConflictError,
  MestoDefaultError,
  NotFoundError,
  UnauthorizedError,
} from '../types/errors';
import { Status } from '../types/responseCodes';

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  User.find({})
    .then((users) => {
      if (!users) {
        throw new MestoDefaultError();
      }
      res.send(users);
    })
    .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch(next);
};

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash: string) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      if (!user) {
        throw new BadRequestError(
          'Переданы некорректные данные при создании пользователя.'
        );
      }
      res.status(Status.CREATED).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError('Пользователь с данным e-mail уже существует');
      }
      throw err;
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
  next: NextFunction
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

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неудачная попытка авторизации');
      }
      return user;
    })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, config.secretKey, {
          expiresIn: 3600 * 24 * 7,
        });
        res
          .cookie('jwt', token, { maxAge: 3600 * 24 * 7, httpOnly: true })
          .send();
      } else {
        throw new UnauthorizedError('Неудачная попытка авторизации');
      }
    })
    .catch(next);
};
