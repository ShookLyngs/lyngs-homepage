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
        @keydown.up.prevent="onKeyUp"
        @keydown.down.prevent="onKeyDown"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @focus="onFocus"
        @blur="onBlur"
      >
    </label>
    <div class="ls-input__suffix" v-if="$slots.suffix || isShowCloseButton">
      <transition name="fade">
        <button
          v-tooltip="'清空输入框'"
          class="ls-input__button"
          v-if="isShowCloseButton"
          @click="onClickClear"
        >
          <ls-icon name="icon-no" />
        </button>
      </transition>
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
      selectOnFocus: {
        type: Boolean,
        default: false,
      },
    },
    emits: [
      'update:value',
      'keydown-up',
      'keydown-down',
      'composition-start',
      'composition-end',
      'focus',
      'blur'
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
      focus() {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      },

      onClickClear() {
        if (this.clearable) {
          this.store.value = '';
          this.focus();
        }
      },
      onKeyUp() {
        console.log('up');
        this.$emit('keydown-up');
      },
      onKeyDown() {
        console.log('down');
        this.$emit('keydown-down');
      },
      onCompositionStart() {
        this.$emit('composition-start');
      },
      onCompositionEnd() {
        this.$emit('composition-end');
      },
      onFocus(event) {
        if (this.selectOnFocus) {
          this.$refs.input.select();
        }
        this.$emit('focus', event);
      },
      onBlur(event) {
        this.$emit('blur', event);
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