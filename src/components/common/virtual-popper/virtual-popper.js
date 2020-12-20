import LsCollapse from '<components>/common/collapse';

import { h, ref, watch, nextTick, watchEffect, computed } from 'vue';
import { delayThrottle } from '<util>/common/event';
import { useVirtualPopper } from './use-virtual-popper';

export default {
  name: "ls-virtual-popper",
  props: {
    placement: {
      type: String,
      default: 'bottom-start',
    },
    offset: {
      type: [ Number, Array, Function ],
      default: () => [ 14, 14 ],
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

    // Visibility of popper.
    const isShowPopper = ref(false);

    // Decide whether to toggle visibility automatically or not.
    const autoToggleVisible = ref(true);

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

    // Store contents.
    const store  = ref([]);

    // Content that will actually display on popper.
    // Always display the last content in <store>.
    const actual = computed(() => {
      const row = store.value.length ? store.value[store.value.length - 1].value : null;
      return typeof row === 'function' ? () => row(h) : () => row;
    });

    // Add content to store list.
    // <id> is a unique key for a content, use Element as id for example.
    const addContent = (id, value) => {
      const index = store.value.findIndex(row => row['id'] === id);
      if (index > -1) {
        store.value[index].value = value;
      } else {
        store.value.push({ id, value });
      }
    };

    // Remove a content from store list, based on content id.
    const removeContent = (id) => {
      store.value = store.value.filter(row => row['id'] !== id);
    };

    // If allow auto toggling visibility, then toggle it when <actual> changes.
    watchEffect(() => {
      if (autoToggleVisible.value) {
        if (actual.value()) {
          setVisible(true);
        } else {
          isShowPopper.value = false;
          setVisible(false);
        }
      }
    });

    return {
      popper,
      instance,
      isShowPopper,
      autoToggleVisible,
      rebindPopper,
      updatePopper,
      conditionAction,

      actual,
      setVisible,
      addContent,
      removeContent,
    };
  },
  render() {
    // Collapse component.
    // Come along with actual content inside.
    const collapse = (
      <LsCollapse
        direction='both'
        show={this.isShowPopper}
        v-slots={{
          default: () => (
            <div className='ls-popper__inner'>
              { this.actual() }
            </div>
          )
        }}
      />
    );

    return (
      <div
        ref='popper'
        role='popper'
        class={[
          'ls-popper',
          'is-virtual',
          this.isShowPopper ? 'is-show' : '',
          this.transformTransition ? 'is-transform' : '',
        ]}
      >
        <div class='ls-popper__wrapper'>
          { collapse }
        </div>
      </div>
    );
  },
};