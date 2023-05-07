// vuex状态库
// 引入
import Vue from "vue"
import Vuex from "vuex"
// 使用插件
import home from "./home"
import search from "./search"
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        search
    }
})