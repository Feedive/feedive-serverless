import getJsonBilibili from '../../../../src/route-service/json/bilibili/get';

jest.setTimeout(20000);

test('get json bilibili 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/bilibili'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonBilibili(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get json bilibili 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/bilibili?id=208259'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json bilibili 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/bilibili?id=401742377'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});

test('get json bilibili 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/json/bilibili?id=703007996'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getJsonBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^\{(.|\n)*\}$/i),
  });
});
