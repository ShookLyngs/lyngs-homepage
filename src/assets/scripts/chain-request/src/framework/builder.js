// chain-request(framework): builder

import { generateToken } from "<assets>/scripts/chain-request/src/modules/token";
import { merge } from "@lyngs/merge";

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
    hooks: {},
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
      cancelProgress(context);
    }
    if (context.data.status === ChainStatus.Canceled) {
      throw { status: ChainStatus.Canceled };
    }

    if (queue.length) {
      const task = queue.shift();
      await task.action(context, createNext(queue, context.data));
    } else {
      context.data.status = ChainStatus.Finished;
      triggerHook(context, 'onFinish');
    }
  };
};

const cancelProgress = (context) => {
  context.data.status = ChainStatus.Canceled;
  triggerHook(context, 'oncCancel');
};

const hackContext = (context, injection) => {
  if (typeof injection !== 'function') {
    throw new Error('injection must be an instance of Function');
  }
  context = injection(context);
  return context;
};

const registerHook = (context, type) => {
  if (!context.hooks) {
    context.hooks = {};
  }
  if (!context.hooks[type]) {
    context.hooks[type] = [];
  } else {
    console.warn(`Hook ${type} has been registered before`);
  }
};

const registerHooks = (context, types) => {
  if (!Array.isArray(types)) {
    types = [ types ];
  }
  [ ...(new Set(types)) ].forEach((type) => {
    registerHook(context, type);
  });
};

const useHook = (context, type, callback) => {
  // callback type-error
  if (typeof callback !== 'function') {
    throw new Error(`callback must be an instance of Function`);
  }

  // check type's type-check and push it to list
  if (context.hooks[type] !== void 0) {
    const token = generateToken();
    context.hooks[type].push({ token, callback });
    return token;
  } else {
    throw new Error(`can't find hook type: ${type}`);
  }
};

const removeHook = (context, token) => {
  const hooks = context.hooks;
  for (let key in hooks) {
    if (!Object.prototype.hasOwnProperty.call(hooks, key)) continue;
    if (!hooks[key]?.length) continue;
    hooks[key] = hooks[key].filter(hook => hook.token !== token);
  }
};

const triggerHook = (context, type) => {
  const hooks = context?.hooks?.[type];
  if (hooks?.length || hooks?.length === 0) {
    hooks.forEach((hook) => {
      hook.callback(context);
    });
    return true;
  } else {
    return false;
  }
};

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
};
export default ChainBuilder;