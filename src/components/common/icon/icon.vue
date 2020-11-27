<template>
  <template v-if="type === 'svg'">
    <svg class="ls-icon ls-icon-svg" aria-hidden="true" :class="name + '-svg'">
      <use :xlink:href="'#' + name" />
    </svg>
  </template>
  <template v-else-if="type === 'css'">
    <span class="ls-icon iconfont ls-icon-css" :class="name" />
  </template>
</template>

<script>
  import './src/iconfont.js';
  import './src/iconfont.css';
  export default {
    name: 'ls-icon',
    props: {
      type: {
        type: String,
        default: 'svg',
      },
      name: {
        type: String,
        default: '',
      }
    },
  };
</script>