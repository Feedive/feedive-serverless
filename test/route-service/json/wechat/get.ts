import getJsonWechat from '../../../../src/route-service/json/wechat/get';

jest.setTimeout(20000);

test('get json wechat 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/wechat'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWechat(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get json wechat 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/json/wechat?id=611ce7048fae751e2363fc8b'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json wechat 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/json/wechat?id=612c4f8c2b6da10dfaec76e9'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json wechat 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () =>
      new URL('http://localhost/json/wechat?id=6131e1441269c358aa0e2141'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonWechat(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});
