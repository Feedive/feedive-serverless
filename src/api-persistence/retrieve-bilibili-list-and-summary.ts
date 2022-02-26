import { type FeedOptions, type Item } from 'feed';
import instance from './instance';

interface Desc {
  uid: number;
  type: number;
  rid: number;
  acl?: number;
  view: number;
  repost: number;
  comment?: number;
  like: number;
  is_liked?: number;
  dynamic_id: number;
  timestamp: number;
  pre_dy_id?: number;
  orig_dy_id?: number;
  orig_type?: number;
  uid_type: number;
  stype?: number;
  r_type?: number;
  inner_id?: number;
  status: number;
  dynamic_id_str: string;
  pre_dy_id_str: string;
  orig_dy_id_str: string;
  rid_str: string;
  bvid?: string;
}

interface User {
  info: {
    uid: number;
    uname: string;
    face: string;
    face_nft: number;
  };
  card: {
    official_verify: {
      type: number;
      desc: string;
    };
  };
  vip: {
    vipType: number;
    vipDueDate: number;
    vipStatus: number;
    themeType: number;
    label: {
      path: string;
      text: string;
      label_theme: string;
      text_color: string;
      bg_style: number;
      bg_color: string;
      border_color: string;
    };
    avatar_subscript: number;
    nickname_color: string;
    role: number;
    avatar_subscript_url: string;
  };
  pendant: {
    pid: number;
    name: string;
    image: string;
    expire: number;
    image_enhance: string;
    image_enhance_frame: string;
  };
  decorate_card?: {
    mid: number;
    id: number;
    card_url: string;
    card_type: number;
    name: string;
    expire_time: number;
    card_type_name: string;
    uid: number;
    item_id: number;
    item_type: number;
    big_card_url: string;
    jump_url: string;
    fan: {
      is_fan: number;
      number: number;
      color: string;
      num_desc: string;
    };
    image_enhance: string;
  };
  rank: string;
  sign: string;
  level_info: {
    current_level: number;
  };
}

interface AttachCard {
  type: string;
  head_text: string;
  cover_url: string;
  cover_type: number;
  title: string;
  desc_first: string;
  desc_second: string;
  jump_url: string;
  button: {
    type: number;
    [key: string]: unknown;
  };
  oid_str: string;
}

interface Display {
  topic_info?: {
    topic_details: {
      topic_id: number;
      topic_name: string;
      is_activity: number;
      topic_link: string;
    }[];
    new_topic?: {
      id: number;
      name: string;
      link: string;
    };
  };
  usr_action_txt?: string;
  emoji_info?: {
    emoji_details: {
      emoji_name: string;
      id: number;
      package_id: number;
      state: number;
      type: number;
      attr: number;
      text: string;
      url: string;
      meta: {
        size: number;
      };
      mtime: number;
    }[];
  };
  relation: {
    status: number;
    is_follow: number;
    is_followed: number;
  };
  comment_info?: {
    comments?: {
      uid: number;
      name: string;
      content: string;
    }[];
    emojis?: {
      emoji_name: string;
      url: string;
      meta: {
        size: number;
      };
    }[];
    comment_ids: string;
  };
  attach_card?: AttachCard;
  add_on_card_info?: {
    add_on_card_show_type: number;
    [key: string]: unknown;
  }[];
  tags?: {
    tag_type: number;
    sub_type: number;
    icon: string;
    text: string;
    link: string;
    sub_module: string;
  }[];
  show_tip?: {
    del_tip: string;
  };
  rich_text?: {
    rich_details: {
      jump_uri: string;
      icon_type: number;
      text: string;
      orig_text: string;
    }[];
  };
  cover_play_icon_url?: string;
}

interface Card {
  desc: Desc & {
    user_profile: User;
    origin: Desc;
  };
  card: string;
  extension?: {
    vote_cfg: {
      vote_id: number;
      desc: string;
      join_num: number;
    };
    vote: string;
  };
  extend_json: string;
  extra: {
    is_space_top: number;
  };
  activity_infos?: {
    details: {
      type: number;
      detail: string;
    }[];
  };
  display: Display & { origin?: Display };
}

interface Data {
  code: number;
  msg: string;
  message: string;
  data: {
    has_more: number;
    cards: Card[];
    next_offset: number;
    __gt__: number;
  };
}

const handler = async (
  id: string,
): Promise<{ summary: FeedOptions; list: Item[] }> => {
  try {
    const url =
      'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=' +
      id;
    const response = await instance.get<Data>(url, {
      headers: {
        Referer: 'https://space.bilibili.com/' + id,
      },
    });
    const profile = response.data.data.cards[0].desc.user_profile;
    return {
      summary: {
        id: 'bilibili-' + id,
        title: profile.info.uname,
        generator: 'https://github.com/Feedive/feedive-serverless',
        link: `https://space.bilibili.com/${id}/dynamic`,
        description: `哔哩哔哩UP主：${profile.info.uname}${
          profile.card.official_verify.desc
            ? '  认证信息：' + profile.card.official_verify.desc
            : ''
        }`,
        copyright: `Copyright © ${new Date().getFullYear()} Bilibili`,
      },
      list: response.data.data.cards.map((card) => {
        const title = `<a href="https://space.bilibili.com/${card.desc.user_profile.info.uid}">@${card.desc.user_profile.info.uname}</a>:`;
        let description = card.card;
        for (const emoji of card.display.emoji_info?.emoji_details || []) {
          description = description.replaceAll(
            emoji.text,
            `<img src=\\"${emoji.url}\\" alt=\\"${emoji.text}\\" referrerpolicy=\\"no-referrer\\" style=\\"margin: -1px 1px 0 1px;display: inline-block; width: 20px; height: 20px; vertical-align: text-bottom;\\">`,
          );
        }
        return {
          title: title,
          link: 'https://t.bilibili.com/' + card.desc.dynamic_id_str,
          date: new Date(card.desc.timestamp * 1000),
          description: description,
        };
      }),
    };
  } catch {
    throw new Error(`Cannot Retrieve Bilibili List & Summary`);
  }
};

export { handler as default };
