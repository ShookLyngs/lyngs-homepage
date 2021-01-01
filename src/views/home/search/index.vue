<template>
  <div class="ls-view-home-card">
    <ls-affix
      target=".ls-view-home-scrollbar-wrap"
      :offset-top="25"
    >
      <div
        class="ls-view-home-search"
        @mouseenter="onSearchMouseEnter"
        @mouseleave="onSearchMouseLeave"
      >
        <!--搜索框-->
        <search-input />
        <!--搜索弹出层-->
        <search-suggest />
      </div>
    </ls-affix>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  export default {
    name: 'home-search',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      // views
      SearchInput: defineAsyncComponent(() => import('./input')),
      SearchSuggest: defineAsyncComponent(() => import('./suggest')),
    },
    methods: {
      onSearchMouseEnter() {
        this.$store.commit('home/search/setInputState', {
          enter: true
        });
      },
      onSearchMouseLeave() {
        this.$store.commit('home/search/setInputState', {
          enter: false
        });
      },
    },
  };
</script>
