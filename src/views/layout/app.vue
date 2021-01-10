<template>
  <div class="ls-app-layout">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
    description: '标签页-主页',
  };
</script>

<style lang="less">
  body,
  html {
    @apply flex-combo w-full h-full text-positive-600 bg-negative-600;
  }

  #app {
    @apply flex-combo-col relative;
  }
  .ls-app-layout {
    @apply flex-col absolute w-full h-full;
  }
  .ls-page-layout {
    @apply flex-combo-col w-full h-full;
  }
</style>