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
  badge?: Record<string, number>;
}

interface Status {
  visible: {
    type: number;
    list_id: number;
  };
  created_at: string;
  id: string;
  mid: string;
  edit_count?: number;
  can_edit: boolean;
  edit_at?: string;
  version?: number;
  show_additional_indication: number;
  text: string;
  textLength?: number;
  source: string;
  favorited: boolean;
  pic_ids: string[];
  pic_types: string;
  pic_focus_point?: {
    focus_point: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    pic_id: string;
  }[];
  falls_pic_focus_point?: {
    focus_point: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    pic_id: string;
  }[];
  pic_rectangle_object?: {
    rectangle_objects: {
      left: number;
      top: number;
      width: number;
      height: number;
      type: number;
    };
    pic_id: string;
  }[];
  pic_flag?: number;
  thumbnail_pic?: string;
  bmiddle_pic?: string;
  original_pic?: string;
  is_paid: boolean;
  mblog_vip_type: number;
  user: User;
  filterID?: string;
  picStatus?: string;
  pid?: number;
  pidstr?: string;
  retweeted_status?: Status;
  reposts_count: number;
  comments_count: number;
  reprint_cmt_count: number;
  attitudes_count: number;
  pending_approval_count: number;
  isLongText: boolean;
  reward_exhibition_type: number;
  reward_scheme?: string;
  hide_flag: number;
  mlevel: number;
  expire_time?: number;
  ad_state?: number;
  topic_id?: string;
  sync_mblog?: boolean;
  is_imported_topic?: boolean;
  darwin_tags: {
    object_type: string;
    object_id: string;
    display_name: string;
    enterprise_uid: null;
    bd_object_type: string;
  }[];
  mblogtype: number;
  mark?: string;
  rid: string;
  attitude_dynamic_adid?: string;
  more_info_type: number;
  cardid?: string;
  number_display_strategy?: {
    apply_scenario_flag: number;
    display_text_min_number: number;
    display_text: string;
  };
  enable_comment_guide: boolean;
  content_auth: number;
  safe_tags?: number;
  hide_hot_flow?: number;
  repost_type?: number;
  pic_num: number;
  fid?: number;
  alchemy_params: {
    ug_red_envelope: boolean;
  };
  jump_type?: number;
  reprint_type: number;
  can_reprint: boolean;
  new_comment_style: number;
  raw_text?: string;
  page_info?: {
    type: string;
    object_type: number;
    url_ori?: string;
    page_pic: {
      width?: number;
      pid?: string;
      source?: number;
      is_self_cover?: number;
      type?: number;
      url: string;
      height?: number;
    };
    page_url: string;
    object_id?: string;
    page_title: string;
    title?: string;
    content1: string;
    content2?: string;
    video_orientation?: string | null;
    play_count: string;
    media_info?: {
      stream_url: string;
      stream_url_hd: string;
      duration: number;
    };
    urls?: Record<string, string> | null;
  };
  pics?: {
    pid: string;
    url: string;
    size: string;
    geo: {
      width: number;
      height: number;
      croped: boolean;
    };
    large: {
      size: string;
      url: string;
      geo: {
        width: number;
        height: number;
        croped: boolean;
      };
    };
  }[];
  bid: string;
  isTop?: number;
  title?: {
    text: string;
    base_color: number;
  };
}

interface Data {
  ok: number;
  data: {
    user: User;
    statuses: Status[];
    more: string;
    fans: string;
    follow: string;
    button: {
      type: string;
      name: string;
      sub_type: number;
      params: {
        uid: string;
      };
    };
  };
}

const handler = async (
  id: string,
): Promise<FeedOptions & { itemsParams: string }> => {
  try {
    const url = 'https://m.weibo.cn/profile/info?uid=' + id;
    const response = await instance.get<Data>(url, {
      headers: {
        Referer: 'https://m.weibo.cn/',
      },
    });
    return {
      id: 'weibo-' + id,
      title: response.data.data.user.screen_name,
      generator: 'https://github.com/Feedive/feedive-serverless',
      link: 'http://weibo.com/' + id,
      description: `微博博主：${response.data.data.user.screen_name}${
        response.data.data.user.verified_reason
          ? '  认证信息：' + response.data.data.user.verified_reason
          : ''
      }`,
      copyright: `Copyright © ${new Date().getFullYear()} Sina`,
      itemsParams: /\d+/.exec(response.data.data.more)?.[0] || '',
    };
  } catch {
    throw new Error(`Cannot Retrieve Weibo Summary`);
  }
};

export { handler as default };
