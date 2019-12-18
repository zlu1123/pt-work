import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// 引入lib-flexible
import 'lib-flexible/flexible';

import VueLazyload from 'vue-lazyload';
import { Dialog } from 'vant';

// 全局注册
Vue.use(VueLazyload);
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
