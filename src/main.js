import Vue from 'vue'
import router from './router'
import {common} from './common'
import store from './store'
import FastClick from 'fastclick'
import Lin from './components/component'

Vue.use(common);
Vue.use(Lin);

FastClick.attach(document.body);
Vue.config.productionTip = false;

//网页挂载点
const Layout = () => import('./pages/others/layout.vue');

new Vue({
  router,
  store,
  render: h => h(Layout)
}).$mount('#app');
