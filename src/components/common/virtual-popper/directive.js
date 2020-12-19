import { useGlobalVirtualPopper } from './use-global';
import { on } from "<util>/common/dom";

const { instance } = useGlobalVirtualPopper();
const listeners = new Map();

const listen = (root, value) => {
  listeners.set(root, [
    on(root, 'mouseenter', () => {
      instance.addContent(root, value);
    }),
    on(root, 'mouseleave', () => {
      instance.removeContent(root);
    }),
  ]);
};
const remove = (root, removeContent = true) => {
  if (removeContent) {
    instance.removeContent(root);
  }
  if (listeners.has(root)) {
    listeners.get(root).forEach(listener => {
      listener.remove();
    });
  }
};

const install = (vue) => {
  vue.directive('virtual', {
    mounted(root, { value }) {
      listen(root, value);
    },
    updated(root, { value }) {
      remove(root, false);
      listen(root, value);
    },
    beforeUnMount(root) {
      remove(root);
    },
  });
};

export default {
  install,
};
