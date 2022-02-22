import { type Item } from 'feed';

interface Data {
  user: unknown;
}

const handler = async (item: Item): Promise<Item> => {
  try {
    const data: Data = JSON.parse(item.description || '');
    console.log(data);
    return {
      ...item,
    };
  } catch {
    throw new Error(`Cannot Retrieve Bilibili Item`);
  }
};

export { handler as default };
