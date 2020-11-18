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
import { digger } from '@lyngs/digger';
import { merge } from '<assets>/scripts/chain-request/src/modules/merge';
export default {
  name: 'home-search-search-bar',
  description: 'the main search-bar.',
  components: {
    LsAffix: defineAsyncComponent(() => import('<components>/container/affix')),
  },
  mounted() {
    const instance = chain({ caller: this });
    instance
      .use(async (context, next) => {
        console.log('progress 1');
        await next();
        console.log('finished 3');
      })
      .use(async (context, next) => {
        console.log('progress 2');
        await next();
        console.log('finished 2');
      })
      .use(async (context, next) => {
        console.log('progress 3');
        await next();
        console.log('finished 1');
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
      .useHook('onFinish', (context) => {
        console.log('on-finish', context);
      })
      .start();

    const object = {
      data: {
        current: 0,
        people: [
          { name: 'shook' },
        ],
      },
    };
    console.log(digger(object, `data['people'][0]['name']`));

    console.log(merge(new Set([ 1, 2, 3 ]), new Set([ 2, 3, 4, 5 ])));
  }
}
</script>
