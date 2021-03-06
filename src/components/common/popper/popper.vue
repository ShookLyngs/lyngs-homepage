<template>
  <!-- default slot, preventing lose sight of async-component -->
  <component
    tabindex="0"
    ref="target"
    :is="defaultSlot"
    @click="$emit('click')"
    @focus="conditionAction('focus', true, 'focus')"
    @blur="conditionAction('focus', false, 'blur')"
    @mouseenter="conditionAction('hover', true, 'mouse-enter')"
    @mouseleave="conditionAction('hover', false, 'mouse-leave')"
  />

  <!-- teleport the popper to body -->
  <teleport :to="teleport">
    <div
      class="ls-popper"
      ref="popper"
      role="tooltip"
      :class="{ 'is-show': isShowPopper, 'is-transform': transformTransition }"
    >
      <div class="ls-popper-inner">
        <slot name="content">
          {{ text }}
        </slot>
      </div>
      <div class="ls-popper-arrow" data-popper-arrow />
    </div>
  </teleport>
</template>

<script>
  import { ref, watch, nextTick } from 'vue';
  import { delayThrottle } from '<util>/common/event';
  import { usePopper } from './hook';

  export default {
    name: "ls-popper",
    props: {
      text: {
        type: String,
        default: void 0,
      },
      placement: {
        type: String,
        default: 'bottom',
      },
      trigger: {
        type: String,
        default: 'hover',
        validator: value => [
          'hover', 'focus', 'manual'
        ].includes(value),
      },
      offset: {
        type: [ Number, Array, Function ],
        default: () => [ 0, 10 ],
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
      popperClass: {
        type: [ String, Array, Object ],
        default: void 0,
      },
    },
    emits: [
      'mouse-enter',
      'mouse-leave',
      'focus',
      'blur',
      'click',
    ],
    setup(props, { slots, emit }) {
      // Default slot, only accept single element.
      // Or won't be able to get ref: <target>.
      const [ defaultSlot ] = slots.default();

      // Binding element refs.
      const target = ref(null);
      const popper = ref(null);

      // Using popper hook, To Generate instance of popper.
      const {
        instance,
        rebindPopper,
        updatePopper,
      } = usePopper({ target, popper, props });

      // Visibility of popper
      const isShowPopper = ref(false);

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
        defaultSlot,
        target,
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

<style lang="less">
  .ls-popper {
    @apply transition-fast;
    position: absolute;
    padding: 4px 8px;
    color: @weak[strongest];
    background: @shadow[strongest];
    font-weight: bold;
    font-size: 13px;
    border-radius: @radius[small];
    visibility: hidden;
    opacity: 0;
    z-index: 100;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    transition-property: padding, visibility, opacity, z-index;

    &.is-show {
      visibility: visible;
      opacity: 1;
      z-index: 100;
    }
    &.is-virtual {
      padding: 0;
      border-radius: 0 @radius[small] @radius[small] @radius[small];
    }
    &.is-transform {
      transition-property: padding, visibility, opacity, z-index, transform;
    }

    & &__wrapper {
      position: relative;
    }
    & &__inner {
      position: absolute;
      padding: 4px 8px;
      min-width: 0;
      //max-width: 340px;
      white-space: nowrap;
    }
  }
</style>