import Vue from 'vue';
import './plugins/axios'
import VueMap from 'vue-amap'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// 引入lib-flexible
import 'lib-flexible/flexible';

import VueLazyload from 'vue-lazyload';
import {
  Dialog
} from 'vant';

// 全局注册
Vue.use(VueLazyload);
Vue.use(Dialog);
Vue.use(VueMap);
// 初始化vue-amap
VueMap.initAMapApiLoader({
  // 高德key
  // key: '1e098fb2b135edf3f50eb0b5cafef19c',
  key: 'd618bbef4475929b27c029cf6cb01bf1',
  // 插件集合 （插件按需引入）
  // plugin: ['AMap.Geolocation']
  plugin: [
    'AMap.Geocoder',
    'AMap.Geolocation',
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  v: '1.4.4'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
