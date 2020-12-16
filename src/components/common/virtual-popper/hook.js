import { createPopper } from '@popperjs/core';
import { findDOMNode, on } from '<util>/common/dom';
import { watchEffect, nextTick, onBeforeUnmount } from 'vue';

const handleOffset = (offset, ...params) => {
  if (typeof offset === 'number') {
    return [ offset, offset ];
  } else {
    return offset instanceof Function ? offset(...params) : offset;
  }
};

const generateRectMethod = (x = 0, y = 0) => {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });
};

const useVirtualPopper = ({ popper, props }) => {
  if (!props || !popper) {
    throw new Error('Missing property: popper|props');
  }

  let instance,
      listener;

  const rebindPopper = ({ offset, placement }) => {
    if (instance) {
      instance.destroy();
      instance = null;
    }
    if (listener) {
      listener.remove();
      listener = null;
    }

    const virtualElement = {
      getBoundingClientRect: generateRectMethod(),
    };

    const options = {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: (context) => handleOffset(offset, context),
          },
        },
      ],
    };

    instance = createPopper(
      virtualElement,
      findDOMNode(popper.value),
      options
    );

    listener = on(window.document, 'mousemove', ({ clientX: x, clientY: y }) => {
      virtualElement.getBoundingClientRect = generateRectMethod(x, y);
      if (instance) {
        instance.update();
      }
    });
  };

  const record = {
    popper: null,
  };
  watchEffect(() => {
    if (popper.value && popper.value !== record.target) {
      record.popper = popper.value;

      // Only rebind popper when target and popper both exists
      nextTick().then(() => {
        if (findDOMNode(popper.value)) {
          rebindPopper(props);
        }
      });
    }
  });

  const updatePopper = () => {
    return instance ? instance.update() : void 0;
  };

  onBeforeUnmount(() => {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  });

  return {
    instance,
    rebindPopper,
    updatePopper,
  };
};

export default useVirtualPopper;
export {
  useVirtualPopper,
};