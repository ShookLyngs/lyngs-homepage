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
import Icon from '<components>/common/icon';
app.use(Icon);

// import(component): ls-icon;
import Popper from '<components>/common/popper';
app.use(Popper);

// import(component): ls-loading;
import loading from '<components>/common/loading';
app.use(loading);

// import(component): ls-virtual-popper;
import LsVirtualPopper from '<components>/common/virtual-popper';
app.use(LsVirtualPopper);

// import(component): ls-clipboard;
import LsClipboard from '<components>/common/clipboard';
app.use(LsClipboard);

// import(tailwind-css): base css framework;
import 'tailwindcss/tailwind.css';

// mounting app instance
app.mount('#app');
