//阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

import Vue from 'vue'
import App from './App.vue'
// 引入饿了么UI组件
import { Icon, MessageBox } from 'element-ui';
// 三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 注册全局组件Vue.component 第一个参数：全局组件的名字TypeNav.name, 第二个参数：哪一个组件TypeNav
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册饿了么UI组件 3种方法
/* 1.Vue.use()
2.Vue.component()
3.将element-ui组件挂载到组件原型上 如：Vue.prototype.$msgbox = MessageBox;  Vue.prototype.$alert = MessageBox.alert; */
Vue.use(Icon)
// 引入弹窗MessageBox组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由1
import router from "@/router"
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
// 引入仓库
import store from '@/store'
// 引入swiper样式
import "swiper/css/swiper.css"
// 引入mock数据
import "@/mock/mockServer"

// 引入插件（图片懒加载）
import VueLazyload from 'vue-lazyload';
// 引入懒加载默认图片(默认对外暴露)
import ikun from '@/assets/ikun.gif'
// 注册插件(图片懒加载)
Vue.use(VueLazyload, {
  // 配置对象，懒加载默认的图片
  // 配置后后，需要懒加载的图片，将:src换成v-lazy  注意不要忘了:冒号
  loading: ikun
})
new Vue({
  render: h => h(App),
  // 配置全局事件总线（GlobalEventBus）
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将API挂载到组件原型上，这样在不适用vuex仓库的时候也可以让所有组件访问api
    Vue.prototype.$API = API
  },
  // 注册路由2：KV一致写法一般省略V，【router要小写】
  router,  // 注册后在根组件中设置路由出口<router-view></router-view>
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
