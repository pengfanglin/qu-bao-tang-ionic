import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

//登录界面
const Login = () => import('./pages/others/login.vue');
//首页
const Home = () => import('./pages/others/home.vue');
//个人信息
const UserInfo = () => import('./pages/system/user-info.vue');
//404页面
const ErrorPage = () => import('./pages/others/error-page.vue');
//企业审核
const CompanyAudit = () => import('./pages/company/company-audit.vue');
//企业阅览
const Company = () => import('./pages/company/company.vue');
//岗位列表
const Post = () => import('./pages/post/post.vue');
//订单列表
const Order = () => import('./pages/order/order.vue');
//轮播图
const Banner = () => import('./pages/base/banner.vue');

let router = new Router({
  routes: [
    //未匹配路由重定向到error_page
    {
      path: '*',
      redirect: '/error_page'
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        //404页面
        {
          path: '/error_page',
          component: ErrorPage
        },
        //个人信息
        {
          path: '/user_info',
          component: UserInfo
        },
        //企业审核
        {
          path: '/company_audit',
          component: CompanyAudit
        },
        //企业预览
        {
          path: '/company',
          component: Company
        },
        {
          path: '/post',
          component: Post
        },
        {
          path: '/order',
          component: Order
        },
        {
          path: '/banner',
          component: Banner
        }
      ]
    }
  ]
})
//路由守卫:未登陆用户跳转首页
router.beforeEach((to, from, next) => {
  const whiteList = ['/', '/home', '/login', '/error_page'];   //免登录白名单
  if (whiteList.indexOf(to.path) !== -1) {   //如果去免登录界面
    next();
  } else {
    if (Vue.prototype.isEmpty(store.getters.systemAccount)) {
      next({path: '/login'});
    } else {
      next();
    }
  }
});
export default router