<template>
  <button
    class="ls-view-round-button"
    :class="{ 'is-active': active }"
    v-tooltip="tooltip"
  >
    <slot>
      <ls-icon :name="icon" v-if="icon" />
      <slot name="text">
        <span v-if="text">{{ text }}</span>
      </slot>
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'vc-round-button',
    props: {
      icon: {
        type: String,
        default: void 0,
      },
      text: {
        type: String,
        default: void 0,
      },
      tooltip: {
        type: [ String, Object ],
        default: void 0,
      },
      size: {
        type: String,
        default: 'normal',
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="less" scoped>
  @view-round-button-size--normal: 50px;

  .ls-view-round-button {
    @apply flex flex-col justify-center items-center;
    @apply transition-all;
    .ls-button-text();
    .ls-transition-fastest();
    position: relative;
    width: @view-round-button-size--normal;
    height: @view-round-button-size--normal;
    font-size: @size[big];
    color: @strong[secondary];
    background-color: transparent;
    outline: none;
    border: none;
    z-index: 1;

    &::before {
      .ls-transition-fastest();
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0;
      border-radius: @radius[circle];
      background-color: @weak[weak];
      transform: scale3d(.7, .7, 1);
    }

    &.is-active {
      color: @strong[default];
    }
    &:hover {
      opacity: 1;
      color: @strong[strong];

      &::before {
        opacity: 1;
        transform: scale3d(1, 1, 1);
        background-color: @weak[weak];
      }
    }
    &:active {
      opacity: 1;
      color: @strong[strong];

      &::before {
        opacity: 1;
        transform: scale3d(.9, .9, 1);
        background-color: @strong[placeholder];
      }
    }
  }
</style>