// module(chain-request): main properties

const ChainBaseComponent = () => {
  return {
    context: (context = {}, ...params) => Object.assign(context, ...params),
    use(context, injection) {
      if (typeof injection !== 'function') {
        throw new Error('injection must be an instance of Function');
      }
      injection(context);
    },
    chain(caller, ...params) {
      const context = this.context({ caller }, ...params),
            self    = this;

      return {
        context(...params) {
          self.context(context, params);
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
const main = new ChainBaseComponent();

export const chain = main.chain.bind(main);