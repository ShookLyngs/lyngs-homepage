import { ref } from 'vue';
import { useGlobalVirtualPopper } from './use-global';
import { on } from "<util>/common/dom";

// Generate real instance of VirtualPopper.
const { instance } = useGlobalVirtualPopper();

// Global listener collection.
// Use map so the keys of listeners can be any type.
const listeners = new Map();

// Bind mouse events on root element.
const listen = (root, value) => {
  const refValue = ref(value);

  listeners.set(root, {
    value: refValue,
    events: [
      on(root, 'mouseenter', () => {
        instance.addContent(root, refValue);
      }),
      on(root, 'mouseleave', () => {
        instance.removeContent(root);
      }),
    ],
  });
};

const update = (root, value) => {
  if (listeners.has(root)) {
    listeners.get(root).value.value = value;
  }
};

// Remove content and listeners.
// Set <removeContent> to false if you dont wanna remove content in popper instance.
const remove = (root, removeContent = true) => {
  if (removeContent) {
    instance.removeContent(root);
  }
  if (listeners.has(root)) {
    listeners.get(root).events.forEach(listener => {
      listener.remove();
    });
    listeners.delete(root);
  }
};

export default {
  install: (vue) => {
    vue.directive('tooltip', {
      mounted(root, { value }) {
        listen(root, value);
      },
      updated(root, { value }) {
        update(root, value);
      },
      beforeUnmount(root) {
        remove(root);
      },
    });
  }
};