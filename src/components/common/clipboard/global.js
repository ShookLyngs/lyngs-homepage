import component from './clipboard';
import { createApp } from 'vue';

export default {
  install: (app) => {
    // Create element, then append to the HTML body.
    const element = window.document.createElement('div');
    element.style.display = 'none';
    window.document.body.appendChild(element);

    // Create Vue App, and mount it.
    const instance = createApp(component).mount(element);

    // Set global property in app.
    // Copy text to system clipboard.
    app.config.globalProperties.$copyText = instance.copyText;
  },
};