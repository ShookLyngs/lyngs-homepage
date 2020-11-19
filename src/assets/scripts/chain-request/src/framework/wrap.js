// chain(wrap): pack body methods to a class

import { merge } from "@lyngs/merge";
import {
  // symbols
  ChainStatus,

  // original-methods
  initializeContext,
  useMiddleware,
  createNext,
  startProgress,
  cancelProgress,
  hackContext,
  useHook,
  removeHook,
  removeHooks,
  triggerHook,
} from './body';


class ChainBuilder {
  // initialize chain instance
  constructor(...params) {
    // create context
    this._context = initializeContext();
    merge(this._context.data, ...params);

    return this;
  }

  // context
  context(...params) {
    merge(this._context.data, ...params);
    return this;
  }
  hack(injection) {
    hackContext(this._context, injection);
    return this;
  }

  // middleware
  use(injection) {
    useMiddleware(
      this._context,
      injection,
      createNext(this._context)
    );
    return this;
  }
  async start() {
    await startProgress(this._context)();
    return this;
  }
  cancel() {
    cancelProgress(this._context);
    return this;
  }

  // hooks
  on(type, callback, getToken) {
    const token = useHook(this._context, () => this._context.data, type, callback);
    if (typeof token === 'function') {
      getToken(token);
    }
    return this;
  }
  off(target) {
    if (typeof target === 'function') {
      removeHook(this._context, target);
    } else {
      removeHooks(target);
    }
    return this;
  }
  emit(type) {
    triggerHook(this._context, type);
    return this;
  }

  // life-circle-hooks
  onStart(callback, getToken) {
    this.on('onStart', callback, getToken);
    return this;
  }
  onProgress(callback, getToken) {
    this.on('onProgress', callback, getToken);
    return this;
  }
  onBeforeCancel(callback, getToken) {
    this.on('onBeforeCancel', callback, getToken);
    return this;
  }
  onCanceled(callback, getToken) {
    this.on('onCanceled', callback, getToken);
    return this;
  }
  onPop(callback, getToken) {
    this.on('onPop', callback, getToken);
    return this;
  }
  onFinish(callback, getToken) {
    this.on('onFinish', callback, getToken);
    return this;
  }
  onBeforeHack(callback, getToken) {
    this.on('onBeforeHack', callback, getToken);
    return this;
  }
  onHacked(callback, getToken) {
    this.on('onHacked', callback, getToken);
    return this;
  }
}

const chain = (...params) => new ChainBuilder(...params);

export default ChainBuilder;
export {
  // enum
  ChainStatus,

  // original-methods
  initializeContext,
  useMiddleware,
  createNext,
  cancelProgress,
  hackContext,
  useHook,
  removeHook,
  triggerHook,

  // classes
  ChainBuilder,

  // wraps
  chain,
};