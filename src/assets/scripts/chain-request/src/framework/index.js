// module(chain-request): main properties

import {
  ChainStatus, ChainBuilder,
  initializeContext, useMiddleware, createNext,
} from './builder';

const chain = (...params) => new ChainBuilder(...params);

export {
  chain,
  ChainStatus,
};
export default chain;