import retrieveWechatiListAndSummary from '../../src/api-persistence/retrieve-wechat-list-and-summary';

jest.setTimeout(20000);

test('retrieve wechat list and summary 0', async () => {
  await expect(retrieveWechatiListAndSummary('')).rejects.toThrowError(
    `Cannot Retrieve Wechat List & Summary`,
  );
});

test('retrieve wechat list and summary 1', async () => {
  await expect(
    retrieveWechatiListAndSummary('611ce7048fae751e2363fc8b'),
  ).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    list: expect.any(Array),
  });
});

test('retrieve wechat list and summary 2', async () => {
  await expect(
    retrieveWechatiListAndSummary('612c4f8c2b6da10dfaec76e9'),
  ).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    list: expect.any(Array),
  });
});

test('retrieve wechat list and summary 3', async () => {
  await expect(
    retrieveWechatiListAndSummary('6131e1441269c358aa0e2141'),
  ).resolves.toMatchObject({
    summary: {
      id: expect.any(String),
      title: expect.any(String),
      generator: expect.any(String),
      link: expect.any(String),
      description: expect.any(String),
      copyright: expect.any(String),
    },
    list: expect.any(Array),
  });
});
