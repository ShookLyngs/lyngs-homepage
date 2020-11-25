<template>
  <transition name="fade" mode="out-in">
    <icon-wrap></icon-wrap>
  </transition>
</template>

<script>
  import IconWrap from './icon';
  export default {
    name: 'icon-wrap',
    components: {
      IconWrap,
    },
    props: {
      name: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      store: {

      },
    }),
    watch: {
      name: {
        immediate: true,
        handler(value, oldValue) {
          if (value && value !== oldValue && oldValue !== '') {

          }
        },
      },
    },
  }
</script>

<style scoped>
  
</style>