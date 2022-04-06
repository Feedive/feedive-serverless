import getAtomWeibo from '../../../../src/route-service/atom/weibo/get';

jest.setTimeout(20000);

test('get atom weibo 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/weibo'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomWeibo(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get atom weibo 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/weibo?id=1678105910'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get atom weibo 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/weibo?id=1736988591'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get atom weibo 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/weibo?id=2803301701'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomWeibo(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
