<template>
  <button class="ls-view-round-button" v-tooltip="tooltip">
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
    },
  }
</script>