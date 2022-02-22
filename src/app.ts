import { Server } from './wrap-http';
import allHello from './route-service/hello/all';
import getRssBilibili from './route-service/rss/bilibili/get';
import getRssJavaScriptWeekly from './route-service/rss/javascript-weekly/get';
import getRssWechat from './route-service/rss/wechat/get';
import getRssWeibo from './route-service/rss/weibo/get';

const app = new Server();
app.route('ALL', '/hello', allHello);
app.route('GET', '/rss/bilibili', getRssBilibili);
app.route('GET', '/rss/javascript-weekly', getRssJavaScriptWeekly);
app.route('GET', '/rss/wechat', getRssWechat);
app.route('GET', '/rss/weibo', getRssWeibo);

export { app as default };
