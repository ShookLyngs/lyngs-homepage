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
          <ls-icon name="icon-loading" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
  import { ref, computed } from 'vue';
  import LsIcon from '<components>/common/icon';

  export default {
    name: 'ls-loading',
    components: {
      LsIcon,
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