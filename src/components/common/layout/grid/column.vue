<script>
  import { computed } from 'vue';

  export default {
    name: "ls-column",
    props: {
      span: {
        type: [ Number, String ],
        default: 24,
      },
      big: {
        type: [ Number, String ],
      },
      middle: {
        type: [ Number, String ],
      },
      small: {
        type: [ Number, String ],
      },
      smaller: {
        type: [ Number, String ],
      },

      gutter: {
        type: [ Number, String ],
      },
      rowGutter: {
        type: [ String, Number ],
      },
      columnGutter: {
        type: [ String, Number ],
      },

      percent: {
        type: Boolean,
        default: false,
      },
      flex: {
        type: Boolean,
        default: false,
      },

      format: {
        type: String,
        default: 'ls-grid-{media}width-{span}',
      },
      percentFormat: {
        type: String,
        default: 'ls-{media}width-{span}',
      },
    },
    setup(props) {
      // computed
      /**
       * if span is a percentage-value, then return a class-style string;
       * else return null;
       */
      const spanToClass = (span, media = '') => {
        let number = null;

        if (props.percent && typeof span === 'string' && span.endsWith('%') && span.length > 1) {
          const percentage = span.endsWith('%') && span.length > 1
            ? Number(span.substr(span.length - 2))
            : Number(span);
          if (!Number.isNaN(percentage)) number = percentage;
        } else if (!Number.isNaN(span)) {
          number = Number(span);
        }

        if (number !== null) {
          const format = props.percent ? props.percentFormat : props.format;
          return format.replace('{span}', number).replace('{media}', media ? `${media}-` : '');
        }
        return null;
      };
      /**
       * return an array that contains class-style strings.
       */
      const classes = computed(() => {
        const list = [];

        // spans
        if (props.span) {
          list.push(spanToClass(props.span));
        }
        if (props.big) {
          list.push(spanToClass(props.span, 'big'));
        }
        if (props.middle) {
          list.push(spanToClass(props.span, 'middle'));
        }
        if (props.small) {
          list.push(spanToClass(props.span, 'small'));
        }
        if (props.smaller) {
          list.push(spanToClass(props.span, 'smaller'));
        }

        // gutters
        if (!props.columnGutter && !props.rowGutter && props.gutter) {
          list.push(`ls-padding-${props.gutter}`);
        }
        if (props.columnGutter) {
          list.push(`ls-padding-column-${props.columnGutter}`);
        }
        if (props.rowGutter) {
          list.push(`ls-padding-row-${props.rowGutter}`);
        }

        // displays
        if (props.flex) {
          list.push('is-flex');
        }

        return list.filter(item => item);
      });

      // active functions

      return {
        classes,
      };
    },
  };
</script>

<template>
  <div class="ls-grid-column" :class="classes">
    <div class="ls-grid-column-container">
      <slot></slot>
    </div>
  </div>
</template>