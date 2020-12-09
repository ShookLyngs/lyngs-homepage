<template>
  <div
    class="ls-view-home-search-list__item"
    :class="active ? 'is-active' : ''"
    @mouseenter="onMouseEnter"
  >
    <!-- prefix -->
    <div class="ls-view-home-search-list__item__prefix">
      <slot name="prefix" :item="data">
        <div
          class="ls-view-home-search-list__button is-prefix"
          @click="handleProperty(data, 'prefix.onClick')"
        >
          <ls-icon :name="handleProperty(data, 'prefix.icon')" />
        </div>
      </slot>
    </div>

    <!-- content -->
    <div class="ls-view-home-search-list__item__content">
      <slot :item="data">
        {{ handleProperty(data, 'content.primaryText') }}
      </slot>
    </div>

    <!-- suffix -->
    <div class="ls-view-home-search-list__item__suffix">
      <slot name="suffix" :item="data">
        <div
          class="ls-view-home-search-list__button"
          v-for="(button, index) in handleProperty(data, 'suffix.buttons')"
          :key="index"
          @click="handleProperty(button, 'onClick')"
        >
          <ls-icon :name="handleProperty(button, 'icon')" />
        </div>
      </slot>
    </div>

  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import merge from "@lyngs/merge";
  import digger from "@lyngs/digger";

  const defaultItem = {
    prefix: {
      icon: '',
      onClick: void 0,
    },
    content: {
      primaryText: '',
    },
    suffix: {
      buttons: [],
    },
  };

  export default {
    name: 'search-bar-list-item',
    components: {
      LsIcon: defineAsyncComponent(() => import('<components>/common/icon')),
    },
    emits: [
      'mouse-enter'
    ],
    props: {
      item: {
        type: Object,
        default: void 0,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({

    }),
    computed: {
      data() {
        console.log(merge(defaultItem, this.item));
        return merge(defaultItem, this.item);
      },
    },
    methods: {
      handleProperty(target, dig, untie = true, context = void 0) {
        if (!context) {
          context = this.data;
        }

        const result = digger(target, dig);

        if (result instanceof Function && untie) {
          return result(context);
        } else {
          return result;
        }
      },

      onMouseEnter() {
        this.$emit('mouse-enter');
      },
    },
  }
</script>