<template>
  <div class="ls-view-home-layout">
    <div class="ls-view-home-container">
      <ls-row row-gutter="bigger">
        <ls-column span="6" small="24" smaller="24">
          <div class="ls-view-home-card" style="height: 2000px;">left</div>
        </ls-column>
        <ls-column span="12" small="24" smaller="24">
          <search></search>
          <div class="ls-view-home-card">center</div>
        </ls-column>
        <ls-column span="6" small="24" smaller="24">
          <div class="ls-view-home-card">right</div>
        </ls-column>
      </ls-row>
    </div>
  </div>
</template>

<script>
// services
import { defineAsyncComponent } from 'vue';
export default {
  name: 'Home',
  components: {
    // public-components
    LsRow: defineAsyncComponent(() => import('<components>/common/row')),
    LsColumn: defineAsyncComponent(() => import('<components>/common/column')),
    // parts
    Search: defineAsyncComponent(() => import('./parts/search')),
  },
}
</script>
