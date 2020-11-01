import { createRouter, createWebHistory } from 'vue-router';

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
    path: '/about',
    name: 'About',
    component: () => import('<views>/About.vue')
  },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
