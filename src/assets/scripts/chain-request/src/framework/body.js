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
};