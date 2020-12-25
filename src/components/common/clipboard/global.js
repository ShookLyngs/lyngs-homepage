import component from './clipboard';
import { createApp } from 'vue';

let instance;

// Create an instance of component.
const createInstance = () => {
  // Create element, then append to the HTML body.
  const element = window.document.createElement('div');
  element.style.display = 'none';
  window.document.body.appendChild(element);

  // Create Vue App, and mount it.
  instance = createApp(component).mount(element);
};

// Basically just set copy method into globalProperties of app.
const install = (app) => {
  // If instance not exists, create one.
  if (!instance) {
    createInstance();
  }
  // Set global property in app.
  app.config.globalProperties.$copyText = instance.copyText;
};

// Global copy method, for composition api.
const copyText = value => instance.copyText(value);

// Create instance.
createInstance();

export default {
  install,
  copyText,
};
export {
  install,
  copyText
};