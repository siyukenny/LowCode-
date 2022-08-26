import Vue from 'vue'
import App from '@/App.vue'
import Avue from '@smallwei/avue';
import store from '@/store'
import router from '@/router'
import VueRouter from 'vue-router'
import '@/styles/app.less' // 后台装修搭建系统公共CSS
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'element-ui/lib/theme-chalk/index.css'
import PizzaUI from '@bigbighu/mobili-pizza'
import CoffeeUI from '@bigbighu/mobili-coffee'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueQuillEditor)
Vue.use(Avue)
Vue.use(ElementUI)
Vue.use(PizzaUI)
Vue.use(CoffeeUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
