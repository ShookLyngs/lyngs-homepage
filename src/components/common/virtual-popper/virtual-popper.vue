<template>
  <!-- teleport the popper to body -->
  <teleport :to="teleport">
    <div
      class="ls-popper"
      ref="popper"
      role="tooltip"
      :class="{ 'is-show': isShowPopper, 'is-transform': transformTransition }"
    >
      <slot name="content">
        {{ text }}
      </slot>
      <div class="ls-popper-arrow" data-popper-arrow />
    </div>
  </teleport>
</template>

<script>
  import { ref, watch, nextTick } from 'vue';
  import { delayThrottle } from '<util>/common/event';
  import { useVirtualPopper } from './hook';

  export default {
    name: "ls-virtual-popper",
    props: {
      text: {
        type: String,
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
      teleport: {
        type: String,
        default: '#app',
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

      return {
        popper,
        instance,
        isShowPopper,
        rebindPopper,
        updatePopper,
        conditionAction,
      };
    },
  }
</script>