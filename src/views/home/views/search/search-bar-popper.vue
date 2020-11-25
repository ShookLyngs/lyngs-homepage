<template>
  <div class="ls-view-home-search__popper" ref="popper">
    <ls-collapse class="ls-view-home-search__popper__wrap" :show="show">

      <div class="ls-view-home-search-list">

      </div>

    </ls-collapse>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  export default {
    name: 'search-bar-popper',
    components: {
      LsCollapse: defineAsyncComponent(() => import('<components>/common/collapse')),
    },
    data: () => ({
      show: true,
    }),
    methods: {},
  }
</script>