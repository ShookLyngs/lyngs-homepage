<template>
  <div class="ls-scrollbar" :class="scrollbarClass">
    <div
      ref="wrap"
      class="ls-scrollbar__wrap"
      :class="wrapClass"
      :style="mergedWrapStyle"
      @scroll="onScroll"
    >
      <ls-resize-observer @resize="onResize">
        <div
          ref="view"
          class="ls-scrollbar__view"
          :class="viewClass"
          :style="mergedViewStyle"
        >
          <slot />
        </div>
      </ls-resize-observer>
    </div>
    <ls-scrollbar-bar
      :size="size.height"
      :move="move.y"
      v-if="!disabledVertical"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    />
    <ls-scrollbar-bar
      direction="horizontal"
      :size="size.width"
      :move="move.x"
      v-if="!disabledHorizontal"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { getScrollBarWidth } from '<util>/common/dom';
  import { mergeStyle } from '<util>/common/style';

  export default {
    name: "ls-scrollbar",
    components: {
      LsResizeObserver: defineAsyncComponent(() => import('<components>/common/resize-observer')),
      LsScrollbarBar: defineAsyncComponent(() => import('./scrollbar-bar')),
    },
    emits: [
      'scroll'
    ],
    provide() {
      return {
        scrollbar: this,
      };
    },
    props: {
      disabledVertical: {
        type: Boolean,
        default: false,
      },
      disabledHorizontal: {
        type: Boolean,
        default: false,
      },
      wrapClass: {
        type: [ Object, Array, String ],
        default: '',
      },
      wrapStyle: {
        type: [ Object, String ],
        default: '',
      },
      viewClass: {
        type: [ Object, Array, String ],
        default: '',
      },
      viewStyle: {
        type: [ Object, String ],
        default: '',
      },
      viewMaxHeight: {
        type: [ Number, String ],
        default: void 0,
      },
      viewMaxWidth: {
        type: [ Number, String ],
        default: void 0,
      },
    },
    data: () => ({
      store: {
        dragging: false,
        gutter: null,
        wrapSize: {},
        wrapStyle: {},
      },
      size: {
        width: '',
        height: '',
      },
      move: {
        x: 0,
        y: 0,
      },
    }),
    computed: {
      wrap() {
        return this.$refs.wrap;
      },
      gutterWithUnit() {
        return this.store.gutter ? `-${this.store.gutter}px` : null;
      },
      scrollbarClass() {
        const classes = [];

        if (this.store.dragging) {
          classes.push('is-dragging');
        }

        return classes;
      },
      mergedWrapStyle() {
        if (!this.gutterWithUnit) return this.wrapStyle;

        const gutterWithUnit = this.gutterWithUnit,
              gutterStyle    = {
                marginBottom: gutterWithUnit,
                marginRight: gutterWithUnit,
              };

        return mergeStyle(this.wrapStyle, gutterStyle);
      },
      mergedViewStyle() {
        const viewStyle = this.viewStyle,
              viewMaxHeight = this.viewMaxHeight,
              viewMaxWidth = this.viewMaxWidth;

        return mergeStyle({
          maxHeight: typeof viewMaxHeight === 'number' ? `${viewMaxHeight}px` : viewMaxHeight,
          maxWidth: typeof viewMaxWidth === 'number' ? `${viewMaxWidth}px` : viewMaxWidth,
        }, viewStyle);
      },
    },
    methods: {
      // proactive
      update() {
        this.store.gutter = getScrollBarWidth();
        this.size.height = this.getBarVerticalSize();
        this.size.width = this.getBarHorizontalSize();
      },
      getWrapSizes() {
        if (!this.wrap) return null;

        const {
          scrollTop, scrollHeight, clientHeight,
          scrollLeft, scrollWidth, clientWidth,
        } = this.wrap;

        return {
          scrollTop, scrollHeight, clientHeight,
          scrollLeft, scrollWidth, clientWidth,
        };
      },
      getBarVerticalSize() {
        const { clientHeight, scrollHeight } = this.getWrapSizes(),
              percentage   = clientHeight * 100 / scrollHeight;

        return percentage < 100 ? `${percentage}%` : '';
      },
      getBarHorizontalSize() {
        const { clientWidth, scrollWidth } = this.getWrapSizes(),
              percentage  = clientWidth * 100 / scrollWidth;

        return percentage < 100 ? `${percentage}%` : '';
      },

      // passive
      onScroll() {
        const {
          scrollTop, scrollLeft,
          clientHeight, clientWidth,
        } = this.getWrapSizes();

        this.move.x = scrollLeft * 100 / clientWidth;
        this.move.y = scrollTop * 100 / clientHeight;

        this.$emit('scroll', {
          scrollLeft,
          scrollTop,
        });
      },
      onResize() {
        this.update();
      },
      onDragStart() {
        this.store.dragging = true;
      },
      onDragEnd() {
        this.store.dragging = false;
      },
    },
    mounted() {
      this.update();
    },
    updated() {
      this.update();
    },
  }
</script>

<style lang="less">
  @ls-scrollbar-padding-column: 4px;
  @ls-scrollbar-width: 6px;

  .ls-scrollbar {
    position: relative;
    overflow: hidden;

    & &__wrap {
      overflow: scroll;
    }
    & &__thumb {
      @apply bg-positive-900;
      .ls-transition-fastest();
      position: relative;
      user-select: none;
      cursor: grab;
      transition-property: opacity;
      //background-color: @strong[strongest];

      border-radius: @ls-scrollbar-width;
      opacity: 0;
    }
    & &__bar {
      position: absolute;
      right: @ls-scrollbar-padding-column;
      bottom: @ls-scrollbar-padding-column;
      z-index: 1;
      user-select: none;

      &.is-horizontal {
        height: @ls-scrollbar-width;
        left: @ls-scrollbar-padding-column;

        & > .ls-scrollbar__thumb {
          height: 100%;
        }
      }
      &.is-vertical {
        width: @ls-scrollbar-width;
        top: @ls-scrollbar-padding-column;

        & > .ls-scrollbar__thumb {
          width: 100%;
        }
      }
    }

    &.is-dragging {
      cursor: grabbing;
    }
    &:hover {
      > .ls-scrollbar__bar {
        > .ls-scrollbar__thumb {
          opacity: .3;
        }
      }
    }
    > .ls-scrollbar__bar {

      > .ls-scrollbar__thumb {
        &:hover {
          opacity: .4;
        }
      }
      &.is-active {
        > .ls-scrollbar__thumb {
          opacity: .2;
        }
      }
    }
  }
</style>
