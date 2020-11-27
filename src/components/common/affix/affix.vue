<template>
  <ls-resize-observer @resize="onResize">
    <div class="ls-affix" ref="container" :class="containerClasses">
      <!--inner-->
      <div ref="inner" :style="innerStyles">
        <slot />
      </div>

      <!--stand, to keep space while inner is in fixed state-->
      <div :style="standStyles" />
    </div>
  </ls-resize-observer>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { on, off, getTargetRect } from '<util>/common/dom';
  import { animationFrameThrottle } from '<util>/common/event';
  import { getScroll, getOffset } from './util';

  export default {
    name: "ls-affix",
    components: {
      LsResizeObserver: defineAsyncComponent(() => import('<components>/common/resize-observer'))
    },
    props: {
      offset: {
        type: Object,
        default: void 0,
      },
      offsetTop: {
        type: [ Number, String ],
        default: void 0,
      },
      offsetBottom: {
        type: [ Number, String ],
        default: void 0,
      },
      target: {
        type: [ Object, String ],
        default: void 0,
      },
    },
    emits: [ 'change' ],
    data() {
      return {
        fixed: false,
        standStyles: {},
        innerStyles: {},
      };
    },
    computed: {
      offsetType() {
        return this.offsetBottom ? 'bottom' : 'top';
      },
      containerClasses() {
        const classes = [];

        if (this.fixed === true) {
          classes.push('is-fixed');
        }

        return classes;
      },
    },
    methods: {

      // proactive

      getTarget() {
        const target = this.target;

        if (target && typeof target === 'string') {
          return document.querySelector(target);
        }
        return this.target ?? window;
      },
      prepare() {
        this.fixed = false;
        this.standStyles = {};
        this.innerStyles = {};
        this.$forceUpdate();
      },
      update() {
        const target            = this.getTarget(),
              containerOffset   = getOffset(this.$refs.container, target),
              windowScrollTop   = getScroll(target).scrollTop,
              //windowHeight    = window.innerHeight,
              innerRect         = getTargetRect(this.$refs.inner),
              containerRect     = getTargetRect(this.$refs.container),
              topDifference     = containerOffset.top - this.offsetTop;

        // fixed at top
        if (this.offsetType === 'top') {
          if (topDifference < windowScrollTop && this.fixed === false) {
            this.fixed = true;
            this.standStyles = {
              width: `${innerRect.width}px`,
              height: `${innerRect.height}px`,
            };
            this.innerStyles = {
              top: `${this.offsetTop}px`,
              left: `${containerOffset.left}px`,
              width: `${containerRect.width}px`,
              position: 'fixed',
            };

            this.$emit('change', true);

          } else if (topDifference > windowScrollTop && this.fixed === true) {
            this.fixed = false;
            this.standStyles = {};
            this.innerStyles = {};

            this.$emit('change', false);
          }
        }
      },
      on(target) {
        on(target ?? this.getTarget(), 'scroll', this.update);

        this.$nextTick(() => {
          if (this.$refs.container && this.$refs.inner) {
            this.update();
          }
        });
      },
      off(target) {
        off(target ?? this.getTarget(), 'scroll', this.update);
      },

      // passive

      onResize() {
        this.prepare();
      },
    },
    watch: {
      target(target, oldTarget) {
        this.off(oldTarget);
        this.on();
      },
    },
    beforeMount() {
      this.update = animationFrameThrottle(this.update);
    },
    updated() {
      this.update();
    },
    mounted() {
      this.on();
    },
    beforeUnmount() {
      this.off();
    },
  }
</script>