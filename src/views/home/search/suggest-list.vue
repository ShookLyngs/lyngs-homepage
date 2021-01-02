<template>
  <ls-scrollbar disabled-horizontal view-max-height="200px">
    <div
      class="ls-view-home-search-list"
      @mouseleave="setIndex(-1)"
    >
      <search-suggest-list-item
        v-for="(item, index) in store.suggest.list"
        :key="index"
        :item="item"
        :active="store.suggest.index === index"
        @mouse-enter="setIndex(index)"
      />
    </div>
  </ls-scrollbar>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { delayThrottle } from '<util>/common/event';

  export default {
    name: 'home-search-suggest-list',
    components: {
      // components
      LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
      // views
      SearchSuggestListItem: defineAsyncComponent(() => import('./suggest-list-item')),
    },
    computed: {
      store() {
        return this.$store.state.home.search;
      },
    },
    methods: {
      update() {
        this.$store.dispatch('home/search/updateSuggestList');
      },
      setIndex(index) {
        this.$store.commit('home/search/setSuggestIndex', {
          index,
        });
      },
    },
    watch: {
      'store.input.search'() {
        this.update();
      },
    },
    beforeMount() {
      this.update = delayThrottle(this.update, 200);
    },
  }
</script>