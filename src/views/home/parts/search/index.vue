<template>
  <div class="ls-view-home-card">
    <!--搜索栏/搜索弹出框-->
    <search-bar></search-bar>

    <!--常用网站-->
    <usual-sites></usual-sites>
  </div>
</template>

<script>
// services
import { defineAsyncComponent } from 'vue';

export default {
  name: 'home-search',
  description: 'one of the center part view-component, placing the main search-bar.',
  components: {
    // public-components
    SearchBar: defineAsyncComponent(() => import('./parts/search-bar')),
    UsualSites: defineAsyncComponent(() => import('./parts/usual-sites')),
  },
}
</script>
