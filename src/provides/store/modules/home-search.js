export default () => ({
  name: 'home/search',
  store: {
    namespaced: true,
    state: {
      input: {
        search: '',
        focus: false,
        enter: false,
      },
      suggest: {
        index: -1,
        list: [],
      },
    },
    mutations: {
      setInputState(state, payload) {
        Object.assign(state.input, payload);
      },
      setSuggestIndex(state, { index = void 0, relativeIndex = void 0 }) {
        if (typeof index === 'number') state.suggest.index = index;
        else if (typeof relativeIndex === 'number') state.suggest.index += relativeIndex;
        fixSuggestIndex(state);
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