import { h, ref, watch, nextTick, watchEffect } from 'vue';
import { delayThrottle } from '<util>/common/event';
import { useVirtualPopper } from './hook';

import LsCollapse from '<components>/common/collapse';

export default {
  name: "ls-virtual-popper",
  components: {
    LsCollapse,
  },
  props: {
    content: {
      type: [ String, Object, Array ],
      default: void 0,
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    offset: {
      type: [ Number, Array, Function ],
      default: () => [ 12, 12 ],
      validator: offset => {
        if (offset instanceof Function) {
          return true;
        }
        if (Array.isArray(offset)) {
          return offset.length === 2 && offset.every(item => typeof item === 'number');
        }
        return typeof offset === 'number';
      },
    },
    transformTransition: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'mouse-enter',
    'mouse-leave',
    'focus',
    'blur',
    'click',
  ],
  setup(props, { emit }) {
    // Binding element refs.
    const popper = ref(null);

    // Using popper hook, To Generate instance of popper.
    const {
      instance,
      rebindPopper,
      updatePopper,
    } = useVirtualPopper({ popper, props });

    // Visibility of popper
    const isShowPopper = ref(true);

    // If visibility changes, update popper
    watch(() => isShowPopper.value, (value) => {
      if (value && instance) {
        nextTick(updatePopper);
      }
    });

    // Set popper <visibility>, changes will be execute after 300ms.
    // In 300ms, new changes will always cover the old one.
    // And every new change reset the timer.
    const setPopperVisible = delayThrottle((value) => {
      isShowPopper.value = value;
      updatePopper();
      nextTick(updatePopper);
    });

    // Set popper visibility, and emit event.
    // Used it on @on events.
    const conditionAction  = (trigger, visible, eventType, ...params) => {
      if (props.trigger === trigger) setPopperVisible(visible);
      if (eventType) emit(eventType, ...params);
    };

    const content = ref(null);
    const setContent = (value) => {
      content.value = value;
    };
    watchEffect(() => {
      if (props.content) {
        content.value = props.content;
      }
    });

    return {
      popper,
      instance,
      isShowPopper,
      rebindPopper,
      updatePopper,
      conditionAction,

      actualContent: content,
      setVisible: setPopperVisible,
      setContent,
    };
  },
  render() {
    return h('div',
      {
        ref: 'popper',
        role: 'popper',
        class: {
          'ls-popper': true,
          'is-show': this.isShowPopper,
          'is-transform': this.transformTransition
        },
      },
      [
        h('div',
          {
            class: 'ls-popper__wrapper',
          },
          [
            h(LsCollapse,
              {
                direction: 'both',
                show: this.isShowPopper,
              },
              h('div',
                { class: 'ls-popper-inner' },
                [
                  this.actualContent ? this.actualContent(h) : ''
                ]
              )
            )
          ]
        )
      ]
    );
  },
};