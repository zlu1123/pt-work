import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// 引入lib-flexible
import 'lib-flexible/flexible';

import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
