<template>
  <transition name="loading-fade" @after-leave="onAfterLeave">
    <div
      class="ls-loading-wrap"
      v-show="visible"
      :class="wrapClasses"
    >
      <div class="ls-loading-inner">
        <ls-icon name="icon-loading" />
      </div>
    </div>
  </transition>
</template>

<script>
  import { ref, computed } from 'vue';

  export default {
    name: 'ls-loading',
    emits: [
      'after-leave',
    ],
    setup(props, { emit }) {
      // refs
      const text = ref('');
      const visible = ref(false);
      const fullscreen = ref(false);

      // computed
      const wrapClasses = computed(() => {
        const classes = [];

        if (fullscreen.value) {
          classes.push('is-fullscreen');
        }

        return classes;
      });

      // methods
      const onAfterLeave = () => emit('after-leave');
      const setText = (value) => {
        text.value = value;
      };

      return {
        text,
        visible,
        fullscreen,

        wrapClasses,

        onAfterLeave,
        setText,
      };
    },
  };
</script>