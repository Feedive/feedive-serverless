import retrieveBilibiliItem from '../../src/api-persistence/retrieve-bilibili-item';
import retrieveBilibiliListAndSummary from '../../src/api-persistence/retrieve-bilibili-list-and-summary';

jest.setTimeout(20000);

test('retrieve bilibili item 0', async () => {
  const item = {
    title: '',
    link: '',
    date: new Date(),
    description: '',
  };
  const itemParams = {
    uid: 0,
    uname: '',
    text: '',
    emojiGroup: [],
    origin: item,
  };
  await expect(retrieveBilibiliItem(item, itemParams)).rejects.toThrowError(
    `Cannot Retrieve Bilibili Item`,
  );
});

test('retrieve bilibili item 1', async () => {
  const { list } = await retrieveBilibiliListAndSummary('208259');
  await Promise.all(
    list.map(({ item, itemParams }) =>
      expect(retrieveBilibiliItem(item, itemParams)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve bilibili item 2', async () => {
  const { list } = await retrieveBilibiliListAndSummary('401742377');
  await Promise.all(
    list.map(({ item, itemParams }) =>
      expect(retrieveBilibiliItem(item, itemParams)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve bilibili item 3', async () => {
  const { list } = await retrieveBilibiliListAndSummary('703007996');
  await Promise.all(
    list.map(({ item, itemParams }) =>
      expect(retrieveBilibiliItem(item, itemParams)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});
