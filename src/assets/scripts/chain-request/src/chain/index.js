// module(chain-request): main properties

import { merge } from '../modules/merge';

/*const ChainBaseComponent = () => {
  return {
    context: (...params) => merge(...params),
    use(context, injection) {
      if (typeof injection !== 'function') {
        throw new Error('injection must be an instance of Function');
      }
      injection(context);
    },
    chain(caller, ...params) {
      let   context = merge({ caller }, ...params);
      const self    = this;

      return {
        context(...params) {
          context = merge(context, params);
          return this;
        },
        use(injection) {
          self.use(context, injection);
          return this;
        },
        next(method) {
          method.call(this);
          return this;
        }
      };
    }
  };
};
const main = new ChainBaseComponent();*/

const initializeContext = (...params) => {
  const context = {
    caller: null,
    custom: {},
  };
  return params.length ? merge(context, ...params) : context;
};

const use = (context, injection) => {
  if (typeof injection !== 'function') {
    throw new Error('injection must be an instance of Function');
  }
  injection(context);
};

const chain = (caller, ...params) => {
  // initialize context
  let context = initializeContext({ caller });
  merge(context.custom, ...params);

  return {
    context(...params) {
      merge(context.custom, ...params);
      return this;
    },
    use(injection) {
      use(context.custom, injection);
      return this;
    },
    next(method) {
      method.call(this);
      return this;
    },
    start() {

    }
  };
};

export {
  chain,
};
export default chain;