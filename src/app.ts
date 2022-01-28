import { Server } from './wrap-http';
import allHello from './route/hello/all';
import getRssJavaScriptWeekly from './route/rss/javascript-weekly/get';

const app = new Server();
app.route('ALL', /^\/hello$/, allHello);
app.route('GET', '/rss/javascript-weekly', getRssJavaScriptWeekly);

export default app;
