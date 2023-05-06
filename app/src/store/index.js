// vuex状态库
// 引入
import Vue from "vue"
import Vuex from "vuex"
// 使用插件
Vue.use(Vuex)
// state：仓库存储数据的地方
const state = {}
// mutations：修改state的唯一方法
const mutations = {}
// actions：处理action，可以书写自己的业务逻辑。也可以处理异步
const actions = {}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露一个Store实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})