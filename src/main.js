import { createApp } from 'vue';

// create instance of App
import App from '<views>/layout/app';
const app = createApp(App);

// import(ls-ui-styles): styles of the project
import '<assets>/styles/index.less';

// import(vue-router): page router
import router from '<provides>/router';
app.use(router);

// import(vuex): vue state controller
import store from '<provides>/store';
app.use(store);

// mounting app instance
app.mount('#app');
