import { defineAsyncComponent } from 'vue';
import digger from "@lyngs/digger";
import merge from "@lyngs/merge";

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
  render() {
    const prefixRender         = this.handleProperty(this.result, 'prefix.render', false);
    const isPrefixRenderUsable = typeof prefixRender === 'function';

    const prefix = (
      <div class='ls-view-home-search-list__item__prefix'>
        { isPrefixRenderUsable ? prefixRender() : void 0 }
        {
          !isPrefixRenderUsable &&
          (
            <button
              className='ls-view-home-search-list__button is-prefix'
              v-tooltip={this.handleProperty(this.result, 'prefix.tooltip')}
              onClick={this.handleProperty(this.result, 'prefix.onClick', false)}
            >
              <ls-icon name={this.handleProperty(this.result, 'prefix.icon')}/>
            </button>
          )
        }
      </div>
    );

    return (
      <div
        class='ls-view-home-search-list__item'
        class={this.active ? 'is-active' : ''}
        onMouseenter={this.onMouseEnter}
      >
        {prefix}
      </div>
    );
  },
};