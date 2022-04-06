import { type FeedOptions } from 'feed';
import instance from './instance';

interface User {
  id: number;
  screen_name: string;
  profile_image_url: string;
  profile_url: string;
  statuses_count: number;
  verified: boolean;
  verified_type: number;
  verified_type_ext?: number;
  verified_reason?: string;
  close_blue_v: boolean;
  description: string;
  gender: string;
  mbtype: number;
  urank: number;
  mbrank: number;
  follow_me: boolean;
  following: boolean;
  follow_count: number;
  followers_count: string;
  followers_count_str: string;
  cover_image_phone: string;
  avatar_hd: string;
  like: boolean;
  like_me: boolean;
  toolbar_menus: {
    type: string;
    name: string;
    pic: string;
    params: {
      scheme?: string;
      uid?: number;
      extparams?: {
        followcardid: string;
      };
    };
    scheme?: string;
    userInfo?: {
      id: number;
      idstr: string;
      screen_name: string;
      profile_image_url: string;
      following: boolean;
      verified: boolean;
      verified_type: number;
      remark: string;
      avatar_large: string;
      avatar_hd: string;
      verified_type_ext?: number;
      follow_me: boolean;
      mbtype: number;
      mbrank: number;
      level: number;
      type: number;
      story_read_state: number;
      allow_msg: number;
      friendships_relation: number;
      close_friends_type: number;
      special_follow: boolean;
    };
  }[];
}

interface Data {
  ok: number;
  data: {
    isVideoCoverStyle: number;
    isStarStyle: number;
    userInfo: User;
    fans_scheme: string;
    follow_scheme: string;
    tabsInfo: {
      selectedTab: number;
      tabs: {
        id: number;
        tabKey: string;
        must_show: number;
        hidden: number;
        title: string;
        tab_type: string;
        containerid: string;
        apipath?: string;
        tab_icon?: string;
        tab_icon_dark?: string;
        url?: string;
      }[];
    };
    profile_ext: string;
    scheme: string;
    showAppTips: number;
  };
}

const handler = async (
  id: string,
): Promise<{ summary: FeedOptions; listParams: string }> => {
  try {
    const url =
      'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id;
    const response = await instance.get<Data>(url, {
      headers: {
        'MWeibo-Pwa': 1,
        Referer: 'https://m.weibo.cn/u/' + id,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    return {
      summary: {
        id: 'weibo-' + id,
        title: response.data.data.userInfo.screen_name,
        generator: 'https://github.com/Feedive/feedive-serverless',
        link: 'http://m.weibo.com/' + id,
        description: `微博博主：@${response.data.data.userInfo.screen_name}${
          response.data.data.userInfo.verified_reason
            ? '  认证信息：' + response.data.data.userInfo.verified_reason
            : ''
        }`,
        copyright: `Copyright © ${new Date().getFullYear()} Sina`,
      },
      listParams:
        response.data.data.tabsInfo.tabs.find((tab) => tab.tab_type === 'weibo')
          ?.containerid || '',
    };
  } catch {
    throw new Error(`Cannot Retrieve Weibo Summary`);
  }
};

export { handler as default };
