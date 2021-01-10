<template>
  <div class="bc-peek-site">
    <iframe :src="url" frameborder="0" />
  </div>
</template>

<script>
  export default {
    name: 'bc-website-card',
    props: {
      url: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="less" scoped>
  .bc-peek-site {

    iframe {
      width: 320px;
      height: 180px;
      overflow: initial;
    }
  }
</style>