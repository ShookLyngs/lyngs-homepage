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
          'horizontal',
          'both',
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
        const styles    = {};
        const size      = this.size;
        const show      = this.show;
        const direction = this.direction;

        if (direction === 'vertical' || direction === 'both') {
          styles.height = show && size.height ? `${size.height}px` : '0px';
        }
        if (direction === 'horizontal' || direction === 'both') {
          styles.width = show && size.width ? `${size.width}px` : '0px';
        }

        return styles;
      },
    },
    methods: {
      onResize(size) {
        this.size = size;
        this.$forceUpdate();
      },
    },
  }
</script>