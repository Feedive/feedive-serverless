import axios from 'axios';
import { createServer, Agent } from 'http';
import qs from 'qs';
import Request from '../../src/wrap-http/request';

const instance = axios.create({
  httpAgent: new Agent({ keepAlive: false }),
});

test('request get handler request', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    try {
      await expect(request.getRequest()).toMatchObject({
        getMethod: expect.any(Function),
        getUrl: expect.any(Function),
        getHeaders: expect.any(Function),
        getBody: expect.any(Function),
      });
    } catch {
      console.error('failed');
    }
    await res.end();
  });
  server.listen(10000);
  try {
    await instance.get('http://localhost:10000/');
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get method', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const method = request.getMethod();
    try {
      await expect(method).toBe('OPTIONS');
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10001);
  try {
    await instance.options('http://localhost:10001/');
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get url', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const url = request.getUrl();
    try {
      await expect(url.protocol).toBe('http:');
      await expect(url.hostname).toBe('localhost');
      await expect(url.port).toBe('10002');
      await expect(url.pathname).toBe('/test');
      await expect(url.search).toBe('?param=test');
      await expect(url.hash).toBe('');
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10002);
  try {
    await instance.get('http://localhost:10002/test?param=test');
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get headers', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const headers = request.getHeaders();
    try {
      await expect(headers['content-type']).toBe('application/json');
    } catch {
      console.error('failed');
    }
    res.end('');
  });
  server.listen(10003);
  try {
    await instance.post('http://localhost:10003/', []);
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get body form', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const body = await request.getBody();
    try {
      await expect(body).toEqual({ test: ['form'] });
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10004);
  try {
    await instance.post(
      'http://localhost:10004/',
      qs.stringify({ test: ['form'] }),
    );
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get body json', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const body = await request.getBody();
    try {
      await expect(body).toEqual({ test: 'json' });
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10005);
  try {
    await instance.post('http://localhost:10005/', { test: 'json' });
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get body text', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const body = await request.getBody();
    try {
      await expect(body).toEqual('text');
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10006);
  try {
    await instance.post('http://localhost:10006/', 'text', {
      headers: { 'content-type': 'text/plain' },
    });
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});

test('request get body xml', async () => {
  const server = createServer(async (req, res) => {
    const request = new Request(req);
    const body = await request.getBody();
    try {
      await expect(body).toEqual('<?xml version="1.0" encoding="utf-8"?>');
    } catch {
      console.error('failed');
    }
    res.end();
  });
  server.listen(10007);
  try {
    await instance.post(
      'http://localhost:10007/',
      '<?xml version="1.0" encoding="utf-8"?>',
      {
        headers: { 'content-type': 'text/xml' },
      },
    );
  } catch {
    console.error('failed');
  }
  await new Promise((resolve) => server.close(resolve));
});
