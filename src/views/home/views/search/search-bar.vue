<template>
  <ls-affix target=".ls-view-home-scrollbar-wrap" :offset-top="25">

    <!--搜索框-->
    <div
      class="ls-view-home-search"
      @mouseenter="onSearchMouseEnter"
      @mouseleave="onSearchMouseLeave"
    >
      <div class="ls-view-home-search__body">
        <div class="ls-view-home-search__item is-static is-prefix">
          <button
            class="ls-input__button"
            v-tooltip="popperContent"
            :class="suffixButtonClasses"
            @click="compile"
          >
            <ls-icon class="ls-view-home-search__type" name="icon-baidu" />
          </button>
        </div>
        <div class="ls-view-home-search__item is-no-space">
          <ls-input
            clearable
            auto-focus
            select-on-focus
            size="biggest"
            ref="input"
            placeholder="百度搜索"
            v-tooltip="store.search"
            v-model:value="store.search"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keydown-up="onInputKeyUp"
            @keydown-down="onInputKeyDown"
          >
            <template #suffix>
              <transition name="fade" mode="out-in">
                <button
                  class="ls-input__button"
                  v-tooltip="'加载中'"
                  v-if="loadings.searchList"
                >
                  <ls-icon name="icon-loading" />
                </button>
                <button
                  class="ls-input__button"
                  :class="suffixButtonClasses"
                  v-tooltip="'在百度搜索'"
                  v-else-if="isSearchable"
                  @click="compile"
                >
                  <ls-icon name="icon-right" />
                </button>
                <button
                  tabindex="0"
                  class="ls-input__button"
                  v-tooltip="popperContent"
                  v-else
                >
                  <ls-icon name="icon-search" />
                </button>
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
  import WebsiteCard from '<components>/business/website-card';
  //import { createSearcherList } from '<scripts>/searcher';

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
      popperContent: () => (
        <WebsiteCard v-slots={{
          title: () => <b>Baidu</b>,
          content: () => <i>Description here, to tell you what Baidu can offer.</i>,
        }}/>
      ),
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
