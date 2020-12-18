import LsResizeObserver from '<components>/common/resize-observer';
import { reactive, computed, h } from 'vue';

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
  setup(props, { slots }) {
    const size = reactive({
      width: void 0,
      height: void 0,
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

    const onResize = ({ width, height }) => {
      size.width = width;
      size.height = height;
    };

    return () => h(
      'div',
      {
        class: 'ls-collapse',
        style: wrapStyles.value,
      },
      h(
        LsResizeObserver,
        {
          onResize,
        },
        h(slots.default)
      )
    );
  }
};