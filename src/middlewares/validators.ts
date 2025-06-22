import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Types } from 'mongoose';
import { BadRequestError } from '../types/errors';

const avatarRegex =
  /^https?:\/\/(?:www\.)??([a-zA-Z0-9-]+\.)+(com|net|org|ru|io|info|biz|gov|edu|co|me)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*#?$/;
export const userSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  about: z.string().min(2).max(200).optional(),
  avatar: z.string().regex(avatarRegex).optional(),
  email: z.string().email().max(100),
  password: z.string().min(1).max(100),
});

export const userLoginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(1).max(100),
});

export const userPatchSchema = z.object({
  name: z.string().min(2).max(30),
  about: z.string().min(2).max(200),
});

export const userAvatarSchema = z.object({
  avatar: z.string().regex(avatarRegex),
});

export const cardSchema = z.object({
  name: z.string().min(2).max(30),
  link: z.string().url(),
});

export const validateRequest =
  (schema: z.ZodSchema, errorMessage: string = 'Ошибка') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = new BadRequestError(errorMessage);
      next(err);
    }

    next();
  };

export const validateParamObjectId =
  (paramName: string, errorMessage: string = 'Ошибка') =>
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    if (!Types.ObjectId.isValid(id)) {
      next(new BadRequestError(errorMessage));
    }
    next();
  };
