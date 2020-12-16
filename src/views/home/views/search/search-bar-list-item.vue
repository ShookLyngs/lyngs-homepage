<template>
  <div
    class="ls-view-home-search-list__item"
    :class="active ? 'is-active' : ''"
    @mouseenter="onMouseEnter"
  >
    <!-- prefix -->
    <div class="ls-view-home-search-list__item__prefix">
      <slot name="prefix" :item="result">
        <div
          class="ls-view-home-search-list__button is-prefix"
          @click="handleProperty(result, 'prefix.onClick')"
        >
          <ls-icon :name="handleProperty(result, 'prefix.icon')" />
        </div>
      </slot>
    </div>

    <!-- content -->
    <div class="ls-view-home-search-list__item__content">
      <slot :item="result">
        {{ handleProperty(result, 'content.primaryText') }}
      </slot>
    </div>

    <!-- suffix -->
    <div class="ls-view-home-search-list__item__suffix">
      <slot name="suffix" :item="result">
        <div
          class="ls-view-home-search-list__button"
          v-for="(button, index) in handleProperty(result, 'suffix.buttons')"
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
    computed: {
      result() {
        //console.log(this.item);
        return merge(defaultItem, this.item.result);
      },
    },
    methods: {
      handleProperty(target, dig, untie = true, context = void 0) {
        if (!context) {
          context = this.result;
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