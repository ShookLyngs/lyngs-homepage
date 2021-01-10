<template>
  <ls-scrollbar
    disabled-horizontal
    class="ls-view-home__scrollbar"
    wrap-class="ls-view-home__scrollbar-wrap"
    view-class="ls-view-home__layout"
    view-max-height="100%"
  >
    <div class="ls-view-home__container">
      <div class="xl:w-3/12 xl:order-1 md:w-1/2 w-full order-2 px-3 box-border">
        <div class="ls-view-home__card" style="height: 2000px;">
          left
        </div>
      </div>
      <div class="xl:w-6/12 xl:order-2 w-full order-1 px-3 box-border">
        <search />
        <usual-sites />
        <div class="ls-view-home__card">
          center
        </div>
      </div>
      <div class="xl:w-3/12 md:w-1/2 w-full order-3 px-3 box-border">
        <div class="ls-view-home__card">
          right
        </div>
      </div>
    </div>
  </ls-scrollbar>
</template>

<script>
// services
import { defineAsyncComponent } from 'vue';
export default {
  name: 'home',
  components: {
    // public-components
    //LsRow: defineAsyncComponent(() => import('<components>/common/row')),
    //LsColumn: defineAsyncComponent(() => import('<components>/common/column')),
    LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
    // views
    Search: defineAsyncComponent(() => import('./search')),
    UsualSites: defineAsyncComponent(() => import('./usual-sites')),
  },
}
</script>

<style lang="less">
  .ls-view-home {
    &__scrollbar {
      @apply flex-combo-col;
    }
    &__layout {
      @apply flex-combo-col items-center;
    }
    &__container {
      @apply container flex flex-wrap 2xl:max-w-screen-xl;
      padding: 75px 0;
    }
    &__card {
      @apply bg-negative-900 dark:bg-black;
    }
  }
</style>
