// module(chain-request): main properties

import {
  ChainBuilder,
} from './builder';

const chain = (...params) => new ChainBuilder(...params);

export default chain;
export {
  chain,
  ChainBuilder,
};
export {
  // symbols
  ChainStatus,
  // original-methods
  initializeContext,
  useMiddleware,
  createNext,
  cancelProgress,
  hackContext,
  registerHook,
  registerHooks,
  useHook,
  removeHook,
  triggerHook,
} from './builder';