// chain-request(framework): builder

import { generateToken } from "<assets>/scripts/chain-request/src/modules/token";
import { merge } from "<assets>/scripts/chain-request/src/modules/merge";

const ChainStatus = {
  Ready:    Symbol('ready'),
  Progress: Symbol('progress'),
  Finished: Symbol('finished'),
  Canceled: Symbol('canceled'),
};

const initializeContext = (...params) => {
  const context = {
    token: generateToken(),
    queue: [],
    data: {
      caller: null,
      status: ChainStatus.Ready,
    },
  };
  return merge({}, context, ...params);
};

const useMiddleware = (context, injection, next) => {
  if (typeof injection !== 'function') {
    throw new Error('injection must be an instance of Function');
  }
  context.queue.push({
    token: context.token,
    name: injection.name ?? 'anonymous',
    action: () => injection(context.data, next),
  });
};

const createNext = (queue, context) => {
  return async (forward = true) => {
    if (!forward) {
      context.data.status = ChainStatus.Canceled;
    }
    if (context.data.status === ChainStatus.Canceled) {
      return;
    }

    if (queue.length) {
      const task = queue.shift();
      await task.action(context, createNext(queue, context.data));
    } else {
      context.data.status = ChainStatus.Finished;
    }
  };
};

const hackContext = (context, hacker) => {
  if (typeof hacker !== 'function') {
    throw new Error('hacker must be an instance of Function');
  }
  context = hacker(context);
};

class ChainBuilder {
  // initialize chain instance
  constructor(...params) {
    this._context = initializeContext();
    merge(this._context.data, ...params);

    return this;
  }

  // public methods

  context(...params) {
    merge(this._context.data, ...params);
    return this;
  }
  hack(hacker) {
    hackContext(this._context, hacker);
    return this;
  }
  use(injection) {
    useMiddleware(
      this._context,
      injection,
      createNext(this._context.queue, this._context)
    );
    console.log(this._context, [].concat(this._context.queue));
    return this;
  }
  async start() {
    this._context.data.status = ChainStatus.Progress;
    await createNext(this._context.queue, this._context)();
    return this;
  }
  cancel() {
    this._context.data.status = ChainStatus.Canceled;
    return this;
  }
}

export {
  // symbols
  ChainStatus,

  // methods
  initializeContext,
  useMiddleware,
  createNext,

  // classes
  ChainBuilder,
};
export default ChainBuilder;