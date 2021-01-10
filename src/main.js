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

// import(components): all global vue components;
import components from '<provides>/components';
app.use(components);

// import(tailwindcss): develop base css-framework;
import 'tailwindcss/tailwind.css';

// import(theme): theme data initialized;
import setupTheme from '<provides>/theme';
setupTheme();

// mounting app instance
app.mount('#app');
