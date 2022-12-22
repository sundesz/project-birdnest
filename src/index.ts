import { createServer } from 'http';
import app from './app';
import { PORT } from './config';

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
