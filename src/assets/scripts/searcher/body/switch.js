/**
 * return a switch result object
 * @param {Object} context
 * @returns {{usable: boolean, get: (function(*=): any), has: (function(*=): boolean), type: string, error: boolean}}
 */
export default (context) => {
  return {
    type: 'switch',
    usable: true,
    error: false,
    has: key => Reflect.has(context, key),
    get: key => Reflect.get(context, key),
    create: key => {
      const result = Reflect.get(context, key);

      if (!result) {
        throw new Error(`Cannot find property in Searcher.Result: ${key}`);
      }

      return result instanceof Function ? result() : result;
    },
  };
};