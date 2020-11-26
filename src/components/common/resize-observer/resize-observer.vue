<template>
  <slot />
</template>

<script>
  import ResizeObserver from 'resize-observer-polyfill';
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
        token: null,
        width: 0,
        height: 0,
      };
    },
    emits: [
      'resize',
    ],
    methods: {
      onComponentUpdated () {
        if (this.disabled) {
          this.destroyObserver();
          return;
        }

        const element = findDOMNode(this);
        console.log(this.token, element);
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
      this.token = Math.floor(Math.random() * 10000);
      this.$nextTick(this.onComponentUpdated);
    },
    updated() {
      console.log('updated', this.token);
      this.onComponentUpdated();
    },
    beforeUnmount() {
      this.destroyObserver();
    },
  }
</script>