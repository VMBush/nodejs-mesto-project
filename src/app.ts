import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/users';
import cardRouter from './routers/cards';
import { errorHandler } from './middlewares/errorHandler';

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6851aa3568aa400b0783594c', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouter, cardRouter);

app.use(errorHandler);
app.listen(PORT);
