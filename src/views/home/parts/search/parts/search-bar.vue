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
    /*console.log(
      chain(this, { name: 'shook' }, { age: 16 })
        .use(async (context, next) => {
          context.name = 'shook';
          console.log('1-forward');
          await next();
          console.log('1-back');
        })
        .use(async (context, next) => {
          context.age = 16;
          console.log('2-forward');
          await next();
          console.log('2-back');
        })
        .use(async (context, next) => {
          console.log('3-forward');
          await next(false);
          console.log('3-back');
        })
        .use(async (context, next) => {
          console.log('4-forward');
          await next();
          console.log('4-back');
        })
        .start()
    );*/

    const instance = chain({ caller: this });
    instance
      .use(async (context, next) => {
        await next();
        console.log('finished 3');
      })
      .use(async (context, next) => {
        await instance.cancel();
        await instance.hack(root => {
          console.log(root);
          return root;
        });
        await next();
        console.log('finished 2');
      })
      .use(async (context, next) => {
        console.log('next');
        await next();
        console.log('finished 1');
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
