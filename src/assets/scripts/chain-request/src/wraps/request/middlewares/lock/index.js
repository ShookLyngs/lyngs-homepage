// chain-request(middleware): set context.lock;
import { merge } from '../../../../modules/merge';

export default (lock) => {
  return async function config(context, next) {
    context.lock = lock;
    const isLocked = false;

    await next(!isLocked);


  };
};