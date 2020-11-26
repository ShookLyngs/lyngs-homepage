<template>
  <div class="ls-view-home-search__popper">
    <ls-collapse class="ls-view-home-search__popper__wrap" :show="show">
      <div>
        <search-bar-list ref="search-bar-list" />
      </div>
    </ls-collapse>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { accessRef } from '<util>/common/dom';

  export default {
    name: 'search-bar-popper',
    components: {
      // components
      LsCollapse: defineAsyncComponent(() => import('<components>/common/collapse')),
      // views
      SearchBarList: defineAsyncComponent(() => import('./search-bar-list')),
    },
    inject: [
      'searchBar'
    ],
    data: () => ({
      show: true,
    }),
    methods: {
      setRelativeIndex(index) {
        accessRef(this, 'search-bar-list')?.setRelativeIndex(index);
      },
    },
    watch: {
      'searchBar.form.focus'(value) {
        this.show = value;
      },
    },
  }
</script>