import { Router } from 'express';
import {
  cardSchema,
  validateParamObjectId,
  validateRequest,
} from '../middlewares/validators';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
} from '../controllers/card';

const router = Router();

router.get('/cards', getCards);
router.post(
  '/cards',
  validateRequest(
    cardSchema,
    'Переданы некорректные данные при создании карточки.',
  ),
  createCard,
);
router.delete(
  '/cards/:cardId',
  validateParamObjectId('cardId', 'Передан некорректный _id карточки.'),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  validateParamObjectId(
    'cardId',
    'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
  ),
  likeCard,
);

router.delete(
  '/cards/:cardId/likes',
  validateParamObjectId(
    'cardId',
    'Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки.',
  ),
  dislikeCard,
);

export default router;
