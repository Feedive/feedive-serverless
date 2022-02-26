import cheerio from 'cheerio';
import { type Item } from 'feed';

interface ItemParams {
  uid: number;
  uname: string;
  text: string;
  emojiGroup: {
    text: string;
    url: string;
  }[][];
  origin?: Item | undefined;
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
  rank: string;
  sign: string;
  level_info: {
    current_level: number;
  };
}

// 转发动态
interface Data0 {
  user: {
    uid: number;
    uname: string;
    face: string;
  };
  item: {
    rp_id: number;
    uid: number;
    content: string;
    ctrl: string;
    orig_dy_id: number;
    pre_dy_id: number;
    timestamp: number;
    miss?: number;
    tips?: string;
    reply: number;
    orig_type: number;
  };
  origin?: string;
  origin_extension?: {
    lott: string;
  };
  origin_extend_json?: string;
  origin_user?: User;
}

// 文字动态
interface Data1 {
  user: {
    uid: number;
    uname: string;
    face: string;
  };
  item: {
    rp_id: number;
    uid: number;
    content: string;
    ctrl: string;
    orig_dy_id: number;
    pre_dy_id: number;
    timestamp: number;
    reply: number;
  };
}

// 图文动态
interface Data2 {
  item: {
    at_control: string;
    category: string;
    description: string;
    id: number;
    is_fav: number;
    pictures: {
      img_height: number;
      img_size: number;
      img_src: string;
      img_tags: [] | null;
      img_width: number;
    }[];
    pictures_count: number;
    reply: number;
    role: unknown;
    settings: {
      copy_forbidden: string;
    };
    source: unknown;
    title: string;
    upload_time: number;
  };
  user: {
    head_url: string;
    name: string;
    uid: number;
    vip: {
      avatar_subscript: number;
      due_date: number;
      label: {
        label_theme: string;
        path: string;
        text: string;
      };
      nickname_color: string;
      status: number;
      theme_type: number;
      type: number;
      vip_pay_type: number;
    };
  };
}

// 视频动态
interface Data3 {
  aid: number;
  attribute: number;
  cid: number;
  copyright: number;
  ctime: number;
  desc: string;
  dimension: {
    height: number;
    rotate: number;
    width: number;
  };
  duration: number;
  dynamic: string;
  first_frame: string;
  jump_url: string;
  mission_id: number;
  owner: {
    face: string;
    mid: number;
    name: string;
  };
  pic: string;
  player_info: null;
  pubdate: number;
  rights: {
    autoplay: number;
    bp: number;
    download: number;
    elec: number;
    hd5: number;
    is_cooperation: number;
    movie: number;
    no_background: number;
    no_reprint: number;
    pay: number;
    ugc_pay: number;
    ugc_pay_preview: number;
  };
  share_subtitle?: string;
  short_link: string;
  short_link_v2: string;
  stat: {
    aid: number;
    coin: number;
    danmaku: number;
    dislike: number;
    favorite: number;
    his_rank: number;
    like: number;
    now_rank: number;
    reply: number;
    share: number;
    view: number;
  };
  state: number;
  tid: number;
  title: string;
  tname: string;
  up_from_v2?: string;
  videos: number;
}

// 电台动态
interface Data4 {
  id: number;
  upId: number;
  title: string;
  upper: string;
  cover: string;
  author: string;
  ctime: number;
  replyCnt: number;
  playCnt: number;
  intro: string;
  schema: string;
  typeInfo: string;
  upperAvatar: string;
}

// 专栏动态
interface Data5 {
  id: number;
  category: {
    id: number;
    parent_id: number;
    name: string;
  };
  categories: {
    id: number;
    parent_id: number;
    name: string;
  }[];
  title: string;
  summary: string;
  banner_url: string;
  template_id: number;
  state: number;
  author: {
    mid: number;
    name: string;
    face: string;
    pendant: {
      pid: number;
      name: string;
      image: string;
      expire: number;
    };
    official_verify: {
      type: number;
      desc: string;
    };
    nameplate: {
      nid: number;
      name: string;
      image: string;
      image_small: string;
      level: string;
      condition: string;
    };
    vip: {
      type: number;
      status: number;
      due_date: number;
      vip_pay_type: number;
      theme_type: number;
      label: {
        path: string;
        text: string;
        label_theme: string;
      };
      avatar_subscript: number;
      nickname_color: string;
    };
  };
  reprint: number;
  image_urls: string[];
  publish_time: number;
  ctime: number;
  stats: {
    view: number;
    favorite: number;
    like: number;
    dislike: number;
    reply: number;
    share: number;
    coin: number;
    dynamic: number;
  };
  attributes: number;
  words: number;
  origin_image_urls: string[];
  list: null;
  is_like: false;
  media: {
    score: number;
    media_id: number;
    title: string;
    cover: string;
    area: string;
    type_id: number;
    type_name: string;
    spoiler: number;
    season_id: number;
  };
  apply_time: string;
  check_time: string;
  original: number;
  act_id: number;
  dispute: null;
  authenMark: null;
  cover_avid: number;
  top_video_info: null;
  type: number;
}

// 活动动态
interface Data6 {
  rid: number;
  user: {
    uid: number;
    uname: string;
    face: string;
  };
  vest: {
    uid: number;
    content: string;
    ctrl: string;
  };
  sketch: {
    title: string;
    desc_text: string;
    cover_url: string;
    target_url: string;
    sketch_id: number;
    biz_type: number;
    tags: {
      type: number;
      name: string;
      color: string;
    }[];
  };
}

type Data = Data0 | Data1 | Data2 | Data3 | Data4 | Data5 | Data6;

const handler = async (item: Item, itemParams: ItemParams): Promise<Item> => {
  try {
    const data: Data = JSON.parse(itemParams.text || '');
    const content0 = (data as Data0).item?.content;
    const content1 = (data as Data1).item?.content;
    const content2 = (data as Data2).item?.description;
    const content3 = (data as Data3).dynamic;
    const content4 = (data as Data4).intro;
    const content5 =
      (data as Data5).category && (data as Data5).category.name + '专栏';
    const content6 = (data as Data6).vest?.content;
    let content =
      `<a href="https://space.bilibili.com/${itemParams.uid}">@${itemParams.uname}</a>:` +
      (content0 ||
        content1 ||
        content2 ||
        content3 ||
        content4 ||
        content5 ||
        content6 ||
        '');
    for (const emoji of itemParams.emojiGroup[0]) {
      const searchValue = RegExp(
        emoji.text.replace('[', '\\[').replace(']', '\\]'),
        'g',
      );
      const replaceValue = `<img src="${emoji.url}" alt="${emoji.text}" referrerpolicy="no-referrer" style="margin: -1px 1px 0 1px;display: inline-block; width: 20px; height: 20px; vertical-align: text-bottom;">`;
      content = content.replace(searchValue, replaceValue);
    }
    const $ = cheerio.load(content);
    $('body').prepend(item.title);
    if ((data as Data2).item?.pictures) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      const pictures = (data as Data2).item?.pictures;
      for (const picture of pictures) {
        $('body').append(
          `<img src="${picture.img_src}" referrerpolicy="no-referrer" style="margin: 4px;">`,
        );
      }
    }
    if ((data as Data3).videos) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      const execArray = /\/(BV\w+)$/.exec(
        (data as Data3).short_link || (data as Data3).short_link_v2 || '',
      );
      const src =
        'https://player.bilibili.com/player.html?high_quality=1&bvid=' +
        execArray?.[1];
      $('body').append(
        `【视频】<a href="https://www.bilibili.com/video/${execArray?.[1]}">${
          (data as Data3).title
        }</a>：${(data as Data3).desc}`,
      );
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      $('body').append(
        `<iframe src="${src}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>`,
      );
    }
    if (((data as Data4).schema || '').startsWith('bilibili://music')) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      $('body').append(
        `【电台】<a href="https://www.bilibili.com/audio/au${
          (data as Data4).id
        }">${(data as Data4).title}</a>：${(data as Data4).typeInfo}`,
      );
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      $('body').append(
        `<img src="${
          (data as Data4).cover
        }" referrerpolicy="no-referrer" style="margin: 4px;">`,
      );
    }
    if ((data as Data5).category && (data as Data5).categories) {
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      $('body').append(
        `【专栏】<a href="https://www.bilibili.com/read/cv${
          (data as Data5).id
        }">${(data as Data5).title}</a>：${(data as Data5).summary}`,
      );
      $('body').append('<br clear="both" /><div style="clear: both;"></div>');
      for (const src of (data as Data5).image_urls) {
        $('body').append(
          `<img src="${src}" referrerpolicy="no-referrer" style="margin: 4px;">`,
        );
      }
    }
    if (itemParams.origin) {
      if (!(data as Data0).item?.miss) {
        const subItem = await handler(itemParams.origin, {
          uid: (data as Data0).origin_user?.info?.uid || 0,
          uname: (data as Data0).origin_user?.info?.uname || '',
          text: (data as Data0).origin || '',
          emojiGroup: itemParams.emojiGroup.slice(1),
        });
        $('body').append(
          `<blockquote style="background: #80808010;border-top: 1px solid #80808030;padding: 8px;">  ${subItem.description}</blockquote>`,
        );
      } else {
        $('body').append(
          `<blockquote style="background: #80808010;border-top: 1px solid #80808030;padding: 8px;">  ${
            (data as Data0).item?.tips || ''
          }</blockquote>`,
        );
      }
    }
    const title = $.text().trim();
    const description = $('body').html()?.trim();
    return {
      ...item,
      title: title || '',
      description: description || '',
    };
  } catch {
    throw new Error(`Cannot Retrieve Bilibili Item`);
  }
};

export { handler as default };
