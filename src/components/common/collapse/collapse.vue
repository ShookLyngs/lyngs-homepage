<template>
  <div class="ls-collapse" :style="wrapStyles">
    <ls-resize-observer @resize="onResize">
      <slot />
    </ls-resize-observer>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  export default {
    name: 'collapse',
    components: {
      LsResizeObserver: defineAsyncComponent(() => import('<components>/common/resize-observer')),
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      direction: {
        type: String,
        default: 'vertical',
        validator: value => [
          'vertical',
          'horizontal'
        ].includes(value),
      },
    },
    data: () => ({
      size: {
        width: void 0,
        height: void 0,
      },
    }),
    computed: {
      wrapStyles() {
        const styles = {};

        console.log('style');

        if (this.direction === 'vertical') {
          styles.height = this.show ? `${this.size.height}px` : '0px';
        }
        if (this.direction === 'horizontal') {
          styles.width = this.show ? `${this.size.width}px` : '0px';
        }

        return styles;
      },
    },
    methods: {
      onResize(size) {
        this.size = size;
      },
    },
  }
</script>