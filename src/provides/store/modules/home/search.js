export default () => ({
  name: 'search',
  store: {
    namespaced: true,
    state: {
      loadings: {
        suggest: false,
        suggestList: false,
      },
      input: {
        searcher: 'baidu',
        search: '',
        focus: false,
        enter: false,
      },
      suggest: {
        index: -1,
        list: [],
      },
    },
    getters: {
      isSuggestLoading(state) {
        const names = [ 'suggestList' ];
        return names.some(name => !!state.loadings[name]);
      },
    },
    mutations: {
      // common
      setLoading(state, { name, value }) {
        state.loadings[name] = value;
      },

      // input
      setInputState(state, payload) {
        Object.assign(state.input, payload);
      },

      // suggest
      setSuggestIndex(state, { index = void 0, relativeIndex = void 0 }) {
        if (typeof index === 'number') state.suggest.index = index;
        else if (typeof relativeIndex === 'number') state.suggest.index += relativeIndex;
        fixSuggestIndex(state);
      },
      setSuggestList(state, list) {
        state.suggest.list = list;
      },
    },
  },
});

/**
 * Fix index of suggest.
 * @param {object} state
 */
const fixSuggestIndex = (state) => {
  if (state.suggest.index < -1) state.suggest.index = state.suggest.list.length;
  if (state.suggest.index > state.suggest.list.length) state.suggest.index = -1;
};