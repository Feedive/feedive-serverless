import { Feed } from 'feed';
import { type Handler } from '../../../wrap-http';
import retrieveBilibiliListAndSummary from '../../../api-persistence/retrieve-bilibili-list-and-summary';
import retrieveBilibiliItem from '../../../api-persistence/retrieve-bilibili-item';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const { summary: feedOptions, list } = await retrieveBilibiliListAndSummary(
    id,
  );
  const feed = new Feed(feedOptions);
  for (const item of await Promise.all(list.map(retrieveBilibiliItem))) {
    feed.addItem(item);
  }
  return {
    headers: {
      ['Content-Type']: 'text/xml; charset=utf-8',
    },
    body: feed.rss2(),
  };
};

export { handler as default };