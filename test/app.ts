import app from '../src/app';
import { Server } from '../src/wrap-http';

test('app is an instance of server', () => {
  expect(app).toBeInstanceOf(Server);
});
