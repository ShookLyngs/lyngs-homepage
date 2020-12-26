<template>
  <div class="about" >
    <h1 v-loading="true">
      This is an about page
    </h1>
    <h2 v-loading="loading1">
      {{ loading1 }}
    </h2>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  export default {
    data: () =>({
      loading2: true,
    }),
    setup() {
      const loading1 = ref(false);

      onMounted(() => {
        setTimeout(() => {
          loading1.value = true;

          setTimeout(() => loading1.value = false, 1500);
        }, 500);

      });

      return {
        loading1,
      };
    },
  };
</script>
