import { middlewares } from './middlewares';
import { createFalse } from './body';

const useSearcher = async ({ target, input = '', type = 'list' }) => {
  const collection = [];

  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    let   result;

    if (middleware.supportTypes.includes(type)) {
      try {
        result = await middleware.handler({ input, type });
      } catch(error) {
        result = createFalse({
          error,
          message: `中间件错误: ${error.message}`,
        });
      }
    } else {
      result = createFalse({
        message: '搜索中间件不支持该类型',
      });
    }
  }
};

const useInput = () => {};

const useListItem = () => {};

const isMiddlewareUsable = result => !!result.usable;