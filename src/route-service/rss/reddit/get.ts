import proxyReddit from '../../../api-persistence/proxy-reddit';
import { type Handler } from '../../../wrap-http';

const handler: Handler = async (req) => {
  const url = req.getUrl();
  const id = url.searchParams.get('id');
  if (id === null) return { code: 400 };
  return proxyReddit(id);
};

export { handler as default };
