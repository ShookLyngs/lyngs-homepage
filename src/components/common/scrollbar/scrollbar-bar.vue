<template>
  <div class="ls-scrollbar__bar" :class="barClasses" @mousedown="onMouseDownBar">
    <div class="ls-scrollbar__thumb" :style="thumbStyle" @mousedown.stop="onMouseDownThumb" />
  </div>
</template>

<script>
  import { on } from '<util>/common/dom';
  export default {
    name: "ls-scrollbar-bar",
    props: {
      direction: {
        type: String,
        default: 'vertical',
        validator: value => [ 'vertical', 'horizontal' ].includes(value)
      },
      size: {
        type: String,
        default: void 0,
      },
      move: {
        type: Number,
        default: 0,
      },
    },
    data: () => ({
      dragging: false,
      event: {
        mouseover: null,
        mouseup: null,
      },
      store: null,
      map: {
        vertical: {

        },
        horizontal: {

        },
      },
    }),
    emits: [],
    computed: {
      axis() {
        return this.direction === 'vertical' ? 'y' : 'x';
      },
      barClasses() {
        const classes = [];

        if (this.direction) {
          classes.push(`is-${this.direction}`);
        }

        return classes;
      },
      thumbStyle() {
        const axis      = this.axis,
              direction = ({ x: 'width', y: 'height' })[axis],
              translate = ({ x: 'translateX', y: 'translateY' })[axis];

        return {
          [direction]: this.size,
          transform: `${translate}(${this.move}%)`,
        };
      },
    },
    methods: {
      // proactive
      update() {},
      addGlobalListeners() {
        this.event.mouseover = on(document, 'mouseover', this.onGlobalMouseOver);
        this.event.mouseup = on(document, 'mouseup', this.onGlobalMouseUp);
      },
      removeGlobalListeners() {
        if (this.event.mouseover?.remove) {
          this.event.mouseover.remove();
        }
        if (this.event.mouseup?.remove) {
          this.event.mouseup.remove();
        }
      },

      // passive
      onMouseDownBar(event) {
        console.log(event);
      },
      onMouseDownThumb(event) {
        console.log('down', event);
        if (event.ctrlKey || event.button === 2) {
          return;
        }
        this.dragging = true;
        this.addGlobalListeners();
      },
      onGlobalMouseOver(event) {
        console.log('over', event);

        if (!this.dragging) {
          return;
        }


      },
      onGlobalMouseUp(event) {
        console.log('up', event);
        this.removeGlobalListeners();
        this.dragging = false;
      },
    },
  }
</script>