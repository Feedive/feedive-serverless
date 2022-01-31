import { Feed } from 'feed';
import { type Handler } from '../../../wrap-http';
import retrieveWechatItem from '../../../api-persistence/retrieve-wechat-item';
import retrieveWechatList from '../../../api-persistence/retrieve-wechat-list';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const { items, ...feedOptions } = await retrieveWechatList(id);
  const feed = new Feed(feedOptions);
  for (const item of await Promise.all(items.map(retrieveWechatItem))) {
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
