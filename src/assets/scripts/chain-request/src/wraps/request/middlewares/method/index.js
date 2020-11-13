// chain-request(middleware): set context.request.method only;
import { merge } from '../../../../modules/merge';

export default (method) => {
  return async function config(context, next) {
    if (!context.request) context.request = {};
    merge(context.request, { method });

    await next();
  };
};