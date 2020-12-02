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
  //import { compileFunction } from '<util>/common/eval';
  //import { evaluate } from 'mathjs';
  //import sandbox from '<scripts>/sandbox';

  export default {
    name: 'home-search-search-bar',
    description: 'the main search-bar.',
    components: {
      // common-components
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
      // views
      SearchBarPopper: defineAsyncComponent(() => import('./search-bar-popper'))
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
      //iframe: require('<scripts>/sandbox/iframes/eval.html'),
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

        /*console.log(sandbox);

        sandbox.postMessage({
          code: this.store.search,
        }).then((data) => {
          console.log(data);
        });*/

        //const result = await new Promise(resolve => resolve(evaluate(this.store.search)));
        //console.log(result);

        try {
          //console.log(evaluate(this.store.search));
          //compileFunction({}, `(()=>{}).constructor('return eval')()('prompt()')`);
          //compileFunction({ console }, "console.log(this.constructor.constructor('return top')().close())")
          //compileFunction({ console }, "console.log(this.constructor.constructor(\"return process\")())");
          //console.log(compileFunction({}, `return ${this.store.search};`));
        } catch(error) {
          console.log(error);
        }
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
    mounted() {
      /*const codeProxies = new WeakMap();
      const compile = (content) => {
        const code = new Function('context', `
          with(context) {
            return (function() { ${content} }).call({});
          }
        `);

        return (data) => {
          if (!codeProxies.has(data)) {
            codeProxies.set(data, new Proxy(data, {
              has: () => true,
              get: (target, key) => key === Symbol.unscopables ? void 0 : target[key],
            }));
          }
          return code(codeProxies.get(data));
        };
      };

      const result = compile(`
        console.log(this, window, process, document);
        console.log(name, compile);
        return function() {
          console.log(window);
        };
      `)({
        name: 'shook',
        console,
      });

      console.log(result());*/
    },
  };

</script>
