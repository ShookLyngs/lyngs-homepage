import { ChainRequest } from './wrap';

const createRequest = (...params) => new ChainRequest(...params);

export {
  ChainRequest,
  createRequest,
};
export default createRequest;
export * from './middlewares';