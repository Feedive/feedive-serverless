import { Feed } from 'feed';
import { type Handler } from '../../../wrap-http';
import retrieveWeiboItem from '../../../api-persistence/retrieve-weibo-item';
import retrieveWeiboList from '../../../api-persistence/retrieve-weibo-list';
import retrieveWeiboSummary from '../../../api-persistence/retrieve-weibo-summary';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const { summary: feedOptions, listParams } = await retrieveWeiboSummary(id);
  const list = await retrieveWeiboList(listParams, id);
  const feed = new Feed(feedOptions);
  for (const item of await Promise.all(
    list.slice(0, 5).map(retrieveWeiboItem),
  )) {
    feed.addItem(item);
  }
  return {
    headers: {
      ['Content-Type']: 'text/xml; charset=utf-8',
    },
    body: feed.atom1(),
  };
};

export { handler as default };
