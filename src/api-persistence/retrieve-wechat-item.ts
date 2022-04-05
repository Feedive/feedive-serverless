import { load } from 'cheerio';
import { type Item } from 'feed';
import instance from './instance';

const handler = async (item: Item): Promise<Item> => {
  try {
    const response = await instance.get<string>(item.link, {
      headers: {
        Referer: 'https://mp.weixin.qq.com',
      },
    });
    const $ = load(response.data);
    for (const img of $('img')) {
      if (!$(img).attr('src')) {
        $(img).attr('src', $(img).attr('data-src'));
      }
    }
    const title =
      $('meta[property="og:title"]').attr('content')?.trim() ||
      $('meta[property="twitter:title"]').attr('content')?.trim();
    const description = $('#js_content').html()?.trim();
    return {
      ...item,
      title: title || '',
      description: description || '',
    };
  } catch {
    throw new Error(`Cannot Retrieve Wechat Item`);
  }
};

export { handler as default };
