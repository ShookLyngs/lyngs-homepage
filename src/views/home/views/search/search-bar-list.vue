<template>
  <ls-scrollbar disabled-horizontal view-max-height="200px">
    <div class="ls-view-home-search-list" @mouseleave="setIndex(-1)">
      <div
        class="ls-view-home-search-list__item"
        v-for="(item, index) in result.list"
        :key="index"
        :class="listItemClasses(item, index)"
        @mouseenter="setIndex(index)"
      >
        <div class="ls-view-home-search-list__item__prefix">
          <slot name="prefix" :item="item">
            <div class="ls-view-home-search-list__button is-prefix">
              <ls-icon :name="item.prefix" />
            </div>
          </slot>
        </div>
        <div class="ls-view-home-search-list__item__content">
          <slot :item="item">
            {{ item.content }}
          </slot>
        </div>
        <div class="ls-view-home-search-list__item__suffix">
          <slot name="suffix" :item="item">
            <div class="ls-view-home-search-list__button">
              <ls-icon name="icon-setting" />
            </div>
            <div class="ls-view-home-search-list__button">
              <ls-icon name="icon-right" />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </ls-scrollbar>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { delayThrottle } from '<util>/common/event';

  export default {
    name: 'search-bar-list',
    components: {
      LsIcon: defineAsyncComponent(() => import('<components>/common/icon')),
      LsScrollbar: defineAsyncComponent(() => import('<components>/common/scrollbar')),
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
      fetchList() {
        this.setLoading('searchList', true);
        const search = this.store.search;
        setTimeout(() => {
          this.setLoading('searchList', false);
          if (search) {
            this.result.list = this.translateList([].concat(this.format.list), search);
          } else {
            this.result.list = [];
          }
        }, 500);
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