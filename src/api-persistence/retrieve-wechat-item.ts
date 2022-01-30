import instance from './instance';

const handler = async (url: string): Promise<string> => {
  try {
    const response = await instance.get<string>(url, {
      headers: {
        Referer: 'https://mp.weixin.qq.com',
      },
    });
    return response.data;
  } catch {
    throw new Error(`Cannot Retrieve Wechat Item`);
  }
};

export { handler as default };
