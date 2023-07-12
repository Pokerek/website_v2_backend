import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import HttpError from '../errors/http-error';

const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const { details } = error;
      const concatMessage = details
        .map(({ message }) => message)
        .join(',')
        .replaceAll('"', '');
      next(new HttpError(422, concatMessage));
    }

    req.body = value;
    next();
  };
};

export default validationMiddleware;