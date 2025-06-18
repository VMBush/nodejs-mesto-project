import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  BadRequestError,
  MestoDefaultError,
  NotFoundError,
} from '../types/errors';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new MestoDefaultError();
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError(
          'Переданы некорректные данные при создании карточки.',
        );
      }
      res.status(201).send(card);
    })
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      const message = { message: 'Пост удалён' };
      res.send(message);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send(card);
    })
    .catch(next);

export const dislikeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send(card);
    })
    .catch(next);
