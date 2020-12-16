<template>
  <div class="ls-app-layout">
    <router-view />
  </div>
  <ls-virtual-popper text="test" />
</template>

<script>
  import LsVirtualPopper from '<components>/common/virtual-popper';

  export default {
    name: 'app',
    description: '标签页-主页',
    components: {
      LsVirtualPopper,
    },
    data() {
      return {};
    },
  };
</script>
