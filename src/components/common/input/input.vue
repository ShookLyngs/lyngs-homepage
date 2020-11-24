<template>
  <div class="ls-input" :class="classes">
    <label>
      <input
        class="ls-input-inner"
        ref="input"
        v-bind="$attrs"
        v-model="store.value"
        :type="type"
      >
    </label>
  </div>
</template>

<script>
  export default {
    name: "ls-input",
    props: {
      value: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      size: {
        type: String,
        default: 'small',
      },
      autoFocus: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      'update:value'
    ],
    data: () => ({
      store: {
        value: '',
      },
    }),
    computed: {
      classes() {
        const classes = [];

        if (this.size) {
          classes.push(`is-size-${this.size}`);
        }

        return classes;
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          this.store.value = value;
        },
      },
      'store.value'(value) {
        this.$emit('update:value', value);
      },
    },
    mounted() {
      if (this.autoFocus) {
        this.$nextTick(() => {
          this.$refs?.input?.focus?.();
        });
      }
    }
  }
</script>

<style scoped>

</style>