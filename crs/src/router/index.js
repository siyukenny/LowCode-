import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/page'
    },
    {
      path: '/page',
      name: 'page',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {
        title: '配置页'
      },
      component: () =>
        import(/* webpackChunkName: "about" */ '../pages/page.vue')
    },
    // cms 预览页面
    {
      path: '/pagePreiview',
      name: 'pagePreiview',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {
        title: '预览页'
      },
      component: () =>
          import(/* webpackChunkName: "about" */ '../pages/previewPage.vue'),
      // meta: {
      //   preiview: true // 该字段为true时，预览页面不触发跳转逻辑
      // }
    },
    // 小程序正式嵌入页面
    {
      path: '/activity',
      name: 'activity',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {
        title: '活动页'
      },
      component: () =>
          import(/* webpackChunkName: "about" */ '../pages/previewPage.vue')
    }
  ]
})
