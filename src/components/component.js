/**
 *作者：彭方林
 */
import HomeBottom from '../pages/others/home-bottom.vue'
import Number from '../components/common/number'
import MyButton from '../components/common/my-button'
import MyCode from '../components/common/my-code'
import MyImage from '../components/common/my-image'
import MyImages from '../components/common/my-images'
import MyInput from "../components/common/my-input";
import Top from '../pages/others/top.vue'
import WebView from '../components/common/web-view.vue'
import MyScroller from '../components/common/my-scroller'

const component = {
  install: function (Vue) {
    Vue.component('HomeBottom', HomeBottom);
    Vue.component('Number', Number);
    Vue.component('MyButton', MyButton);
    Vue.component('MyCode', MyCode);
    Vue.component('MyImage', MyImage);
    Vue.component('MyImages', MyImages);
    Vue.component('MyInput', MyInput);
    Vue.component('Top', Top);
    Vue.component('WebView', WebView);
    Vue.component('MyScroller', MyScroller);
  }
};
export default component;
