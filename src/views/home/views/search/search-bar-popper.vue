<template>
  <div class="ls-view-home-search__popper">
    <ls-collapse class="ls-view-home-search__popper__wrap" :show="show">
      <search-bar-list ref="search-bar-list" />
    </ls-collapse>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import SearchBarList from './search-bar-list';
  export default {
    name: 'search-bar-popper',
    components: {
      // components
      LsCollapse: defineAsyncComponent(() => import('<components>/common/collapse')),
      // views
      SearchBarList,
      //SearchBarList: defineAsyncComponent(() => import('./search-bar-list')),
    },
    inject: [
      'searchBar'
    ],
    data: () => ({
      show: true,
    }),
    methods: {
      setSearchListIndex(index) {
        if (this.$refs['search-bar-list']) {
          this.$refs['search-bar-list'].setRelativeIndex(index);
        }
      },
    },
    watch: {
      'searchBar.form.focus'(value) {
        this.show = value;
      },
    },
  }
</script>