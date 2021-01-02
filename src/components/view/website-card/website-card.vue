<template>
  <div class="bc-website-card">
    <div class="header">
      <div class="avatar">
        <slot name="avatar" />
      </div>
      <div>
        <div class="title">
          <slot name="title" />
        </div>
        <div class="content">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bc-website-card',
    props: {
      title: {
        type: [ String ],
        default: '',
      },
      content: {
        type: [ String ],
        default: '',
      },
    },
  }
</script>