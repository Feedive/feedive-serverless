import getAtomBilibili from '../../../../src/route-service/atom/bilibili/get';

jest.setTimeout(20000);

test('get atom bilibili 0', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/bilibili'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomBilibili(req)).resolves.toMatchObject({
    code: 400,
  });
});

test('get atom bilibili 1', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/bilibili?id=208259'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get atom bilibili 2', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/bilibili?id=401742377'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});

test('get atom bilibili 3', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/atom/bilibili?id=703007996'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(getAtomBilibili(req)).resolves.toMatchObject({
    body: expect.stringMatching(/^<\?xml version="1.0" encoding="utf-8"\?>/i),
  });
});
