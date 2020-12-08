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
          <ls-icon class="ls-view-home-search__type" name="icon-baidu" />
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
                <span class="ls-input__button" v-if="loadings.searchList">
                  <ls-icon name="icon-loading" />
                </span>
                <span
                  class="ls-input__button"
                  :class="suffixButtonClasses"
                  v-else-if="isSearchable"
                  @click="compile"
                >
                  <ls-icon name="icon-right" />
                </span>
                <span class="ls-input__button" v-else>
                  <ls-icon name="icon-search" />
                </span>
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
  //import { createSandbox } from '<scripts>/sandbox';
  import { createSearcherList } from '<scripts>/searcher';

  export default {
    name: 'home-search-search-bar',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
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
      //sandbox: createSandbox('function'),
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
        const list = await createSearcherList({ input: this.store.search });
        console.log(list);


        /*try {
          const data = await this.sandbox.postMessage({
            code: this.store.search,
          });
          console.log(data);
        } catch(error) {
          console.error(error);
        }*/
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
