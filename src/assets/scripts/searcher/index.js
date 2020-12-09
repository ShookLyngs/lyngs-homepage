import { middlewares } from './middlewares';
import { createFalse } from './body';

const createSearcherList = async ({ input = '', sort = true }) => {
  const collection = [];

  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    const result = await getMiddlewareResult('list', input, middleware);

    if (isMiddlewareUsable(result)) {
      collection.push(result.get());
    }
  }

  return sort ? sortMiddlewareList(collection): collection;
};

const createSearcherListItem = async ({ name, input = '' }) => {
  return await createMiddleware({
    name,
    input,
    type: 'list',
  });
};

const createSearcherInput = async ({ name, input = '' }) => {
  return await createMiddleware({
    name,
    input,
    type: 'input',
  });
};

const createMiddleware = async ({ name, type = 'input', input = '' }) => {
  const middleware = middlewares.find(
    item => item.name === name
  );

  if (middleware) {
    return await getMiddlewareResult({ type, input });
  } else {
    return createFalse({
      message: '中间件不存在',
    });
  }
};

const getMiddlewareResult = async (type, input, middleware) => {
  if (middleware.supportTypes.includes(type)) {
    const result = await middleware.handler({ input });

    if (result.type === 'switch') {
      return result.get(type)();
    } else {
      return result;
    }
  } else {
    return createFalse({
      message: '中间件不支持该类型',
    });
  }
};

const isMiddlewareUsable = result => !!result.usable;

const sortMiddlewareList = (middlewares) => middlewares.sort(
  (a, b) => {
    const aListIndex       = getMiddlewareIndex(a),
          bListIndex       = getMiddlewareIndex(b),
          aMiddlewareIndex = a?.index ?? 0,
          bMiddlewareIndex = b?.index ?? 0;

    const compareListIndex       = Math.sign(aListIndex - bListIndex),
          compareMiddlewareIndex = Math.sign(aMiddlewareIndex - bMiddlewareIndex);

    return compareMiddlewareIndex !== 0 ? compareMiddlewareIndex : compareListIndex;
  }
);

const getMiddlewareIndex = middleware => middlewares.indexOf(middleware);


export {
  createSearcherList,
  createSearcherListItem,
  createSearcherInput,
};