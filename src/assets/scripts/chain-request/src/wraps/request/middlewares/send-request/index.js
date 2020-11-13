// chain-request(middleware): send-request;
// this middleware will send request using context.http;

export default () => {
  return async function sendRequest(context, next) {
    if (typeof context.http === 'function') {
      try {
        context.response = await context.http(context.request);
      } catch(error) {
        context.response = error;
      }
    }
    await next();
  };
};