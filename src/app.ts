import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routers/users';
import cardRouter from './routers/cards';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';
import { createUser, login } from './controllers/user';
import {
  userLoginSchema,
  userSchema,
  validateRequest,
} from './middlewares/validators';
import { auth } from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

const { port, databaseUrl } = config;

mongoose.connect(databaseUrl);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.post(
  '/signin',
  validateRequest(
    userLoginSchema,
    'Данные почты/пароля не соответствуют формату'
  ),
  login
);
app.post(
  '/signup',
  validateRequest(
    userSchema,
    'Переданы некорректные данные при создании пользователя.'
  ),
  createUser
);

app.use('/', auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use(errorHandler);
app.listen(port);
