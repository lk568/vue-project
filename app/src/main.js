//阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from "@/views/Home/TypeNav"
// 注册全局组件Vue.component 第一个参数：全局组件的名字TypeNav.name, 第二个参数：哪一个组件TypeNav
Vue.component(TypeNav.name,TypeNav)

// 引入路由1
import router from "@/router"
new Vue({
  render: h => h(App),
  // 注册路由2：KV一致写法一般省略V，【router要小写】
  router  // 注册后在根组件中设置路由出口<router-view></router-view>
}).$mount('#app')
