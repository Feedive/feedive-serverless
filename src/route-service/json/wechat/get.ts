import { Feed } from 'feed';
import { type Handler } from '../../../wrap-http';
import retrieveWechatItem from '../../../api-persistence/retrieve-wechat-item';
import retrieveWechatListAndSummary from '../../../api-persistence/retrieve-wechat-list-and-summary';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const { summary: feedOptions, list } = await retrieveWechatListAndSummary(id);
  const feed = new Feed(feedOptions);
  for (const item of await Promise.all(list.map(retrieveWechatItem))) {
    feed.addItem(item);
  }
  return {
    headers: {
      ['Content-Type']: 'text/xml; charset=utf-8',
    },
    body: feed.json1(),
  };
};

export { handler as default };
