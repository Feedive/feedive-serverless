import axios from 'axios';
import { Agent } from 'http';
import Server from '../../src/wrap-http/server';

const instance = axios.create({
  httpAgent: new Agent({ keepAlive: false }),
});

test('server listen and close', async () => {
  const server = new Server({ secure: false, version: 1 });
  server.listen(10020);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await instance.get('http://localhost:10020/');
    await expect(response.status).toBe(404);
  } catch ({ response }) {
    await expect(response.status).toBe(404);
  }
  await server.close();
  try {
    const response = await instance.get('http://localhost:10020/');
    await expect(response).toBeFalsy();
  } catch (e) {
    await expect(e).toBeTruthy();
  }
});

test('server callback', async () => {
  const server = new Server();
  await expect(server.callback()).toBeInstanceOf(Function);
});

test('server cors', async () => {
  const server = new Server();
  server.listen(10021);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await instance.get('http://localhost:10021/', {
      headers: {
        origin: 'http://localhost:10021',
      },
    });
    await expect(
      response.headers['access-control-allow-credentials'],
    ).toBeUndefined();
  } catch ({ response }) {
    await expect(
      response.headers['access-control-allow-credentials'],
    ).toBeUndefined();
  }
  server.cors();
  try {
    const response = await instance.get('http://localhost:10021/', {
      headers: {
        origin: 'http://localhost:10021',
      },
    });
    await expect(response.headers['access-control-allow-credentials']).toBe(
      'true',
    );
  } catch ({ response }) {
    await expect(response.headers['access-control-allow-credentials']).toBe(
      'true',
    );
  }
  server.cors(false);
  try {
    const response = await instance.get('http://localhost:10021/', {
      headers: {
        origin: 'http://localhost:10021',
      },
    });
    console.log(response.headers);
    await expect(
      response.headers['access-control-allow-credentials'],
    ).toBeUndefined();
  } catch ({ response }) {
    await expect(
      response.headers['access-control-allow-credentials'],
    ).toBeUndefined();
  }
  server.cors({
    allowHeaders: '*',
    allowMethods: '*',
  });
  try {
    const response = await instance.get('http://localhost:10021/', {
      headers: {
        origin: 'http://localhost:10021',
      },
    });
    await expect(response.headers['access-control-allow-credentials']).toBe(
      'true',
    );
  } catch ({ response }) {
    await expect(response.headers['access-control-allow-credentials']).toBe(
      'true',
    );
  }
  await server.close();
});

test('server route', async () => {
  const server = new Server();
  server.listen(10022);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await instance.get('http://localhost:10022/');
    await expect(response.status).toBe(404);
  } catch ({ response }) {
    await expect(response.status).toBe(404);
  }
  server.route('GET', '/throw/error', () => {
    throw new Error('test');
  });
  try {
    const response = await instance.get('http://localhost:10022/throw/error');
    await expect(response.status).toBe(500);
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(500);
    await expect(response.data).toBe('test');
  }
  server.route('GET', '/throw/message', () => {
    throw 'test';
  });
  try {
    const response = await instance.get('http://localhost:10022/throw/message');
    await expect(response.status).toBe(500);
    await expect(response.data).toBe('');
  } catch ({ response }) {
    await expect(response.status).toBe(500);
    await expect(response.data).toBe('');
  }
  server.route('ALL', '/');
  try {
    const response = await instance.get('http://localhost:10022/');
    await expect(response.status).toBe(204);
  } catch ({ response }) {
    await expect(response.status).toBe(204);
  }
  await server.close();
});
