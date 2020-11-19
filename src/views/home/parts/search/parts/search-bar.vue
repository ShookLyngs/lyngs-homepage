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
  async mounted() {
    const instance = chain({ caller: this });
    await instance
      .use(async (context, next) => {
        console.log('progress 1');
        await next();
        console.log('finished 1');
      })
      .use(async (context, next) => {
        console.log('progress 2');
        await next();
        console.log('finished 2');
      })
      .use(async (context, next) => {
        console.log('progress 3');
        await next();
        console.log('finished 3');
      })
      .useHook('onStart', (context) => {
        console.log('on-start', context);
      })
      .useHook('onProgress', (context) => {
        console.log('on-progress', context);
      })
      .useHook('onCanceled', (context) => {
        console.log('on-cancel', context);
      })
      .useHook('onPop', (context) => {
        console.log('on-pop', context);
      })
      .useHook('onFinish', (context) => {
        console.log('on-finish', context);
      })
      .start();

    console.log('on-final');
  }
}
</script>
