<template>
  <div class="ls-view-home-card">
    <ls-affix :offset-top="25">

      <!--搜索框-->
      <div class="ls-view-home-search">
        <div class="ls-view-home-search__body">
          <div class="ls-view-home-search__item is-static">
            <ls-icon class="ls-view-home-search__type" name="icon-baidu" />
          </div>
          <div class="ls-view-home-search__item is-no-space">
            <ls-input
              clearable
              auto-focus
              size="biggest"
              ref="input"
              placeholder="百度搜索"
              v-model:value="form.search"
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
                  <span class="ls-input__button" v-else-if="isSearchable">
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
        <search-bar-popper ref="popper" />
      </div>
    </ls-affix>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  //import SearchBarPopper from './search-bar-popper';

  export default {
    name: 'home-search-search-bar',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
      // views
      //SearchBarPopper,
      SearchBarPopper: defineAsyncComponent(() => import('./search-bar-popper'))
    },
    provide() {
      return {
        searchBar: this,
      };
    },
    data: () => ({
      form: {
        type: 'baidu',
        search: '',
        focus: false,
      },
      loadings: {
        searchList: false,
      },
    }),
    computed: {
      isSearchable() {
        return !!this.form.search;
      },
    },
    methods: {
      setPopperRelativeIndex(index) {
        console.log(this.$refs.popper);
        if (this.$refs.popper.$refs.popper) {
          this.$refs.popper.$refs.popper.setSearchListIndex(index);
        }
      },

      onInputFocus() {
        this.form.focus = true;
      },
      onInputBlur() {
        this.form.focus = false;
      },
      onInputKeyUp() {
        this.setPopperRelativeIndex(-1);
      },
      onInputKeyDown() {
        this.setPopperRelativeIndex(1);
      },
    },
    mounted() {},
  };
</script>
