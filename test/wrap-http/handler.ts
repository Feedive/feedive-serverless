import defaultHandler from '../../src/wrap-http/handler';

test('default handler', async () => {
  const req = {
    getMethod: jest.fn(),
    getUrl: jest.fn(),
    getHeaders: jest.fn(),
    getBody: jest.fn(),
  };
  await expect(defaultHandler(req)).toEqual({
    code: 404,
  });
});
