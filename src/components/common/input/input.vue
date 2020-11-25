<template>
  <div class="ls-input" :class="classes">
    <div class="ls-input__prefix" v-if="$slots.prefix">
      <slot name="prefix" />
    </div>
    <label class="ls-input__inner">
      <input
        ref="input"
        v-bind="$attrs"
        v-model="store.value"
        :type="type"
        :disabled="disabled"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
      >
    </label>
    <div class="ls-input__suffix" v-if="$slots.suffix || isShowCloseButton">
      <span class="ls-input__button" @click="onClickClear">
        <transition name="fade">
          <ls-icon
            name="icon-no"
            v-if="isShowCloseButton"
          />
        </transition>
      </span>
      <slot name="suffix" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ls-input',
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
      clearable: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      'update:value',
      'composition-start',
      'composition-end',
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
        if (this.disabled) {
          classes.push('is-disabled');
        }

        return classes;
      },
      isShowCloseButton() {
        return this.clearable && this.store.value;
      },
    },
    methods: {

      onClickClear() {
        if (this.clearable) {
          this.store.value = '';
        }
      },
      onCompositionStart(event) {
        console.log('start', event);
        this.$emit('composition-start');
      },
      onCompositionEnd(event) {
        console.log('end', event);
        this.$emit('composition-end');
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
  };
</script>

<style scoped>

</style>