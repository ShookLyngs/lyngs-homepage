// chain-request(middleware): set context.request.url only;
import { merge } from '../../../../modules/merge';

export default (url) => {
  return async function config(context, next) {
    if (!context.request) context.request = {};
    merge(context.request, { url });

    await next();
  };
};