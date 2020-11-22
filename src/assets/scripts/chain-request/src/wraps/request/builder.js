import { ChainBuilder } from '../../framework';
import { provideHttpClient, sendRequest } from './middlewares';

/**
 * @class ChainRequest
 * @extends ChainBuilder
 * @description ChainRequest is an extender of ChainBuilder.
 *              The instance of ChainRequest provides basic methods inside, such as a http-client module.
 *              Developers can use middlewares to do anything on requesting.
 *              For example, you can decide what http-client you wanna use,
 *              and without losing other request function like setting a request status-lock.
 * @param caller {any} - Vue instance, for chain-instance to access some properties.
 * @param params {arg[]} - any value you wanna pass on context in chain-instance.
 */

class ChainRequest extends ChainBuilder {
  constructor(caller, ...params) {
    super({ caller }, ...params);
    super.use(provideHttpClient());
  }

  async start() {
    super.use(sendRequest());
    await super.start();
    return this;
  }
}

export {
  // classes
  ChainRequest,
};
export default ChainRequest;
