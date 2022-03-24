import instance from './instance';
import { type HandlerResponse } from '../wrap-http';

interface Data {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  items: {
    id: string;
    url: string;
    title: string;
    summary: string;
    date_modified: string;
  }[];
}

const handler = async (id: string): Promise<HandlerResponse> => {
  try {
    const url = `https://www.reddit.com/r/${id}/.rss`;
    const response = await instance.get<Data>(
      'https://proxy.peaceandlove.top',
      {
        headers: { Url: url },
      },
    );
    return {
      code: response.status,
      message: response.statusText,
      headers: response.headers,
      body: response.data,
    };
  } catch {
    throw new Error(`Cannot Proxy Reddit Programming`);
  }
};

export { handler as default };
