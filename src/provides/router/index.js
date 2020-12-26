import { createRouter, createWebHashHistory  } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('<views>/home/home')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('<views>/test')
  },
];

export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
