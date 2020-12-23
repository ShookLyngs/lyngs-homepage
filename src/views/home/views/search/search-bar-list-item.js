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
    // prefix
    const prefixRender = this.handleProperty(this.result, 'prefix.render', false);
    const prefixDefault = () => (
      <button
        className='ls-view-home-search-list__button is-prefix'
        v-tooltip={this.handleProperty(this.result, 'prefix.tooltip')}
        onClick={this.handleProperty(this.result, 'prefix.onClick', false)}
      >
        <ls-icon name={this.handleProperty(this.result, 'prefix.icon')}/>
      </button>
    );
    const prefix = (
      <div class='ls-view-home-search-list__item__prefix'>
        {prefixRender instanceof Function ? prefixRender() : prefixDefault()}
      </div>
    );

    // content
    const contentRender = this.handleProperty(this.result, 'content.render', false);
    const contentDefault = () => this.handleProperty(this.result, 'content.primaryText');
    const content = (
      <div
        class='ls-view-home-search-list__item__content'
        v-tooltip={this.handleProperty(this.result, 'content.tooltip')}
      >
        {contentRender instanceof Function ? contentRender() : contentDefault()}
      </div>
    );

    // suffix
    const suffixRender = this.handleProperty(this.result, 'content.render', false);
    const suffixDefault = () => {
      const buttons = this.handleProperty(this.result, 'suffix.buttons');
      return buttons.map((button, index) => (
        <button
          className='ls-view-home-search-list__button'
          key={index}
          v-tooltip={this.handleProperty(button, 'tooltip')}
          onClick={this.handleProperty(button, 'onClick', false)}
        >
          <ls-icon name={this.handleProperty(button, 'icon')} />
        </button>
      ));
    };
    const suffix = (
      <div class='ls-view-home-search-list__item__suffix'>
        {suffixRender instanceof Function ? suffixRender() : suffixDefault()}
      </div>
    );

    return (
      <div
        class='ls-view-home-search-list__item'
        class={this.active ? 'is-active' : ''}
        onMouseenter={this.onMouseEnter}
      >
        {prefix}
        {content}
        {suffix}
      </div>
    );
  },
};