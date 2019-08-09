import Vue from 'vue'
import router from './router'
import { common } from './common'
import store from './store'
import Lin from './components/component'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    title: false, //    显示当前图片的标题
    scalable: true, //图片是否可翻转
    rotatable: true, //图片是否可旋转
    tooltip: false, //显示缩放百分比
    navbar: false, //显示缩略图导航
    loop: false,
    loading: false
  }
});
Vue.use(common);
Vue.use(Lin);
Vue.use(ElementUI);

//网页挂载点
const Layout = () => import('./pages/others/layout.vue');

new Vue({
  router,
  store,
  render: h => h(Layout)
}).$mount('#app');
