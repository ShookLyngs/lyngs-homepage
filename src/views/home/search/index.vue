<template>
  <div class="ls-view-home__card">
    <ls-affix
      target=".ls-view-home__scrollbar-wrap"
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
      // components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      // views
      SearchInput: defineAsyncComponent(() => import('./input')),
      SearchSuggest: defineAsyncComponent(() => import('./suggest')),
    },
    data: () => ({ loading: false }),
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
    mounted() {
      setTimeout(() => this.loading = true, 200);
      setTimeout(() => this.loading = false, 1500);
    },
  };
</script>

<style lang="less">
  @view-main-search-bar-height: 80px;
  @view-search-list-item-height: 60px;

  // main search of home
  .ls-view-home-search {
    @apply relative;
    //position: relative;

    // main input
    & &__input {
      @apply flex;
      height: @view-main-search-bar-height;
      background-color: @weak[strongest];

      > .prefix {
        @apply flex-static-combo items-center;
        padding-left: @space[middle];

        .icon {
          color: @strong[strong];
          font-size: @size[huger];
        }
      }
      > .input {
        @apply flex-combo items-center;
      }
    }

    // suggest popper
    & &__popper {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 10;
      background-color: @weak[strongest];
      box-shadow: 0 3px 10px @shadow[default];

      &__wrap {
        .ls-transition-fast();
        overflow: hidden;
      }
      &__inner {
        padding: @space[middle];
      }
    }
  }

  // suggest list of search
  .ls-view-home-search-list {
    @apply flex-col;

    & &__item {
      @apply flex-static-combo items-center;
      .ls-transition-fastest();
      padding: 0 @space[big];
      height: @view-search-list-item-height;
      user-select: none;

      &__content {
        @apply flex-combo-col justify-center;
        padding: 0 @space[middle];
        color: @strong[default];
        min-height: 100%;
        box-sizing: border-box;

        > div {
          .ls-text-overflow-hidden();
        }
      }
      &__prefix,
      &__suffix {
        @apply flex-static-combo items-center;
        font-size: @size[biggest];
        color: @strong[default];
      }
      &__suffix {
        font-size: @size[big];
        color: @strong[default];
      }
      &.is-active {
        cursor: pointer;
        background-color: @weak[stronger];

      }
    }
  }
</style>
