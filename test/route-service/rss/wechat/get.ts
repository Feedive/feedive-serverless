import getRssWechat from '../../../../src/route-service/rss/wechat/get';

jest.setTimeout(20000);

test('get rss wechat 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/wechat'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWechat(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get rss wechat 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/rss/wechat?id=611ce7048fae751e2363fc8b'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss wechat 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/rss/wechat?id=612c4f8c2b6da10dfaec76e9'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss wechat 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/rss/wechat?id=6131e1441269c358aa0e2141'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
