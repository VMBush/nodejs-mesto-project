import { Status } from './responseCodes';

export class MestoDefaultError extends Error {
  statusCode: number;

  constructor(
    message: string = 'На сервере произошла ошибка.',
    code: number = Status.INTERNAL_ERROR,
  ) {
    super(message);
    this.statusCode = code;
  }
}

export class BadRequestError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.BAD_REQUEST);
  }
}

export class UnauthorizedError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.UNAUTHORIZED);
  }
}

export class ForbiddenError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.FORBIDDEN);
  }
}

export class NotFoundError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.NOT_FOUND);
  }
}

export class ConflictError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.CONFLICT);
  }
}

export class InternalServerError extends MestoDefaultError {
  constructor(message: string) {
    super(message, Status.INTERNAL_ERROR);
  }
}
