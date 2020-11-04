<template>
  <ls-affix :offset="{ y: '100px' }">
    <div class="ls-view-home-search">
      <div class="ls-view-home-search__container">
        <div class="ls-view-home-search__item is-static">icon</div>
        <div class="ls-view-home-search__item">input</div>
        <div class="ls-view-home-search__item is-static">buttons</div>
      </div>
      <div class="ls-view-home-search__detail"></div>
    </div>
  </ls-affix>
</template>

<script>
// services
// todo: import(resize-observer-polyfill) package
// todo: add(resize-observer) component
// todo: add(affix) component

import { defineAsyncComponent } from 'vue';

export default {
  name: 'home-search-search-bar',
  description: 'the main search-bar.',
  components: {
    LsAffix: defineAsyncComponent(() => import('<components>/container/affix')),
  },
}
</script>
