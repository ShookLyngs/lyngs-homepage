<template>
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
          <ls-icon :name="item.prefix" />
        </slot>
      </div>
      <div class="ls-view-home-search-list__item__content">
        <slot :item="item">
          {{ item.content }}
        </slot>
      </div>
      <div class="ls-view-home-search-list__item__suffix">
        <slot name="suffix" :item="item">
          <ls-icon name="icon-right" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import { animationFrameThrottle } from '<util>/common/event';
  export default {
    name: 'search-bar-list',
    components: {
      LsIcon: defineAsyncComponent(() => import('<components>/common/icon')),
    },
    inject: [
      'searchBar'
    ],
    data: () => ({
      store: {
        content: '',
      },
      result: {
        index: -1,
        list: [],
      },
    }),
    methods: {
      update() {
        this.fetchList();
      },
      fetchList() {
        this.result.list = [];
        this.setLoading('searchList', true);
        setTimeout(() => {
          this.setLoading('searchList', false);
          this.result.list = this.translateList([
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
          ]);
        }, 1000);
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
      translateList(list) {
        const search = this.store.search;

        return list.map((item) => {
          return Object.assign({}, item, {
            content: this.translateContent(item.content, {
              content: search,
            })
          });
        });
      },

      setRelativeIndex(index) {
        const newIndex = this.result.index + index;
        if (newIndex >= this.result.list.length) {
          this.result.index = 1;
        } else if (newIndex < 0) {
          this.result.index = this.result.list.length + newIndex;
        } else {
          this.result.index = newIndex;
        }
        console.log(this.result.index);
      },
      setIndex(index) {
        this.result.index = index;
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
      'searchBar.form.search'(value) {
        this.store.search = value;
        this.update();
      },
    },
    beforeMount() {
      this.update = animationFrameThrottle(this.update);
    },
  }
</script>