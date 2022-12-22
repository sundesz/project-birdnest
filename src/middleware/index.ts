import { RequestHandler } from 'express';

export const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).json({ message: `Unknown endpoint ${req.originalUrl}` });
};
