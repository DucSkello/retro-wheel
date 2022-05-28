import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import './index.css'
import 'flowbite';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



