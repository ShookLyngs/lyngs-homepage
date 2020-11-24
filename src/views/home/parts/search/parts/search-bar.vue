<template>
  <ls-affix :offset-top="50">
    <div class="ls-view-home-search">
      <div class="ls-view-home-search__container">
        <div class="ls-view-home-search__item is-static">
          <ls-icon name="icon-bilibili"></ls-icon>
        </div>
        <div class="ls-view-home-search__item">
          <ls-input auto-focus size="biggest" v-model:value="form.search" />
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

  export default {
    name: 'home-search-search-bar',
    description: 'the main search-bar.',
    components: {
      LsAffix: defineAsyncComponent(() => import('<components>/common/affix')),
      LsInput: defineAsyncComponent(() => import('<components>/common/input')),
    },
    data: () => ({
      form: {
        search: '',
      },
    }),
    methods: {

    },
    mounted() {},
  };
</script>
