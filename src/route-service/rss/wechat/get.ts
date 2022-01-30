import { type Handler } from '../../../wrap-http';
import retrieveWechatList from '../../../api-persistence/retrieve-wechat-list';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  const wechatList = await retrieveWechatList(id);
  return { body: wechatList };
};

export { handler as default };
