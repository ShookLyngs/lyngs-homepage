<template>
  <ls-scrollbar disabled-horizontal view-max-height="200px">
    <div class="ls-view-home-search-list" @mouseleave="setIndex(-1)">
      <search-bar-list-item
        v-for="(item, index) in result.list"
        :key="index"
        :item="item"
        :active="result.index === index"
        @mouse-enter="setIndex(index)"
      />
    </div>
  </ls-scrollbar>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { delayThrottle } from '<util>/common/event';
  import { createSearcherList } from '<scripts>/searcher';

  export default {
    name: 'search-bar-list',
    components: {
      // components
      //LsIcon: defineAsyncComponent(() => import('<components>/common/icon')),
      LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
      // views
      SearchBarListItem: defineAsyncComponent(() => import('./search-bar-list-item')),
    },
    inject: [
      'searchBar'
    ],
    emits: [
      'update:index'
    ],
    data: () => ({
      store: {
        search: '',
      },
      format: {
        list: [
          {
            prefix: 'icon-guge',
            content: '谷歌搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-juejin',
            content: '掘金搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-guge',
            content: '谷歌搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-juejin',
            content: '掘金搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-guge',
            content: '谷歌搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-juejin',
            content: '掘金搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-guge',
            content: '谷歌搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-juejin',
            content: '掘金搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-guge',
            content: '谷歌搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
          {
            prefix: 'icon-juejin',
            content: '掘金搜索 「{content}」',
            href: 'https://www.baidu.com/s?wd={content}'
          },
        ],
      },
      result: {
        index: -1,
        list: [],
      },
    }),
    methods: {
      update() {
        if (this.store.search) {
          this.setLoadingList();
          this.fetchList();
        } else {
          this.result.list = [];
        }
      },
      async fetchList() {
        this.setLoading('searchList', true);

        this.result.list = await createSearcherList({ input: this.store.search });
        console.log(this.result.list);

        this.setLoading('searchList', false);

        /*setTimeout(() => {
          this.setLoading('searchList', false);
          if (search) {
            this.result.list = this.translateList([].concat(this.format.list), search);
          } else {
            this.result.list = [];
          }
        }, 500);*/
      },
      setLoadingList() {
        this.result.list = this.translateList([].concat(this.format.list), '...');
      },

      setLoading(name, value) {
        if (this.searchBar?.loadings?.[name] !== void 0) {
          this.searchBar.loadings[name] = value;
        }
      },
      translateContent(content, replaces) {
        for (const key in replaces) {
          if (!Object.prototype.hasOwnProperty.call(replaces, key)) continue;
          content = content.replace(`{${key}}`, replaces[key]);
        }
        return content;
      },
      translateList(list, search) {
        return list.map((item) => {
          return Object.assign({}, item, {
            content: this.translateContent(item.content, {
              content: search,
            })
          });
        });
      },

      setRelativeIndex(index) {
        this.result.index += index;
        this.fixIndex();
      },
      setIndex(index) {
        this.result.index = index;
        this.fixIndex();
      },
      fixIndex() {
        const index = this.result.index;
        if (index >= this.result.list.length) {
          this.result.index = -1;
        } else if (index < -1) {
          this.result.index = this.result.list.length + index + 1;
        } else {
          this.result.index = index;
        }
      },

      listItemClasses(item, index) {
        const classes = [];

        if (this.result.index === index) {
          classes.push('is-active');
        }

        return classes;
      },
    },
    watch: {
      'searchBar.store.search'(value) {
        this.store.search = value;
        this.update();
      },
      'result.index'(value) {
        this.$emit('update:index', value);
      }
    },
    beforeMount() {
      this.update = delayThrottle(this.update, 200);
    },
  }
</script>