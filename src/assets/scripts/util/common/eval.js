
const codeProxies = new WeakMap();
const compileCode = (content) => {
  const code = new Function('context', `with(context) { ${content} }`);

  return (data = {}) => {
    if (!codeProxies.has(data)) {
      codeProxies.set(data, new Proxy(data, {
        has: () => true,
        get: (target, key) => key === Symbol.unscopables ? void 0 : target[key],
      }));
    }
    return code(codeProxies.get(data));
  };
};

export const compileFunction = (context, code) => {
  return compileCode(`
    return (function() { ${code} }).call({});
  `)(context);
};