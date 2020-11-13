// chain-request(middleware): provide-http-client;
// this middleware provides http client <axios>;

import axios from 'axios';

export default (config) => {
  const options = typeof config === 'function' ? config(axios) : config,
        instance = axios.create(options);

  return async function provideHttpClient(context, next) {
    context.http = instance;
    await next();
  };
};