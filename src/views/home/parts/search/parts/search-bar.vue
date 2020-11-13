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
import { createRequest, config } from '<assets>/scripts/chain-request';
import { digger } from '<assets>/scripts/chain-request/src/modules/digger';
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

    createRequest(this)
      .use(config({
        url: 'test',
        method: 'get',
        params: {
          version: Date.now(),
        },
      }))
      .start();

    const object = {
      data: {
        people: [
          { name: 'shook' },
        ],
      },
    };
    console.log(digger(object, 'data.people[1]', { name: 'oral' }, { extend: true }), object);
  }
}
</script>
