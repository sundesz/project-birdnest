import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.log(error);
  switch (error.name) {
    default:
      return res.status(400).json({ message: error.message as string });
  }

  next(error);
};
