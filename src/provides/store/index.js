import { createStore } from 'vuex';
import { createModules } from './util/module';

export default createStore({
  modules: {
    ...createModules([
      require('./modules/home-search')
    ])
  }
});
