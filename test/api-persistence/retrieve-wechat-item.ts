import retrieveWechatItem from '../../src/api-persistence/retrieve-wechat-item';
import retrieveWechatListAndSummary from '../../src/api-persistence/retrieve-wechat-list-and-summary';

jest.setTimeout(20000);

test('retrieve wechat item 0', async () => {
  const item = {
    title: '',
    link: '',
    date: new Date(),
    description: '',
  };
  await expect(retrieveWechatItem(item)).rejects.toThrowError(
    `Cannot Retrieve Wechat Item`,
  );
});

test('retrieve wechat item 1', async () => {
  const { list } = await retrieveWechatListAndSummary(
    '611ce7048fae751e2363fc8b',
  );
  await Promise.all(
    list.map((item) =>
      expect(retrieveWechatItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve wechat item 2', async () => {
  const { list } = await retrieveWechatListAndSummary(
    '612c4f8c2b6da10dfaec76e9',
  );
  await Promise.all(
    list.map((item) =>
      expect(retrieveWechatItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve wechat item 3', async () => {
  const { list } = await retrieveWechatListAndSummary(
    '6131e1441269c358aa0e2141',
  );
  await Promise.all(
    list.map((item) =>
      expect(retrieveWechatItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});
