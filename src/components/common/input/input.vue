<template>
  <div class="ls-input" :class="classes">
    <div class="ls-input__prefix" v-if="$slots.prefix">
      <slot name="prefix" />
    </div>
    <label class="ls-input__inner">
      <ls-collapse :show="!!store.value">
        <div class="label">百度搜索</div>
      </ls-collapse>
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
        <ls-round-button
          icon="icon-no"
          tooltip="清空"
          v-if="isShowCloseButton"
          @click="onClickClear"
        />
      </transition>
      <slot name="suffix" />
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from "vue";

  export default {
    name: 'ls-input',
    components: {
      LsRoundButton: defineAsyncComponent(() => import('<components>/common/round-button')),
      LsCollapse: defineAsyncComponent(() => import('<components>/common/collapse')),
    },
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
      focusing: false,
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
        if (this.focusing) {
          classes.push('is-focus');
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
        this.focusing = true;
        if (this.selectOnFocus) {
          this.$refs.input.select();
        }
        this.$emit('focus', event);
      },
      onBlur(event) {
        this.focusing = false;
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

<style lang="less" scoped>
  .ls-input {
    @apply flex-combo items-center px-3 w-full h-full text-positive-700;

    & &__inner {
      @apply flex-combo-col justify-center h-full;

      .label {
        @apply transition-all opacity-0 text-sm text-positive-500 select-none;
        line-height: 1.6;
      }
      .is-show {
        .label {
          @apply opacity-100;
        }
      }
      & > input {
        @apply w-full text-base;
        border: none;
        outline: none;

        &::placeholder {
          @apply text-positive-400;
        }
        &[disabled] {
          opacity: .7;
          cursor: not-allowed;
          background-color: transparent;
        }
      }
    }
    & &__prefix,
    & &__suffix {
      @apply flex-static-combo h-full;
    }
    & &__prefix {
      @apply pr-3;

    }
    & &__suffix {
      @apply pl-3;
    }

    // sizes
    &.is-size-biggest {

      .ls-input__inner {

        & > input {
          @apply text-2xl font-bold;
        }
      }
      .ls-input__suffix {
        @apply items-center;
      }
    }
  }
</style>