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
              placeholder="百度搜索"
              v-model:value="form.search"
            >
              <template #suffix>
                <transition name="fade" mode="out-in">
                  <span class="ls-input__button" v-if="isSearchable">
                    <ls-icon name="icon-right" />
                  </span>
                  <span class="ls-input__button" v-else>
                    <ls-icon name="icon-loading" />
                  </span>
                </transition>
              </template>
            </ls-input>
          </div>
        </div>

        <!--搜索弹出层-->
        <search-bar-popper />
      </div>
    </ls-affix>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

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
    data: () => ({
      form: {
        search: '',
      },
    }),
    computed: {
      isSearchable() {
        return !!this.form.search;
      },
    },
    methods: {

    },
    mounted() {},
  };
</script>
