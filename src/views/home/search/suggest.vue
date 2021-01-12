<template>
  <div class="ls-view-home-search__popper">
    <ls-collapse class="ls-view-home-search__popper__wrap" :show="isShowSuggest">
      <div class="relative" v-loading="isSuggestLoading">
        <suggest-list ref="search-bar-list" />
      </div>
    </ls-collapse>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  export default {
    name: 'home-search-suggest',
    components: {
      // components
      LsCollapse: defineAsyncComponent(() => import('<components>/common/collapse')),
      // views
      SuggestList: defineAsyncComponent(() => import('./suggest-list')),
    },
    computed: {
      store() {
        return this.$store.state.home.search;
      },
      isShowSuggest() {
        const { focus, enter } = this.store.input;
        return focus || enter;
      },
      isSuggestLoading() {
        return this.$store.getters['home/search/isSuggestLoading'];
      },
    },
  }
</script>