// searcher(middleware): calculation;

export default {
  type: 'middleware',
  injection: async (context, next) => {
    
    await next();
  },
};