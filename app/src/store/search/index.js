import { reqSearchList } from "@/api"

// search模块的小仓库
const state = {
    searchList: {},
}
const actions = {
    async searchList(context, params = {}) {
        let result = await reqSearchList(params)
        if (result.code === 200) {
            // console.log(1)
            context.commit("SEARCHLIST", result.data)
        } else {
            console.log("接口状态码不是200");
        }
    }
}
const mutations = {
    SEARCHLIST(state, value) {
        state.searchList = value
    }
}
const getters = {}
export default {
    // 开启了命名空间，记得map获取数据时加上"仓库名"
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}