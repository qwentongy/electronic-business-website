import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

// 分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

// 引入路由
import router from '@/router'

// 引入Vuex
import store from '@/store'

// 引入MockServe.js---mock数据
import '@/mock/mockServe.js'

// // 接口测试
// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo({}));

Vue.config.productionTip = false


new Vue({
  render: h => h(App),

  // 注册路由
  router,

  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },

  // 注册仓库:组件实例身上会多一个$store属性
  store
}).$mount('#app')
