import cheerio from 'cheerio';
import { type Item } from 'feed';
import instance from './instance';

const handler = async (item: Item): Promise<Item> => {
  try {
    const response = await instance.get<string>(item.link, {
      headers: {
        Referer: 'https://mp.weixin.qq.com',
      },
    });
    const $ = cheerio.load(response.data);
    for (const img of $('img')) {
      if (!$(img).attr('src')) {
        $(img).attr('src', $(img).attr('data-src'));
      }
    }
    const description = $('#js_content').html()?.trim();
    return {
      ...item,
      description: description || '',
    };
  } catch {
    return item;
  }
};

export { handler as default };
