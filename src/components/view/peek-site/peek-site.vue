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