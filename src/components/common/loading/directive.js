// component/common/loading
import { createApp } from 'vue';
import component from './loading';
import { setParentClass } from '<util>/common/dom';

/**
 * make ls-loading be as a directive of vue
 * @param vue {App}
 */
const install = (vue) => {
  const app = createInstance();
  let   instance,
        element;

  vue.directive('loading', {
    mounted(root, binding) {
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
};

const createInstance = () => createApp(component);

const createElement = () => document.createElement('div');

const append = (root, element, app) => {
  root.appendChild(element);
  return app.mount(element);
};

const remove = (root, element, app) => {
  app.unmount(element);
  root.removeChild(element);
};

const update = (root, instance, binding) => {
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

const getAttributes = (root) => ({
  text: root.getAttribute('ls-loading-text'),
  theme: root.getAttribute('ls-loading-theme'),
  fullscreen: root.getAttribute('ls-loading-fullscreen'),
});

export default {
  install,
};