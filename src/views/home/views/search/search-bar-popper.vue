<template>
  <div class="ls-view-home-search__popper">
    <ls-collapse class="ls-view-home-search__popper__wrap" :show="show">
      <div v-loading="searchBar.loadings.searchList">
        <search-bar-list ref="search-bar-list" @update:index="onListIndexUpdate" />
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
    emits: [
      'update:index',
    ],
    data: () => ({
      show: true,
      loadings: {
        popper: true,
      },
    }),
    methods: {
      setRelativeIndex(index) {
        return accessRef(this, 'search-bar-list')?.setRelativeIndex(index);
      },

      onListIndexUpdate(index) {
        this.$emit('update:index', index);
      },
      onVisibleStateChange() {
        this.show = this.searchBar.store.focus || this.searchBar.store.enter;
      },
    },
    watch: {
      'searchBar.store.focus'() {
        this.onVisibleStateChange();
      },
      'searchBar.store.enter'() {
        this.onVisibleStateChange();
      },
    },
    mounted() {
      setTimeout(() => {
        this.loadings.popper = false;
      }, 3000);
    },
  }
</script>