// chain(wrap): pack body methods to a class

import { merge } from "@lyngs/merge";
import {
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
} from './body';


class ChainBuilder {
  // initialize chain instance
  constructor(...params) {
    // create context
    this._context = initializeContext();
    merge(this._context.data, ...params);

    // register hooks
    registerHooks(this._context, [ 'onFinish', 'onCancel' ]);

    return this;
  }

  context(...params) {
    merge(this._context.data, ...params);
    return this;
  }
  hack(injection) {
    hackContext(this._context, injection);
    return this;
  }
  use(injection) {
    useMiddleware(
      this._context,
      injection,
      createNext(this._context.queue, this._context)
    );
    return this;
  }
  async start() {
    this._context.data.status = ChainStatus.Progress;
    try {
      await createNext(this._context.queue, this._context)();
    } catch(error) {
      if (error.status !== ChainStatus.Canceled) {
        throw error;
      }
    }
    return this;
  }
  cancel() {
    cancelProgress(this._context);
    return this;
  }
  useHook(type, callback, getToken) {
    const token = useHook(this._context, type, callback);
    if (typeof token === 'function') {
      getToken(token);
    }
    return this;
  }
  removeHook(token) {
    removeHook(this._context, token);
    return this;
  }
  registerHook(type) {
    registerHooks(this._context, type);
    return this;
  }
  triggerHook(type) {
    triggerHook(this._context, type);
    return this;
  }
}

const chain = (...params) => new ChainBuilder(...params);

export default ChainBuilder;
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

  // classes
  ChainBuilder,

  // wraps
  chain,
};