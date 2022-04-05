import app from '../src/app';
import { Server } from '../src/wrap-http';

test('app is an instance of Server', () => {
  expect(app).toBeInstanceOf(Server);
});
