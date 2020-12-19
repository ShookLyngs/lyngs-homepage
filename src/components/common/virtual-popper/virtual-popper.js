import LsCollapse from '<components>/common/collapse';

import { h, ref, watch, nextTick, watchEffect } from 'vue';
import { delayThrottle } from '<util>/common/event';
import { useVirtualPopper } from './body';

export default {
  name: "ls-virtual-popper",
  props: {
    content: {
      type: [ String, Object, Array, Function ],
      default: null,
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
    const setVisible = delayThrottle((value) => {
      isShowPopper.value = value;
      updatePopper();
      nextTick(updatePopper);
    });

    // Set popper visibility, and emit event.
    // Used it on @on events.
    const conditionAction  = (trigger, visible, eventType, ...params) => {
      if (props.trigger === trigger) setVisible(visible);
      if (eventType) emit(eventType, ...params);
    };

    // Content that will actually display on popper.
    const actual = ref(null);
    const store  = ref([]);
    const setContent = (value) => {
      actual.value = typeof value === 'function' ? () => value(h) : () => value;
      setVisible(!!value);
    };
    const addContent = (id, value) => {
      removeContent(id, false);
      store.value.push({ id, value });
      setContent(value);
    };
    const removeContent = (id, reset = true) => {
      store.value = store.value.filter(row => row.id !== id);

      if (reset) {
        if (store.value.length) {
          setContent(store.value[store.value.length - 1].value);
        } else {
          setContent(null);
        }
      }
    };
    watchEffect(() => setContent(props.content));

    return {
      popper,
      instance,
      isShowPopper,
      rebindPopper,
      updatePopper,
      conditionAction,

      actual,
      setVisible,
      addContent,
      removeContent,
      setContent,
    };
  },
  render() {
    const collapse = h(
      LsCollapse,
      {
        direction: 'both',
        show: this.isShowPopper,
      },
      {
        default: () => h('div', { class: 'ls-popper-inner' }, [
          this.actual()
        ])
      }
    );

    return h(
      'div',
      {
        ref: 'popper',
        role: 'popper',
        class: {
          'ls-popper': true,
          'is-show': this.isShowPopper,
          'is-transform': this.transformTransition
        },
      },
      h('div', { class: 'ls-popper__wrapper' }, [
        collapse
      ])
    );
  },
};