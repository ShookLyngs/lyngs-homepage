<script>
  import { computed, provide } from 'vue';

  export default {
    name: "ls-row",
    props: {
      span: {
        type: [ Number, String ],
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
        default: 'ls-grid-{media}height-{span}',
      },
      percentFormat: {
        type: String,
        default: 'ls-{media}height-{span}',
      },
    },
    setup(props) {
      // active methods
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

      // computed
      /**
       * return merged gutters.
       */
      const gutters = computed(() => {
        const gutter = props.gutter,
              row    = props.rowGutter,
              column = props.column;

        return {
          row: row ?? gutter,
          column: column ?? gutter,
        };
      });
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
        /*if (gutters.value.row) {
          list.push(`ls-margin-reverse-row-half-${gutters.value.row}`);
        }*/
        if (gutters.value.column) {
          list.push(`ls-margin-column-${gutters.value.column}`);
        }

        // displays
        if (props.flex) {
          list.push('is-flex');
        }

        return list.filter(item => item);
      });

      // provides
      provide('gutters', gutters);

      return {
        classes,
      };
    },
  };
</script>

<template>
  <div class="ls-grid-row" :class="classes">
    <div class="ls-grid-row-container">
      <slot />
    </div>
  </div>
</template>