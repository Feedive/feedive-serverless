import { Server } from './wrap-http';
import allHello from './route-service/hello/all';
import getRssJavaScriptWeekly from './route-service/rss/javascript-weekly/get';
import getRssWechat from './route-service/rss/wechat/get';

const app = new Server();
app.route('ALL', '/hello', allHello);
app.route('GET', '/rss/javascript-weekly', getRssJavaScriptWeekly);
app.route('GET', '/rss/wechat', getRssWechat);

export { app as default };
