import { middlewares } from './middlewares';
import { createFalse } from './body';

const createSearcherList = async ({ input = '', sort = true }) => {
  const collection = [];

  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    const { usable, result } = await getMiddlewareResult('list', input, middleware);

    if (usable) {
      collection.push(
        filterMiddleware({ ...middleware, result })
      );
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
      if (result.has(type)) {
        return result.create(type);
      } else {
        return createFalse({
          message: '无法找到对应中间件实例',
        });
      }
    } else {
      return result;
    }
  } else {
    return createFalse({
      message: '中间件不支持该类型',
    });
  }
};

const sortMiddlewareList = (middlewares) => middlewares.sort(
  (a, b) => {
    const aListIndex       = getMiddlewareIndex(a),
          bListIndex       = getMiddlewareIndex(b),
          aMiddlewareIndex = a?.result?.priority?.() ?? 0,
          bMiddlewareIndex = b?.result?.priority?.() ?? 0;

    const compareListIndex       = Math.sign(aListIndex - bListIndex),
          compareMiddlewareIndex = Math.sign(aMiddlewareIndex - bMiddlewareIndex) * -1;

    return Math.sign(compareListIndex + compareMiddlewareIndex);
  }
);

const getMiddlewareIndex = middleware => middlewares.indexOf(middleware);

const filterMiddleware = middleware => {
  const keys     = Reflect.ownKeys(middleware),
        excludes = [ 'handler' ],
        result   = {};

  keys.forEach(key => {
    if (!excludes.includes(key)) {
      result[key] = Reflect.get(middleware, key);
    }
  });

  return result;
};

export {
  createSearcherList,
  createSearcherListItem,
  createSearcherInput,
};