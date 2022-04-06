import getJsonWeibo from '../../../../src/route-service/json/weibo/get';

jest.setTimeout(20000);

test('get json weibo 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/weibo'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWeibo(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get json weibo 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/weibo?id=1678105910'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json weibo 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/weibo?id=1736988591'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json weibo 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/weibo?id=2803301701'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});
