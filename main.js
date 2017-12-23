import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';

import router from './router';
import store from './store/index';

import App from './components/App.vue';

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
