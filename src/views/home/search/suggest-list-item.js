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
  name: 'home-search-suggest-list-item',
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
    access(target, dig, untie = true, context = void 0) {
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
    const prefix = () => {
      const render   = this.access(this.result, 'prefix.render', false);
      const template = () => (
        <button
          className='ls-view-home-search-list__button is-prefix'
          v-tooltip={this.access(this.result, 'prefix.tooltip')}
          onClick={this.access(this.result, 'prefix.onClick', false)}
        >
          <ls-icon name={this.access(this.result, 'prefix.icon')}/>
        </button>
      );

      return (
        <div className='ls-view-home-search-list__item__prefix'>
          {render instanceof Function ? render() : template()}
        </div>
      );
    };

    // content
    const content = () => {
      const render   = this.access(this.result, 'content.render', false);
      const template = () => this.access(this.result, 'content.primaryText');

      return (
        <div
          className='ls-view-home-search-list__item__content'
          v-tooltip={this.access(this.result, 'content.tooltip')}
        >{
          render instanceof Function
            ? render()
            : <div>{template()}</div>
        }</div>
      );
    };

    // suffix
    const suffix = () => {
      const render   = this.access(this.result, 'content.render', false);
      const template = () => {
        const buttons = this.access(this.result, 'suffix.buttons');
        return buttons.map((button, index) => (
          <button
            className='ls-view-home-search-list__button'
            key={index}
            v-tooltip={this.access(button, 'tooltip')}
            onClick={this.access(button, 'onClick', false)}
          >
            <ls-icon name={this.access(button, 'icon')} />
          </button>
        ));
      };

      return (
        <div className='ls-view-home-search-list__item__suffix'>
          {render instanceof Function ? render() : template()}
        </div>
      );
    };

    return (
      <div
        class='ls-view-home-search-list__item'
        class={this.active ? 'is-active' : ''}
        onMouseenter={this.onMouseEnter}
      >
        {[
          prefix(),
          content(),
          suffix()
        ]}
      </div>
    );
  },
};