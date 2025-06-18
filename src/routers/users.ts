import { Router } from 'express';
import {
  userAvatarSchema,
  userPatchSchema,
  userSchema,
  validateParamObjectId,
  validateRequest,
} from '../middlewares/validators';
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
} from '../controllers/user';

const router = Router();

router.get('/users', getUsers);
router.get(
  '/users/:userId',
  validateParamObjectId('userId', 'Передан некорректный _id пользователя.'),
  getUserById,
);
router.post(
  '/users',
  validateRequest(
    userSchema,
    'Переданы некорректные данные при создании пользователя.',
  ),
  createUser,
);

router.patch(
  '/users/me',
  validateRequest(
    userPatchSchema,
    'Переданы некорректные данные при обновлении профиля.',
  ),
  updateUser,
);
router.patch(
  '/users/me/avatar',
  validateRequest(
    userAvatarSchema,
    ' Переданы некорректные данные при обновлении аватара.',
  ),
  updateUserAvatar,
);

export default router;
