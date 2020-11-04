<script>
  // plugin-modules
  import ResizeObserver from 'resize-observer-polyfill';
  // util
  import { findDOMNode } from '<util>/common/dom';
  export default {
    name: "ls-resize-observer",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      this.observer = null;
      this.currentElement = null;
      return {
        width: 0,
        height: 0,
      };
    },
    methods: {
      onComponentUpdated () {
        if (this.disabled) {
          this.destroyObserver();
          return;
        }

        const element = findDOMNode(this);
        if (element !== this.currentElement) {
          this.destroyObserver();
          this.currentElement = element;
        }

        if (!this.observer && element) {
          this.observer = new ResizeObserver(this.onResize);
          this.observer.observe(element);
        }
      },
      onResize(entries) {
        const { target } = entries[0];
        const { width, height } = target.getBoundingClientRect();

        const sizes = {
          width: Math.floor(width),
          height: Math.floor(height),
        };

        if (this.width !== sizes.width || this.height !== sizes.height) {
          this.width = sizes.width;
          this.height = sizes.height;
          this.$emit('resize', sizes);
        }
      },

      destroyObserver () {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }
    },
    mounted() {
      this.onComponentUpdated();
    },
    updated() {
      this.onComponentUpdated();
    },
    beforeUnmount() {
      this.destroyObserver();
    },
  }
</script>

<template>
  <slot></slot>
</template>