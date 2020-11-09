<script>
  import { defineAsyncComponent } from 'vue';
  //import { getTargetRect } from '<util>/common/dom';

  const AffixStatus = {
    None: Symbol(),
    Ready: Symbol(),
  };

  export default {
    name: "ls-affix",
    components: {
      LsResizeObserver: defineAsyncComponent(() => import('<components>/container/resize-observer'))
    },
    props: {
      offsetTop: {
        type: [ Number, String ],
        default: void 0,
      },
      offsetBottom: {
        type: [ Number, String ],
        default: void 0,
      },
    },
    data() {
      return {
        status: AffixStatus.None,
        containerStyles: {},
        fixedStyles: {},
      };
    },
    methods: {
      readyUpdate() {

      },
      updateStyles() {

      },
      onResize(sizes) {
        console.log('text', sizes);
      },
    },
    beforeMount() {

    },
  }
</script>

<template>
  <ls-resize-observer @resize="onResize">
    <div :style="containerStyles" ref="container">
      <div :style="fixedStyles" ref="fixed">
        <slot/>
      </div>
    </div>
  </ls-resize-observer>
</template>