import getRssJavaScriptWeekly from '../../../../src/route-service/rss/javascript-weekly/get';

test('get rss javascript weekly', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/rss/javascript-weekly'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getRssJavaScriptWeekly(req)).resolves.toMatchObject({
    code: 301,
    headers: {
      Location: expect.any(String),
    },
  });
});
