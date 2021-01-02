<template>
  <div class="ls-collapse" :class="wrapClasses" :style="wrapStyles">
    <ls-resize-observer @resize="onResize">
      <slot />
    </ls-resize-observer>
  </div>
</template>

<script>
  import { reactive, ref, computed } from 'vue';
  import LsResizeObserver from '<components>/common/resize-observer';
  export default {
    name: 'collapse',
    components: {
      LsResizeObserver,
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
    setup(props) {
      const size = reactive({
        width: ref(void 0),
        height: ref(void 0),
      });
      const onResize = (newSize) => {
        size.width = newSize.width;
        size.height = newSize.height;
      };

      const wrapClasses = computed(() => {
        const classes = [];

        if (props.show) {
          classes.push('is-show');
        }

        return classes;
      });
      const wrapStyles = computed(() => {
        const styles    = {};
        const show      = props.show;
        const direction = props.direction;

        if (direction === 'vertical' || direction === 'both') {
          styles.height = show && size.height ? `${size.height}px` : '0px';
        }
        if (direction === 'horizontal' || direction === 'both') {
          styles.width = show && size.width ? `${size.width}px` : '0px';
        }

        return styles;
      });

      return {
        size,
        wrapClasses,
        wrapStyles,
        onResize,
      };
    },
  }
</script>