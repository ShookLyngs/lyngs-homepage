// module(chain-request): main properties

import {
  ChainStatus, ChainBuilder,
  initializeContext, useMiddleware, createNext,
} from './builder';

const chain = (...params) => new ChainBuilder(...params);

export {
  // symbols
  ChainStatus,

  // methods
  chain,
  initializeContext,
  useMiddleware,
  createNext,
};
export default chain;