// chain-request(module): request

import { chain } from '../../framework';
import { provideHttpClient, sendRequest } from '../../middlewares';

const createRequest = (caller, ...params) => {
  const instance = chain(caller, ...params);

  return {
    context(...params) {
      instance.context(...params);
      return this;
    },
    use(injection) {
      instance.use(injection);
      return this;
    },
    async start() {
      this.use(provideHttpClient({
        baseURL: 'https://baidu.com/'
      }));
      this.use(sendRequest());

      await instance.start();
      return this;
    },
    cancel() {
      instance.cancel();
      return this;
    }
  };
};

export {
  createRequest
};
export default createRequest;