<template>
  <teleport to="body" :disabled="!fullscreen">
    <transition name="fade" @after-leave="onAfterLeave">
      <div
        class="ls-loading-wrap"
        v-show="visible"
        :class="wrapClasses"
        @click.stop="onClickWrap"
      >
        <div class="ls-loading-inner">
          <svg class="ls-loading-progress">
            <circle cx="70" cy="70" r="70" />
          </svg>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
  import { ref, computed } from 'vue';
  //import LsIcon from '<components>/common/icon';

  export default {
    name: 'ls-loading',
    components: {
      //LsIcon,
    },
    emits: [
      'after-leave',
      'click-wrap',
    ],
    setup(props, { emit }) {
      // refs
      const text = ref('');
      const theme = ref('');
      const visible = ref(true);
      const fullscreen = ref(false);

      // computed
      const wrapClasses = computed(() => {
        const classes = [];

        if (fullscreen.value) {
          classes.push('is-fullscreen');
        }
        if (theme.value) {
          classes.push(`is-theme-${theme.value}`);
        }

        return classes;
      });

      // proactive
      const setText = (value) => {
        text.value = value;
      };
      const setTheme = (value) => {
        theme.value = value;
      };
      const setVisible = (value) => {
        visible.value = value;
      };
      const setFullscreen = (value) => {
        fullscreen.value = value;
      };

      // passive
      const onAfterLeave = () => emit('after-leave');
      const onClickWrap = () => emit('click-wrap');

      return {
        text,
        visible,
        fullscreen,

        wrapClasses,

        setText,
        setTheme,
        setVisible,
        setFullscreen,
        onAfterLeave,
        onClickWrap,
      };
    },
  };
</script>

<style lang="less" scoped>
  .ls-loading-wrap {
    @apply flex justify-center items-center;
    @apply absolute w-full h-full left-0 top-0;
    @apply overflow-hidden z-10;
    background-color: rgba(255, 255, 255, .7);

    .ls-loading-inner {
      .ls-icon {
        @apply text-2xl;
        //font-size: @size[bigger];
      }
    }
  }
  .ls-loading-edge {
    @apply overflow-hidden;
  }
  .ls-loading-progress {
    @apply relative;
    width: 160px;
    height: 160px;
    animation: ls-rotate 2s linear infinite;

    circle {
      @apply w-full h-full;
      fill: none;
      stroke: theme('colors.positive[600]');
      stroke-width: 20;
      stroke-linecap: round;
      stroke-dasharray: 440;
      stroke-dashoffset: 440;
      transform: translate3d(10px, 10px, 0);
      animation: ls-loading-infinite 4s linear infinite;
    }
  }
</style>