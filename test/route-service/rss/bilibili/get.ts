import getRssBilibili from '../../../../src/route-service/rss/bilibili/get';

jest.setTimeout(20000);

test('get rss bilibili 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/bilibili'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssBilibili(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get rss bilibili 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/bilibili?id=208259'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss bilibili 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/bilibili?id=401742377'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get rss bilibili 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/bilibili?id=703007996'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
