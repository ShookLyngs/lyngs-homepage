<template>
  <!--搜索框-->
  <div class="ls-view-home-search__body">
    <div class="ls-view-home-search__item is-static is-prefix">
      <button
        class="ls-input__button"
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
        ref="input"
        size="biggest"
        placeholder="百度搜索"
        v-tooltip="store.input.search"
        v-model:value="store.input.search"
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
              v-if="store.loadings.searchList"
            >
              <ls-icon name="icon-loading" />
            </button>
            <button
              class="ls-input__button"
              :class="suffixButtonClasses"
              v-tooltip="'在百度搜索'"
              v-else-if="!!store.input.search"
              @click="compile"
            >
              <ls-icon name="icon-right" />
            </button>
            <button
              tabindex="0"
              class="ls-input__button"
              v-else
            >
              <ls-icon name="icon-search" />
            </button>
          </transition>
        </template>
      </ls-input>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  // import WebsiteCard from '<components>/business/website-card';

  export default {
    name: 'home-search-input',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
    },
    data: () => ({
      loadings: {
        searchList: false,
      },
    }),
    computed: {
      store() {
        console.log(this.$store.state);
        return this.$store.state.home.search;
      },
      suffixButtonClasses() {
        const classes = [];

        if (this.store.suggest.index === -1) {
          classes.push('is-active');
        }

        return classes;
      },
    },
    methods: {
      async compile() {
        //const list = await createSearcherList({ input: this.store.search });
        //console.log(list);
      },

      onInputFocus() {
        this.$store.commit('home/search/setInputState', {
          focus: true
        });
      },
      onInputBlur() {
        this.$store.commit('home/search/setInputState', {
          focus: false
        });
      },
      onInputKeyUp() {
        this.$store.commit('home/search/setSuggestIndex', {
          relativeIndex: -1
        });
      },
      onInputKeyDown() {
        this.$store.commit('home/search/setSuggestIndex', {
          relativeIndex: 1
        });
      },
    },
  };

</script>
