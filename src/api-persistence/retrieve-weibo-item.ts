import cheerio from 'cheerio';
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
  longText: {
    longTextContent: string;
    url_objects: {
      url_ori: string;
      object_id: string;
      expire_time?: number;
      info?: {
        url_short: string;
        url_long: string;
        type: number;
        result: boolean;
        title: string;
        description: string;
        last_modified: number;
        transcode: number;
        ext_status: number;
        trusted_state: number;
      };
      object: {
        object_id: string;
        request_oid: string;
        containerid: string;
        object_domain_id: string;
        object_type: string;
        safe_status: number;
        show_status: string;
        act_status: string;
        last_modified: string;
        timestamp: number;
        uuid: number;
        uuidstr: string;
        activate_status: string;
        object: unknown;
        actions: {
          name: string;
          pic: string;
          type: string;
          params: {
            scheme: string;
          };
        }[];
        is_longtext: boolean;
      };
      like_count: number;
      play_count?: number;
      isActionType: boolean;
      follower_count: number;
      asso_like_count: number;
      card_info_un_integrity: boolean;
      super_topic_status_count: number;
      super_topic_photo_count: number;
      search_topic_count: number;
      search_topic_read_count: number;
      is_follow_object?: boolean;
    }[];
  };
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
  attitude_dynamic_adid?: string;
  more_info_type: number;
  cardid?: string;
  number_display_strategy?: {
    apply_scenario_flag: number;
    display_text_min_number: number;
    display_text: string;
  };
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
    video_orientation?: string;
    play_count?: string;
    media_info?: {
      stream_url: string;
      stream_url_hd: string;
      duration: number;
    };
    urls?: Record<string, string>;
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
  buttons: {
    type: string;
    name: string;
    sub_type: number;
    params: { uid: number };
  }[];
  status_title: string;
  ok: number;
}

interface Data {
  ok: number;
  data: Status;
}

const handler = async (item: Item): Promise<Item> => {
  try {
    const execArray = /\/(\d+)\/(\w+)$/.exec(item.link);
    const url = 'https://m.weibo.cn/statuses/show?id=' + execArray?.[2];
    const response = await instance.get<Data>(url, {
      headers: {
        'MWeibo-Pwa': 1,
        Referer: 'https://m.weibo.cn/u/' + execArray?.[1],
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const $ = cheerio.load(
      (response.data.data.longText &&
        response.data.data.longText.longTextContent) ||
        response.data.data.text ||
        '',
    );
    for (const a of $('a')) {
      if (/^\//.test($(a).attr('href') || '')) {
        $(a).attr('href', 'https://m.weibo.com' + $(a).attr('href'));
      }
    }
    if (response.data.data.user) {
      const { id, screen_name } = response.data.data.user;
      $('body').prepend(
        `<a href="https://m.weibo.com/${id}">@${screen_name}</a>:`,
      );
    } else {
      $('body').prepend(`[原微博不可访问]`);
    }
    if (response.data.data.pics?.length) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      for (const pic of response.data.data.pics) {
        const {
          geo: { width, height },
          large: { url },
        } = pic;
        $('body').append(
          `<img src="${url}" width="${width}" height="${height}" style="margin: 4px;">`,
        );
      }
    }
    if (response.data.data.page_info?.type === 'video') {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      const {
        media_info,
        page_pic: { url },
      } = response.data.data.page_info;
      const src = media_info?.stream_url || media_info?.stream_url_hd || '';
      $('body').append(
        `<video src="${src}" poster="${url}" controls="controls" style="width: 100%;"></video>`,
      );
    }
    if (response.data.data.retweeted_status) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      const status = response.data.data.retweeted_status;
      if (status.user) {
        const subItem = await handler({
          title: $.text().trim(),
          link: `https://m.weibo.com/${status.user.id}/${status.bid}`,
          date: new Date(status.created_at),
        });
        $('body').append(
          `<blockquote style="background: #80808010;border-top: 1px solid #80808030;padding: 8px;">${subItem.description}</blockquote>`,
        );
      } else {
        $('body').append(
          `<blockquote style="background: #80808010;border-top: 1px solid #80808030;padding: 8px;">${'[原微博不可访问]'}</blockquote>`,
        );
      }
    }
    const description = $('body').html()?.trim() || '';
    return {
      ...item,
      description: description || '',
    };
  } catch {
    throw new Error(`Cannot Retrieve Weibo Item`);
  }
};

export { handler as default };
