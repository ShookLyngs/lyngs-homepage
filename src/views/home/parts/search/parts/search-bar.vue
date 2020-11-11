<template>
  <ls-affix :offset="{ y: '100px' }">
    <div class="ls-view-home-search">
      <div class="ls-view-home-search__container">
        <div class="ls-view-home-search__item is-static">
          icon
        </div>
        <div class="ls-view-home-search__item">
          input
        </div>
        <div class="ls-view-home-search__item is-static">
          buttons
        </div>
      </div>
      <div class="ls-view-home-search__detail">
        <div>
          1
        </div>
      </div>
    </div>
  </ls-affix>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { chain } from '<assets>/scripts/chain-request';
export default {
  name: 'home-search-search-bar',
  description: 'the main search-bar.',
  components: {
    LsAffix: defineAsyncComponent(() => import('<components>/container/affix')),
  },
  mounted() {
    console.log(
      chain(this, { name: 'shook' }, { age: 16 })
        .use(context => {
          context.name = 'shook';
        })
        .use(context => {
          context.age = 16;

          console.log(context);
        })
    );
  }
}
</script>
