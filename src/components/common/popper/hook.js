import { createPopper } from '@popperjs/core';
import { findDOMNode } from '<util>/common/dom';
import { watchEffect, nextTick } from 'vue';

const handleOffset = (offset, ...params) => {
  if (typeof offset === 'number') {
    return [ offset, offset ];
  } else {
    return offset instanceof Function ? offset(...params) : offset;
  }
};

const usePopper = ({ target, popper, props }) => {
  if (!target || !popper) {
    throw new Error('Missing property: target|popper');
  }

  let instance;

  const rebindPopper = ({ offset }) => {
    if (instance) {
      instance.destroy();
      instance = null;
    }

    const options = {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: (context) => {
              return handleOffset(offset, context);
            },
          },
        },
      ],
    };

    instance = createPopper(
      findDOMNode(target.value),
      findDOMNode(popper.value),
      options
    );
  };

  const record = {
    target: null,
    popper: null,
  };
  watchEffect(() => {
    if (target.value && popper.value) {
      if (target.value !== record.target || popper.value !== record.target) {
        record.target = target.value;
        record.popper = popper.value;
        nextTick().then(() => rebindPopper(props));
      }
    }
  });

  const updatePopper = () => {
    return instance ? instance.update() : void 0;
  };

  return {
    instance,
    rebindPopper,
    updatePopper,
  };
};

export default usePopper;
export {
  usePopper,
};