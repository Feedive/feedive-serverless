import retrieveBilibiliListAndSummary from '../../src/api-persistence/retrieve-bilibili-list-and-summary';

jest.setTimeout(20000);

test('retrieve bilibili list and summary 0', async () => {
  await expect(retrieveBilibiliListAndSummary('')).rejects.toThrowError(
    `Cannot Retrieve Bilibili List & Summary`,
  );
});

test('retrieve bilibili list and summary 1', async () => {
  await expect(retrieveBilibiliListAndSummary('208259')).resolves.toMatchObject(
    {
      summary: {
        id: expect.any(String),
        title: expect.any(String),
        generator: expect.any(String),
        link: expect.any(String),
        description: expect.any(String),
        copyright: expect.any(String),
      },
      list: expect.any(Array),
    },
  );
});

test('retrieve bilibili list and summary 2', async () => {
  await expect(
    retrieveBilibiliListAndSummary('401742377'),
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

test('retrieve bilibili list and summary 3', async () => {
  await expect(
    retrieveBilibiliListAndSummary('703007996'),
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
