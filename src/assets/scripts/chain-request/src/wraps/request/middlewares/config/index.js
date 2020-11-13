// chain-request(middleware): merge context.request entirely;
import { merge } from '../../../../modules/merge';

export default (options) => {
  return async function config(context, next) {
    if (!context.request) context.request = {};
    merge(context.request, options);

    await next();
  };
};