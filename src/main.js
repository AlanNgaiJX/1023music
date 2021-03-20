// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/border.css'

import './utl/remUnit.js'

// or with options
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.1,
  error: require('./assets/img/err.jpg'),
  loading: require('./assets/img/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll'],
})

// cubeUI Component
import { Toast, Scroll, Slide } from 'cube-ui'
Vue.use(Toast)
Vue.use(Scroll)
Vue.use(Slide)

// fastClick
import fastClick from 'fastclick'
fastClick.attach(document.body)


// axios
import axios from 'axios'
Vue.prototype.$axios = axios

// validator
import validator from 'validator.tool'
Vue.prototype.$validator = validator

Vue.config.productionTip = false

// 路由守卫：验证登录状态
router.beforeEach((to, from, next) => {
  // 底部控制条变化
  let tabBarList = store.state.tabBarList
  for (const item of tabBarList) {
    item.active = false
    if (to.path.indexOf(item.routePath) > -1) {
      item.active = true
    }
  }
  store.dispatch('update_tabBarList', { tabBarList })

  if (to.meta.requireAuth) {
    if (store.state.isLogin) {
      console.log('已登录')
      next()
    } else {
      console.log('未登录')
      next({
        path: '/',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})

// 全局混入：Toast功能
const mixinToast = {
  methods: {
    toast({ txt, type, time, mask }) {
      const toastEle = this.$createToast({
        txt: txt || 'Loading...',
        mask: mask || true,
        type: type || 'loading',
        time: time || 0,
      })
      toastEle.show()
      return toastEle.hide
    },
  },
}
Vue.mixin(mixinToast)

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
})
