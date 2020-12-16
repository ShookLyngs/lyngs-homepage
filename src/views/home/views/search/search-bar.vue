<template>
  <ls-affix target=".ls-view-home-scrollbar-wrap" :offset-top="25">

    <!--搜索框-->
    <div
      class="ls-view-home-search"
      @mouseenter="onSearchMouseEnter"
      @mouseleave="onSearchMouseLeave"
    >
      <div class="ls-view-home-search__body">
        <div class="ls-view-home-search__item is-static">
          <ls-popper text="在百度搜索" placement="top">
            <button
              class="ls-input__button"
              :class="suffixButtonClasses"
              @click="compile"
            >
              <ls-icon class="ls-view-home-search__type" name="icon-baidu" />
            </button>
          </ls-popper>
        </div>
        <div class="ls-view-home-search__item is-no-space">
          <ls-input
            clearable
            auto-focus
            select-on-focus
            size="biggest"
            ref="input"
            placeholder="百度搜索"
            v-model:value="store.search"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keydown-up="onInputKeyUp"
            @keydown-down="onInputKeyDown"
          >
            <template #suffix>
              <transition name="fade" mode="out-in">
                <div v-if="loadings.searchList">
                  <button class="ls-input__button">
                    <ls-icon name="icon-loading" />
                  </button>
                </div>
                <div v-else-if="isSearchable">
                  <ls-popper text="在百度搜索" placement="top">
                    <button
                      class="ls-input__button"
                      :class="suffixButtonClasses"
                      @click="compile"
                    >
                      <ls-icon name="icon-right" />
                    </button>
                  </ls-popper>
                </div>
                <div v-else>
                  <ls-popper text="前往百度" placement="top">
                    <button tabindex="0" class="ls-input__button">
                      <ls-icon name="icon-search" />
                    </button>
                  </ls-popper>
                </div>
              </transition>
            </template>
          </ls-input>
        </div>
      </div>


      <!--搜索弹出层-->
      <search-bar-popper ref="popper" @update:index="onListIndexUpdate" />
    </div>
  </ls-affix>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { accessRef } from '<util>/common/dom';
  //import { createSearcherList } from '<scripts>/searcher';

  export default {
    name: 'home-search-search-bar',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
      LsPopper: defineAsyncComponent(() => import('<components>/common/popper')),
      // views
      SearchBarPopper: defineAsyncComponent(() => import('./search-bar-popper')),
    },
    provide() {
      return {
        searchBar: this,
      };
    },
    data: () => ({
      store: {
        type: 'baidu',
        search: '',
        focus: false,
        enter: false,
        index: -1,
      },
      loadings: {
        searchList: false,
      },
    }),
    computed: {
      isSearchable() {
        return !!this.store.search;
      },
      suffixButtonClasses() {
        const classes = [];

        if (this.store.index === -1) {
          classes.push('is-active');
        }

        return classes;
      },
    },
    methods: {
      // proactive
      async compile() {
        //const list = await createSearcherList({ input: this.store.search });
        //console.log(list);
      },
      setPopperRelativeIndex(index) {
        return accessRef(this, 'popper')?.setRelativeIndex(index);
      },

      // passive

      onInputFocus() {
        this.store.focus = true;
      },
      onInputBlur() {
        this.store.focus = false;
      },
      onInputKeyUp() {
        this.setPopperRelativeIndex(-1);
      },
      onInputKeyDown() {
        this.setPopperRelativeIndex(1);
      },
      onListIndexUpdate(index) {
        this.store.index = index;
      },
      onSearchMouseEnter() {
        this.store.enter = true;
      },
      onSearchMouseLeave() {
        this.store.enter = false;
      },
    },
  };

</script>
