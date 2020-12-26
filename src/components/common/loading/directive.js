// component/common/loading
import { createApp } from 'vue';
import component from './loading';
import { setParentClass } from '<util>/common/dom';

const store = new Map();
const useStore = (root) => {
  const app      = createApp(component);
  const element  = document.createElement('div');
  const instance = append(root, element, app);

  store.set(root, { app, element, instance });
  return store.get(root);
};
const unmountStore = (root) => {
  if (!store.has(root)) {
    return;
  }

  const { app, element } = store.get(root);

  app.unmount(element);
  if (root.contains(element)) {
    root.removeChild(element);
  }
};
const updateStore = (root, binding) => {
  if (!store.has(root)) {
    return;
  }

  const { instance } = store.get(root);
  const visible = !!binding.value;
  const {
    text,
    theme,
    fullscreen,
  } = getAttributes(root);

  setParentClass(
    visible ? 'add' : 'remove',
    'ls-loading-edge',
    false,
    !fullscreen ? root : void 0
  );

  instance.setText(text);
  instance.setTheme(theme);
  instance.setFullscreen(fullscreen);

  instance.setVisible(visible);
};

const install = (vue) => {
  vue.directive('loading', {
    mounted(root, binding) {
      if (store.has(root)) {
        unmountStore(root);
      }

      useStore(root);
      updateStore(root, binding);
    },
    updated(root, binding) {
      updateStore(root, binding);
    },
    beforeUnmount(root) {
      unmountStore(root);
    },
  });
};

/*const install = (vue) => {
  let app, instance, element;

  vue.directive('loading', {
    mounted(root, binding) {
      console.log(root);
      if (instance) {
        remove(root, element, app);
      }

      app = createInstance();
      element = createElement();
      instance = append(root, element, app);

      update(root, instance, binding);
    },
    updated(root, binding) {
      update(root, instance, binding);
    },
    beforeUnmount(root) {
      remove(root, element, app);
    },
  });
};*/

/*const createInstance = () => createApp(component);

const createElement = () => document.createElement('div');*/

const append = (root, element, app) => {
  root.appendChild(element);
  return app.mount(element);
};

/*
const remove = (root, element, app) => {
  app.unmount(element);
  if (root.contains(element)) {
    root.removeChild(element);
  }
};
*/

/*const update = (root, instance, binding) => {
  const visible = !!binding.value;
  const {
    text,
    theme,
    fullscreen,
  } = getAttributes(root);

  setParentClass(
    visible ? 'add' : 'remove',
    'ls-loading-edge',
    false,
    !fullscreen ? root : void 0
  );

  instance.setText(text);
  instance.setTheme(theme);
  instance.setFullscreen(fullscreen);

  instance.setVisible(visible);
};*/

const getAttributes = (root) => ({
  text: root.getAttribute('ls-loading-text'),
  theme: root.getAttribute('ls-loading-theme'),
  fullscreen: root.getAttribute('ls-loading-fullscreen'),
});

export default {
  install,
};