import getRssReddit from '../../../../src/route-service/atom/reddit/get';

jest.setTimeout(20000);

test('get rss javascript weekly 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/reddit'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssReddit(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get rss javascript weekly 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/reddit?id=programming'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssReddit(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
