<template>
  <!-- default slot, preventing lose sight of async-component -->
  <component
    ref="target"
    :is="exactSlot"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  />

  <!-- teleport the popper to body -->
  <teleport to="body">
    <transition name="fade">
      <div
        class="ls-popper"
        ref="popper"
        role="tooltip"
        v-show="isShowPopper"
      >
        <slot name="content">
          {{ text }}
        </slot>
        <div class="ls-popper-arrow" data-popper-arrow />
      </div>
    </transition>
  </teleport>
</template>

<script>
  import { ref, watch } from 'vue';
  import { createPopper } from '@popperjs/core';
  import { findDOMNode } from '<util>/common/dom';
  import { delayThrottle } from '<util>/common/event';

  export default {
    name: "ls-popper",
    props: {
      text: {
        type: String,
        default: void 0,
      },
    },
    setup(props, { slots }) {
      const target = ref(null);
      const popper = ref(null);

      const defaultSlots = slots.default();
      const exactSlot = defaultSlots.length && defaultSlots[0] || void 0;

      let popperInstance;
      const updatePopper = () => {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }

        popperInstance = createPopper(
          findDOMNode(target.value), findDOMNode(popper.value),
          {
            placement: 'bottom',
          },
        );
      };

      let isShowPopper = ref(false);
      const setPopperVisible = delayThrottle((value) => (isShowPopper.value = value));
      const onEnter = () => setPopperVisible(true);
      const onLeave = () => setPopperVisible(false);

      watch(() => target.value, () => {
        if (target.value && popper.value) {
          updatePopper();
        }
      });

      return {
        exactSlot,
        target,
        popper,
        isShowPopper,
        onEnter,
        onLeave,
      };
    },
  }
</script>