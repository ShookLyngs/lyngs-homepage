// chain(body): body methods

import { merge } from "@lyngs/merge";
import { generateToken } from "./util";

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
  return merge(context, ...params);
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

const createNext = (context) => {
  const queue = context.queue;
  return async (forward = true) => {
    if (!forward) {
      cancelProgress(context);
    }
    if (context.data.status === ChainStatus.Canceled) {
      throw { status: ChainStatus.Canceled };
    }

    if (queue.length) {
      const task = queue.shift();
      triggerHook(context, 'onProgress', task);

      await task.action(context, createNext(context));
    } else {
      context.data.status = ChainStatus.Finished;
      triggerHook(context, 'onFinish');
    }
  };
};

const startProgress = (context) => {
  return async () => {
    triggerHook(context, 'onStart');

    context.data.status = ChainStatus.Progress;
    try {
      await createNext(context)();
    } catch(error) {
      if (error.status === ChainStatus.Canceled) {
        triggerHook(context, 'onCanceled');
      } else {
        throw error;
      }
    }
  };
};

const cancelProgress = (context) => {
  triggerHook(context, 'onBeforeCancel');
  context.data.status = ChainStatus.Canceled;
};

const hackContext = (context, injection) => {
  triggerHook(context, 'onBeforeHack');

  if (typeof injection !== 'function') {
    throw new Error('injection must be an instance of Function');
  }
  context = injection(context);

  triggerHook(context, 'onHacked');
  return context;
};

const useHook = (context, getData, type, callback) => {
  if (typeof getData !== 'function') {
    throw new Error(`Param 'getData' must be an instance of Function`);
  }
  if (typeof callback !== 'function') {
    throw new Error(`Param 'callback' must be an instance of Function`);
  }
  if (!type) {
    throw new Error(`Can't find param 'type'`);
  }
  if (!context.hooks[type]) {
    context.hooks[type] = [];
  }

  const token = generateToken();
  context.hooks[type].push({ token, getData, callback });
  return token;
};

const removeHook = (context, token) => {
  if (!token) {
    throw new Error(`can't find param 'token'`);
  }
  const hooks = context.hooks;
  for (let key in hooks) {
    if (!Object.prototype.hasOwnProperty.call(hooks, key)) continue;
    if (!hooks[key]?.length) continue;
    hooks[key] = hooks[key].filter(hook => hook.token !== token);
  }
};

const triggerHook = (context, type, ...params) => {
  if (!type) {
    throw new Error(`can't find param 'type'`);
  }

  const hooks = context?.hooks?.[type];
  if (hooks && hooks?.length) {
    hooks.forEach((hook) => {
      hook.callback(hook.getData(), ...params);
    });
    return true;
  } else {
    return false;
  }
};

export {
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
  triggerHook,
};