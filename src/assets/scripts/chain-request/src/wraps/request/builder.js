import { chain } from '../../framework';
import { provideHttpClient, sendRequest } from './middlewares';

class ChainRequest {
  // initialize chain instance
  constructor(caller, ...params) {
    this._instance = chain({ caller }, ...params);
  }

  // methods
  context(...params) {
    this._instance.context(...params);
    return this;
  }
  use(injection) {
    this._instance.use(injection);
    return this;
  }
  async start() {
    this.use(provideHttpClient({
      baseURL: 'http://localhost:3000/'
    }));
    this.use(sendRequest());

    await this._instance.start();
    return this;
  }
  cancel() {
    this._instance.cancel();
    return this;
  }
}

export {
  ChainRequest,
};
export default ChainRequest;
