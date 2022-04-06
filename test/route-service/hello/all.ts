import allHello from '../../../src/route-service/hello/all';

test('get hello', async () => {
  const req = {
    getMethod: () => 'GET',
    getUrl: () => new URL('http://localhost/hello'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(allHello(req)).resolves.toMatchObject({
    body: 'Hello, World!',
  });
});

test('post hello', async () => {
  const req = {
    getMethod: () => 'POST',
    getUrl: () => new URL('http://localhost/hello'),
    getHeaders: () => ({}),
    getBody: async <Body>() => '' as unknown as Body,
  };
  await expect(allHello(req)).resolves.toMatchObject({
    body: 'Hello, World!',
  });
});
