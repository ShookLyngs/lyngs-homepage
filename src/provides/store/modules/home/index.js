import { createModules } from '../../util/module';
export default () => ({
  name: 'home',
  store: {
    namespaced: true,
    modules: {
      ...createModules([
        require('./search')
      ]),
    },
  },
});