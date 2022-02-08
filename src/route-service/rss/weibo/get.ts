import { Feed } from 'feed';
import { type Handler } from '../../../wrap-http';
import retrieveWeiboSummary from '../../../api-persistence/retrieve-weibo-summary';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const { itemsParams, ...feedOptions } = await retrieveWeiboSummary(id);
  console.log(itemsParams);
  const feed = new Feed(feedOptions);
  return {
    headers: {
      ['Content-Type']: 'text/xml; charset=utf-8',
    },
    body: feed.rss2(),
  };
};

export { handler as default };
