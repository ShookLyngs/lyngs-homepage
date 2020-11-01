<template>
  <div class="ls-page-layout">
    <ls-row>
      <ls-column span="12">
        <ls-row>
          <ls-column span="12"><div>home-page1</div></ls-column>
          <ls-column span="12"><div>home-page1</div></ls-column>
        </ls-row>
      </ls-column>
      <ls-column span="12">
        <div>home-page2</div>
      </ls-column>
    </ls-row>
  </div>
</template>

<script>
// services
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Home',
  components: {
    // public-components
    LsRow: defineAsyncComponent(() => import('<components>/common/layout/grid/row.vue')),
    LsColumn: defineAsyncComponent(() => import('<components>/common/layout/grid/column.vue')),
  },
}
</script>
