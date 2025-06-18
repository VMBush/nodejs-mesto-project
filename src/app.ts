import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/users';
import cardRouter from './routers/cards';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';

const { port, databaseUrl } = config;

mongoose.connect(databaseUrl);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6851aa3568aa400b0783594c', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorHandler);
app.listen(port);
