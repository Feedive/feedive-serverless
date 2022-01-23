import { Server } from './wrap-http';

const app = new Server();
app.route('ALL', '/', async () => {
  return { body: 'Hello, World!' };
});

export default app;
