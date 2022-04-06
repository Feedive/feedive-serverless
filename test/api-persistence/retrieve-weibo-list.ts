import retrieveWeiboList from '../../src/api-persistence/retrieve-weibo-list';
import retrieveWeiboSummary from '../../src/api-persistence/retrieve-weibo-summary';

jest.setTimeout(20000);

test('retrieve weibo list 0', async () => {
  await expect(retrieveWeiboList('', '')).rejects.toThrowError(
    `Cannot Retrieve Weibo List`,
  );
});

test('retrieve weibo list 1', async () => {
  const id = '1678105910';
  const { listParams } = await retrieveWeiboSummary(id);
  await expect(retrieveWeiboList(id, listParams)).resolves.toBeInstanceOf(
    Array,
  );
});

test('retrieve weibo list 2', async () => {
  const id = '1736988591';
  const { listParams } = await retrieveWeiboSummary(id);
  await expect(retrieveWeiboList(id, listParams)).resolves.toBeInstanceOf(
    Array,
  );
});

test('retrieve weibo list 3', async () => {
  const id = '2803301701';
  const { listParams } = await retrieveWeiboSummary(id);
  await expect(retrieveWeiboList(id, listParams)).resolves.toBeInstanceOf(
    Array,
  );
});
