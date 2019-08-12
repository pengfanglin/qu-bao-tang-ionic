import Vue from 'vue'

import Router from 'vue-router'
import store from './store'
import Vuex from "vuex";

Vue.use(Vuex);
Vue.use(Router);

import Home from './pages/others/home.vue'
import Login from './pages/others/login.vue'

let router = new Router({
  routes: [
    //重定向到首页
    {
      path: '/',
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      component: Home
    },
    //登录
    {
      path: '/login',
      component: Login
    },
  ]
});

//路由守卫:未登陆用户跳转首页
router.beforeEach((to, from, next) => {
  const whiteList = ['/', '/home', '/login', '/error_page'];   //免登录白名单
  if (whiteList.indexOf(to.path) !== -1) {   //如果去免登录界面
    next();
  } else {
    if (Vue.prototype.isEmpty(store.getters.accountInfo)) {
      next({path: '/login'});
    } else {
      next();
    }
  }
});
export default router