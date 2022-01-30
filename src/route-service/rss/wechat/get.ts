import { type Handler } from '../../../wrap-http';
import retrieveWechatItem from '../../../api-persistence/retrieve-wechat-item';
import retrieveWechatList from '../../../api-persistence/retrieve-wechat-list';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const wechatList = await retrieveWechatList(id);
  const wechatItems = await Promise.all(
    wechatList.items.map(async (item) => {
      try {
        const description = await retrieveWechatItem(item.link);
        return {
          ...item,
          description,
        };
      } catch {
        return item;
      }
    }),
  );
  return {
    body: {
      ...wechatList,
      items: wechatItems,
    },
  };
};

export { handler as default };
