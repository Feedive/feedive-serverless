import { type Item } from 'feed';
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

interface Mblog {
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
  textLength: number;
  source: string;
  favorited: boolean;
  pic_ids: string[];
  pic_types: string;
  thumbnail_pic: string;
  bmiddle_pic: string;
  original_pic: string;
  is_paid: boolean;
  mblog_vip_type: number;
  user: User;
  filterID?: string;
  picStatus?: string;
  pid?: number;
  pidstr?: string;
  retweeted_status?: Mblog;
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
  extern_safe?: number;
  number_display_strategy: {
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
  mblog_menu_new_style?: number;
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
    video_orientation?: string;
    play_count?: string;
    media_info?: {
      stream_url: string;
      stream_url_hd: string;
      duration: number;
    };
    urls?: Record<string, string>;
  };
  pics: {
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
}

interface Data {
  ok: number;
  data: {
    cards: {
      card_type: number;
      card_type_name?: string;
      itemid?: string;
      scheme?: string;
      mblog?: Mblog;
      show_type: number;
      card_style?: number;
      title: string;
      card_group?: {
        card_type: number;
        card_type_name: string;
        itemid: string;
        scheme: string;
        mblog: Mblog;
        show_type: number;
        title: string;
      }[];
    }[];
    cardlistInfo?: {
      can_shared: number;
      total: number;
      show_style: number;
      title_top: string;
      page_type: string;
      cardlist_head_cards: {
        head_type: number;
        channel_list: {
          id: string;
          name: string;
          containerid: string;
          default_add: number;
          must_show: number;
          apipath: string;
        }[];
      }[];
      page: number;
    };
    scheme?: string;
    showAppTips?: number;
  };
}

const handler = async (id: string, listParams: string): Promise<Item[]> => {
  try {
    const url = `https://m.weibo.cn/api/container/getIndex?type=uid&value=${id}&containerid=${listParams}`;
    const response = await instance.get<Data>(url, {
      headers: {
        'MWeibo-Pwa': 1,
        Referer: 'https://m.weibo.cn/u/' + id,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (response.data.ok === 0) {
      throw new Error(`Cannot Retrieve Weibo List`);
    }
    const mblogs = response.data.data.cards
      .map((card) => card.card_group?.[0].mblog || card.mblog)
      .filter((mblog): mblog is Mblog => !!mblog);
    return mblogs.map((mblog) => ({
      title: '',
      link: `https://m.weibo.com/${mblog.user.id}/${mblog.bid}`,
      date: new Date(mblog.created_at),
      description: '',
    }));
  } catch {
    throw new Error(`Cannot Retrieve Weibo List`);
  }
};

export { handler as default };
