import { model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
      validate: {
        validator(v: string) {
          return validator.isEmail(v);
        },
        message: 'Некорректный e-mail адрес',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      select: false,
    },
  },
  { versionKey: false, strict: true }
);

export default model<IUser>('user', userSchema);
