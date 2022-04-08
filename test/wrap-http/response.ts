import axios from 'axios';
import { createServer, Agent } from 'http';
import { Readable } from 'stream';
import Response from '../../src/wrap-http/response';

const instance = axios.create({
  httpAgent: new Agent({ keepAlive: false }),
});

test('response set handler response', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setResponse({
      code: 404,
      message: 'Not Found',
      headers: { 'content-type': 'text/plain' },
      body: 'test',
    });
    await res.end();
  });
  server.listen(10010);
  try {
    const response = await instance.get('http://localhost:10010/');
    await expect(response.status).toBe(404);
    await expect(response.statusText).toBe('Not Found');
    await expect(response.headers['content-type']).toBe('text/plain');
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(404);
    await expect(response.statusText).toBe('Not Found');
    await expect(response.headers['content-type']).toBe('text/plain');
    await expect(response.data).toBe('test');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set code', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setCode(418);
    await res.end();
  });
  server.listen(10011);
  try {
    const response = await instance.get('http://localhost:10011/');
    await expect(response.status).toBe(418);
  } catch ({ response }) {
    await expect(response.status).toBe(418);
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set headers', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setHeaders({ 'content-type': 'text/plain' });
    await res.end();
  });
  server.listen(10012);
  try {
    const response = await instance.get('http://localhost:10012/');
    await expect(response.headers['content-type']).toBe('text/plain');
  } catch ({ response }) {
    await expect(response.headers['content-type']).toBe('text/plain');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set message', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setMessage("I'm a teapot");
    await res.end();
  });
  server.listen(10013);
  try {
    const response = await instance.get('http://localhost:10013/');
    await expect(response.statusText).toBe("I'm a teapot");
  } catch ({ response }) {
    await expect(response.statusText).toBe("I'm a teapot");
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body null', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody(null);
  });
  server.listen(10014);
  try {
    const response = await instance.get('http://localhost:10014/');
    await expect(response.status).toBe(204);
    await expect(response.data).toBe('');
  } catch ({ response }) {
    await expect(response.status).toBe(204);
    await expect(response.data).toBe('');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body string', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody('test');
  });
  server.listen(10015);
  try {
    const response = await instance.get('http://localhost:10015/');
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'text/plain; charset=utf-8',
    );
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'text/plain; charset=utf-8',
    );
    await expect(response.data).toBe('test');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body error', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody(new Error('test'));
  });
  server.listen(10016);
  try {
    const response = await instance.get('http://localhost:10016/');
    await expect(response.status).toBe(500);
    await expect(response.headers['content-type']).toBe(
      'text/plain; charset=utf-8',
    );
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(500);
    await expect(response.headers['content-type']).toBe(
      'text/plain; charset=utf-8',
    );
    await expect(response.data).toBe('test');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body buffer', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody(Buffer.from('test'));
  });
  server.listen(10017);
  try {
    const response = await instance.get('http://localhost:10017/');
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/octet-stream',
    );
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/octet-stream',
    );
    await expect(response.data).toBe('test');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body stream', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody(Readable.from(['test']));
  });
  server.listen(10018);
  try {
    const response = await instance.get('http://localhost:10018/');
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/octet-stream',
    );
    await expect(response.data).toBe('test');
  } catch ({ response }) {
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/octet-stream',
    );
    await expect(response.data).toBe('test');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('response set body json', async () => {
  const server = createServer(async (req, res) => {
    const response = new Response(res);
    response.setBody({ test: 'test' });
  });
  server.listen(10019);
  try {
    const response = await instance.get('http://localhost:10019/');
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8',
    );
    await expect(response.data).toEqual({
      test: 'test',
    });
  } catch ({ response }) {
    await expect(response.status).toBe(200);
    await expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8',
    );
    await expect(response.data).toEqual({
      test: 'test',
    });
  }
  await new Promise((resolve) => server.close(resolve));
});
