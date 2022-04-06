import retrieveWeiboSummary from '../../src/api-persistence/retrieve-weibo-summary';

jest.setTimeout(20000);

test('retrieve weibo summary 0', async () => {
  await expect(retrieveWeiboSummary('')).rejects.toThrowError(
    `Cannot Retrieve Weibo Summary`,
  );
});

test('retrieve weibo summary 1', async () => {
  await expect(retrieveWeiboSummary('1678105910')).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    listParams: expect.any(String),
  });
});

test('retrieve weibo summary 2', async () => {
  await expect(retrieveWeiboSummary('1736988591')).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    listParams: expect.any(String),
  });
});

test('retrieve weibo summary 3', async () => {
  await expect(retrieveWeiboSummary('2803301701')).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    listParams: expect.any(String),
  });
});
