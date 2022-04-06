import retrieveWeiboItem from '../../src/api-persistence/retrieve-weibo-item';
import retrieveWeiboList from '../../src/api-persistence/retrieve-weibo-list';
import retrieveWeiboSummary from '../../src/api-persistence/retrieve-weibo-summary';

jest.setTimeout(20000);

test('retrieve weibo item 0', async () => {
  const item = {
    title: '',
    link: '',
    date: new Date(),
    description: '',
  };
  await expect(retrieveWeiboItem(item)).rejects.toThrowError(
    `Cannot Retrieve Weibo Item`,
  );
});

test('retrieve weibo item 1', async () => {
  const id = '1678105910';
  const { listParams } = await retrieveWeiboSummary(id);
  const list = await retrieveWeiboList(id, listParams);
  await Promise.all(
    list.map((item) =>
      expect(retrieveWeiboItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve weibo item 2', async () => {
  const id = '1736988591';
  const { listParams } = await retrieveWeiboSummary(id);
  const list = await retrieveWeiboList(id, listParams);
  await Promise.all(
    list.map((item) =>
      expect(retrieveWeiboItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});

test('retrieve weibo item 3', async () => {
  const id = '2803301701';
  const { listParams } = await retrieveWeiboSummary(id);
  const list = await retrieveWeiboList(id, listParams);
  await Promise.all(
    list.map((item) =>
      expect(retrieveWeiboItem(item)).resolves.toMatchObject({
        title: expect.any(String),
        link: expect.any(String),
        date: expect.any(Date),
        description: expect.any(String),
      }),
    ),
  );
});
