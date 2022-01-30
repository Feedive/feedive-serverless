import { type Handler } from '../../wrap-http';

const handler: Handler = async () => {
  return {
    body: 'Hello, World!',
  };
};

export { handler as default };
