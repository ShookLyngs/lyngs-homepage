<template>
  <!--搜索框-->
  <div class="ls-view-home-search__input" :class="classes">
    <div class="prefix">
      <ls-round-button
        class="icon"
        icon="icon-baidu"
        tooltip="设置默认搜索引擎"
        @click="openEnginePicker"
      />
    </div>
    <div class="input">
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
            <ls-round-button
              icon="icon-loading"
              tooltip="加载中"
              v-if="store.loadings.suggestList"
            />
            <ls-round-button
              icon="icon-right"
              tooltip="在百度搜索"
              v-else-if="!!store.input.search"
              @click="compile"
            />
            <ls-round-button
              tabindex="0"
              icon="icon-search"
              tooltip="在百度搜索"
              v-else
            />
          </transition>
        </template>
      </ls-input>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  export default {
    name: 'home-search-input',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
      LsRoundButton: defineAsyncComponent(() => import('<components>/common/round-button')),
    },
    computed: {
      store() {
        return this.$store.state.home.search;
      },
      classes() {
        const classes = [];

        if (this.store.suggest.index === -1) {
          classes.push('is-active');
        }

        return classes;
      },
    },
    methods: {
      compile() {},
      openEnginePicker() {},

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
