<template>
  <ls-scrollbar
    disabled-horizontal
    class="ls-view-home-scrollbar"
    wrap-class="ls-view-home-scrollbar-wrap"
    view-class="ls-view-home-layout"
    view-max-height="100%"
  >
    <div class="ls-view-home-container">
      <ls-row row-gutter="bigger">
        <div class="lg:w-3/12 lg:order-1 sm:w-full sm:order-2">
          <div class="ls-view-home-card" style="height: 2000px;">
            left
          </div>
        </div>
        <div class="lg:w-6/12 lg:order-2 sm:w-full sm:order-1">
          <search />
          <usual-sites />
          <div class="ls-view-home-card">
            center
          </div>
        </div>
        <div class="lg:w-3/12 lg:order-3 sm:w-full sm:order-3">
          <div class="ls-view-home-card">
            right
          </div>
        </div>
      </ls-row>
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
    LsRow: defineAsyncComponent(() => import('<components>/common/row')),
    //LsColumn: defineAsyncComponent(() => import('<components>/common/column')),
    LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
    // views
    Search: defineAsyncComponent(() => import('./search')),
    UsualSites: defineAsyncComponent(() => import('./usual-sites')),
  },
}
</script>
