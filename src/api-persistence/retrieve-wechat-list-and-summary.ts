import { type FeedOptions, type Item } from 'feed';
import instance from './instance';

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

const handler = async (
  id: string,
): Promise<{ summary: FeedOptions; list: Item[] }> => {
  try {
    const url = `https://api.feeddd.org/feeds/${id}/json`;
    const response = await instance.get<Data>(url);
    return {
      summary: {
        id: 'wechat-' + id,
        title: response.data.title,
        generator: 'https://github.com/Feedive/feedive-serverless',
        link: response.data.home_page_url,
        description: '微信公众号：' + response.data.title,
        copyright: `Copyright © ${new Date().getFullYear()} Tencent`,
      },
      list: response.data.items.slice(0, 5).map((item) => ({
        title: item.title,
        link: item.url,
        date: new Date(item.date_modified),
      })),
    };
  } catch {
    throw new Error(`Cannot Retrieve Wechat List & Summary`);
  }
};

export { handler as default };
