<template>
  <div
    class="ls-view-home-search-list__item"
    :class="active ? 'is-active' : ''"
    @mouseenter="onMouseEnter"
  >
    <!-- prefix -->
    <div class="ls-view-home-search-list__item__prefix">
      <slot name="prefix" :item="result">
        <button
          class="ls-view-home-search-list__button is-prefix"
          @click="handleProperty(result, 'prefix.onClick')"
        >
          <ls-icon :name="handleProperty(result, 'prefix.icon')" />
        </button>
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
        <button
          class="ls-view-home-search-list__button"
          v-for="(button, index) in handleProperty(result, 'suffix.buttons')"
          v-tooltip="handleProperty(button, 'tooltip')"
          :key="index"
          @click="handleProperty(button, 'onClick')"
        >
          <ls-icon :name="handleProperty(button, 'icon')" />
        </button>
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
        return merge(defaultItem, this.item.result);
      },
    },
    methods: {
      handleProperty(target, dig, untie = true, context = void 0) {
        if (!context) {
          context = this.item;
        }

        const result = digger(target, dig);

        if (result instanceof Function && untie) {
          return result.call(this, context);
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