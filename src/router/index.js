// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'
import data from "../store/modules/app"
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      // Home
      route('VuetifyHome', null, 'home/vuetifyhome'),

      // Examples
      route('Examples', null, 'examples/:id'),

      // Documentations
      route('Documentation', null, 'doc/:category/:page/'),

      // Form
      route('Form', null, 'Form'),

      // AddData
      route('AddData', null, 'useraccountmanage/adddata'),

      // About
      route('About', null, 'About'),

      // 打开网站切换到数据入库页面
      {
        path: '/',
        redirect: 'useraccountmanage/adddata'
      },
      // Tables
      //route('Regular Tables', null, 'tables/regular'),

      // Maps
      //route('Google Maps', null, 'maps/google'),

      //最初的版本
      // {
      //   path: '/',
      //   name: 'home',
      //   component: GettingStarted,
      // },

      // {
      //   path: '/getting_started/:map_name',
      //   name: 'GettingStarted',
      //   component: GettingStarted,
      //   // children: [
      //   //   {
      //   //     // 当 /GettingStarted/test1 匹配成功
      //   //     path: 'gettingStarted/test1',
      //   //     name: 'GettingStartedTest1',
      //   //     component: GettingStarted
      //   //   }
      //   // ]
      // },

      // {
      //   path: '/vuetifyhome',
      //   name: 'VuetifyHome',
      //   component: VuetifyHome
      // },

      // {
      //   path: '/about',
      //   name: 'About',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      // }
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

router.afterEach((to)=>{
  /** 因为页面刷新后数据会变回初始值，待完善数据的存储方式 **/
  if (to.path.search('landcover') === -1) {  // 路由中没有landcover
    data.state.leftCardShowFlag = false
  }else{
    data.state.leftCardShowFlag = true
  }
})
export default router

