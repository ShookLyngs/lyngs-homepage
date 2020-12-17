import { useGlobalVirtualPopper } from './use-global';
import { on } from "<util>/common/dom";

const {
  /*app,
  element,*/
  instance,
} = useGlobalVirtualPopper();

const listen = (listeners, root, value) => {
  listeners.push(on(root, 'mouseenter', () => {
    instance.setContent(value);
    instance.setVisible(true);
  }));
  listeners.push(on(root, 'mouseleave', () => {
    instance.setContent(null);
    instance.setVisible(false);
  }));
};

const install = (vue) => {
  const listeners = [];

  vue.directive('virtual', {
    mounted(root, { value }) {
      listen(listeners, root, value);
    },
    beforeUnMount() {
      listeners.forEach(listener => listener.remove());
    },
  });
};

export default {
  install,
};
