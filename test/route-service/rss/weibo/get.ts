import getRssWeibo from '../../../../src/route-service/rss/weibo/get';

jest.setTimeout(20000);

test('get rss weibo 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/weibo'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWeibo(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get rss weibo 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/weibo?id=1678105910'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss weibo 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/weibo?id=1736988591'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss weibo 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/weibo?id=2803301701'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
