<script>
  import LsResizeObserver from '<components>/container/resize-observer';
  export default {
    name: "ls-affix",
    components: {
      LsResizeObserver
    },
    props: {

    },
    setup() {
      const onResize = size => {
        console.log(size);
      };

      return {
        onResize,
      };
    },
  }
</script>

<template>
  <ls-resize-observer @resize="onResize">
    <div>
      <slot></slot>
    </div>
  </ls-resize-observer>
</template>