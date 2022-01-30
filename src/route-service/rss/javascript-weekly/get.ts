import { type Handler } from '../../../wrap-http';

const handler: Handler = async () => {
  return {
    code: 301,
    headers: {
      Location: 'https://javascriptweekly.com/rss',
    },
  };
};

export { handler as default };
