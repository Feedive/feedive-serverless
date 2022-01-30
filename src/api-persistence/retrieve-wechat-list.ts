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

interface Channel {
  title: string;
  description: string;
  link: string;
  items: {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    guid: string;
  }[];
}

const handler = async (id: string): Promise<Channel> => {
  try {
    const url = `https://api.feeddd.org/feeds/${id}/json`;
    const response = await instance.get<Data>(url);
    return {
      title: response.data.title,
      description: '',
      link: response.data.home_page_url,
      items: response.data.items.slice(0, 5).map((item) => ({
        title: item.title,
        description: '',
        link: item.url,
        pubDate: new Date(item.date_modified).toUTCString(),
        guid: item.id,
      })),
    };
  } catch {
    throw new Error(`Cannot Retrieve Wechat List`);
  }
};

export { handler as default };
