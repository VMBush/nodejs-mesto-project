export class MestoDefaultError extends Error {
  statusCode: number;

  constructor(message: string = 'Ошибка по умолчанию.', code: number = 500) {
    super(message);
    this.statusCode = code;
  }
}

export class BadRequestError extends MestoDefaultError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends MestoDefaultError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends MestoDefaultError {
  constructor(message: string) {
    super(message, 500);
  }
}
