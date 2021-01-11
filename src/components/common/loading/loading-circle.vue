<template>
  <div class="ls-loading-circle" :style="styles">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
    >
      <circle
        class="circle-bar"
        fill="transparent"
        :cx="2 * viewBoxSize"
        :cy="2 * viewBoxSize"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashOffset="strokeDashOffset"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'loading-circle',
    props: {
      size: {
        type: [ Number, String ],
        default: 26,
      },
      width: {
        type: [ Number, String ],
        default: 4,
      },
      value: {
        type: [ Number, String ],
        default: 0,
      },
    },
    data: () => ({
      radius: 20,
    }),
    computed: {
      circumference() {
        return 2 * Math.PI * this.radius;
      },
      normalizedValue() {
        if (this.value < 0) return 0;
        if (this.value > 100) return 100;
        return parseFloat(this.value);
      },
      strokeDashArray() {
        return Math.round(this.circumference * 1000) / 1000;
      },
      strokeDashOffset() {
        return `${((100 - this.normalizedValue) / 100) * this.circumference}px`;
      },
      strokeWidth() {
        return Number(this.width) / +this.size * this.viewBoxSize * 2;
      },
      viewBoxSize() {
        return this.radius / (1 - Number(this.width) / +this.size);
      },
      viewBox() {
        const size   = this.viewBoxSize;
        const double = this.viewBoxSize * 2;
        return `${size} ${size} ${double} ${double}`;
      },
      styles() {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`,
        };
      },
    },
  }
</script>

<style lang="less" scoped>
  .ls-loading-circle {
    @apply relative inline-block align-middle justify-center items-center;

    > svg {
      @apply transition-fast absolute w-full h-full m-auto top-0 bottom-0 left-0 right-0 z-0;
      animation: ls-rotate 1.4s linear infinite;

      > .circle-bar {
        @apply transition-fast;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-dashoffset: 0;
        stroke-dasharray: 80, 200;
        z-index: 2;
        animation: ls-loading-infinite 1.4s ease-in-out infinite;
      }
    }
  }
</style>