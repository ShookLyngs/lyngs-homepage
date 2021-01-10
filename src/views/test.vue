<template>
  <div class="test">
    <h1>
      This is an about page
    </h1>
    <div v-loading="true">
      <button @click="switchTheme">
        switch
      </button>
    </div>
  </div>
</template>

<script>
  import { useTheme } from "<provides>/theme";

  export default {
    data: () =>({
      loading: true,
    }),
    setup() {
      const switchTheme = () => {
        useTheme('dark');
      };

      return {
        switchTheme,
      };
    },
  };
</script>

<style lang="less" scoped>
  .test {
    @apply bg-negative-900;
  }
</style>
