<template>
  <teleport to="body" :disabled="!fullscreen">
    <transition name="fade" @after-leave="onAfterLeave">
      <div
        class="ls-loading-wrap"
        v-if="visible"
        :class="wrapClasses"
        @click.stop="onClickWrap"
      >
        <div class="ls-loading-inner">
          <loading-circle />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
  import { ref, computed } from 'vue';
  import LoadingCircle from './loading-circle';

  export default {
    name: 'ls-loading',
    components: {
      LoadingCircle,
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
</style>