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
        <ls-column span="6" small="24" smaller="24">
          <div class="ls-view-home-card" style="height: 2000px;">
            left
          </div>
        </ls-column>
        <ls-column span="12" small="24" smaller="24">
          <search />
          <usual-sites />
          <div class="ls-view-home-card">
            center
          </div>
        </ls-column>
        <ls-column span="6" small="24" smaller="24">
          <div class="ls-view-home-card">
            right
          </div>
        </ls-column>
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
    LsColumn: defineAsyncComponent(() => import('<components>/common/column')),
    LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
    // views
    Search: defineAsyncComponent(() => import('./views/search/search')),
    UsualSites: defineAsyncComponent(() => import('./views/usual-sites/usual-sites')),
  },
}
</script>
