import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';

const agentOptions = {
  keepAlive: true,
  maxFreeSockets: 10,
};

const httpAgent = new HttpAgent(agentOptions);
const httpsAgent = new HttpsAgent(agentOptions);

const instance = axios.create({
  timeout: 10 * 1e3,
  maxContentLength: -1,
  maxBodyLength: -1,
  httpAgent: httpAgent,
  httpsAgent: httpsAgent,
});

axiosRetry(instance as Parameters<typeof axiosRetry>[0]);

export { instance as default };
