import { createApp } from 'vue';

// create(instance): vue instance;
import App from '<views>/layout/app';
const app = createApp(App);

// import(vue-router): page-router;
import router from '<provides>/router';
app.use(router);

// import(vuex): state controller for vue;
import store from '<provides>/store';
app.use(store);

// import(component): ls-icon;
import icon from '<components>/common/icon';
app.use(icon);

// import(component): ls-loading;
import loading from '<components>/common/loading';
app.use(loading);

import LsVirtualPopper from '<components>/common/virtual-popper';
app.use(LsVirtualPopper);

console.log(app);

// import(ls-ui-styles): make sure to put it at the tail;
import '<assets>/styles/index.less';

// mounting app instance
app.mount('#app');
