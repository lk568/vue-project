//阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

import Vue from 'vue'
import App from './App.vue'
// 引入swiper
import "swiper/css/swiper.css"
// 三级联动组件---全局组件
import TypeNav from "@/components/TypeNav"
// 注册全局组件Vue.component 第一个参数：全局组件的名字TypeNav.name, 第二个参数：哪一个组件TypeNav
Vue.component(TypeNav.name, TypeNav)

// 引入路由1
import router from "@/router"

// 测试请求
import { reqCategoryList } from '@/api'
// reqCategoryList().catch((err) => {
//   console.log("测试请求错误")
// })
// 引入仓库
import store from '@/store'
// 引入mock数据
import "@/mock/mockServer"
new Vue({
  render: h => h(App),
  // 注册路由2：KV一致写法一般省略V，【router要小写】
  router,  // 注册后在根组件中设置路由出口<router-view></router-view>
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
