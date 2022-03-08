import { Server } from './wrap-http';
import getAtomBilibili from './route-service/atom/bilibili/get';
import getAtomWechat from './route-service/atom/wechat/get';
import getAtomWeibo from './route-service/atom/weibo/get';
import allHello from './route-service/hello/all';
import getJsonBilibili from './route-service/json/bilibili/get';
import getJsonWechat from './route-service/json/wechat/get';
import getJsonWeibo from './route-service/json/weibo/get';
import getRssBilibili from './route-service/rss/bilibili/get';
import getRssJavaScriptWeekly from './route-service/rss/javascript-weekly/get';
import getRssWechat from './route-service/rss/wechat/get';
import getRssWeibo from './route-service/rss/weibo/get';

const app = new Server();
app.route('GET', '/atom/bilibili', getAtomBilibili);
app.route('GET', '/atom/wechat', getAtomWechat);
app.route('GET', '/atom/weibo', getAtomWeibo);
app.route('ALL', '/hello', allHello);
app.route('GET', '/json/bilibili', getJsonBilibili);
app.route('GET', '/json/wechat', getJsonWechat);
app.route('GET', '/json/weibo', getJsonWeibo);
app.route('GET', '/rss/bilibili', getRssBilibili);
app.route('GET', '/rss/javascript-weekly', getRssJavaScriptWeekly);
app.route('GET', '/rss/wechat', getRssWechat);
app.route('GET', '/rss/weibo', getRssWeibo);

export { app as default };
