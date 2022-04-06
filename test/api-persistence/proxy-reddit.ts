import proxyReddit from '../../src/api-persistence/proxy-reddit';

jest.setTimeout(20000);

test('proxy reddit', async () => {
  await expect(proxyReddit('programming')).resolves.toMatchObject({
    code: expect.any(Number),
    message: expect.any(String),
    headers: expect.any(Object),
    body: expect.any(String),
  });
});

test('proxy reddit without id', async () => {
  await expect(proxyReddit('')).rejects.toThrowError(`Cannot Proxy Reddit`);
});
