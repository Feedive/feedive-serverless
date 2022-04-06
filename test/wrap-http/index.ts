import { Server, createServer } from '../../src/wrap-http/index';

test('create server with constructor', async () => {
  await expect(new Server()).toBeInstanceOf(Server);
});

test('create server with function', async () => {
  await expect(createServer()).toBeInstanceOf(Server);
});
