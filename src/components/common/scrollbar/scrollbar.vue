<template>
  <div class="ls-scrollbar">
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
    />
    <ls-scrollbar-bar
      direction="horizontal"
      :size="size.width"
      :move="move.x"
      v-if="!disabledHorizontal"
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
    emits: [
      'scroll'
    ],
    computed: {
      wrap() {
        return this.$refs.wrap;
      },
      gutterWithUnit() {
        return this.store.gutter ? `-${this.store.gutter}px` : null;
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
    },
    mounted() {
      this.update();
    },
    updated() {
      this.update();
    },
  }
</script>
