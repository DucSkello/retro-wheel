import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App';
import GamesComponent from './components/Games/GamesComponent'

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App},
    { path: '/choose', component: GamesComponent }
  ]
});
