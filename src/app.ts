import express, { Application, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { API_SERVICE_URL } from './config';
import sseRouter from './routes/sseRoute';
import droneRouter from './routes/droneRoute';
import { unknownEndpoint } from './middleware';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.static('dist'));

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Project birdnest</h1>');
});

app.use('/events', sseRouter);
app.use('/drones', droneRouter);

app.use(
  '/birdnest',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/birdnest`]: '',
    },
  })
);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
