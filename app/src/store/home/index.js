// home模块的小仓库
// 引入真实接口数据、mock接口数据
import { reqCategoryList,reqBannerList,reqFloorList } from "@/api"
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const actions = {
    async categoryList(context) {
        let result = await reqCategoryList()
        // 判断数据接口是否正常
        if (result.code === 200) {
            context.commit("CATEGORYLIST", result.data)
        } else {
            console.log("接口状态码不是200")
        }
    },
    async bannerList(context) {
        let result = await reqBannerList()
        // console.log(result)
        // 判断数据接口是否正常
        if (result.code === 200) {
            context.commit("BANNERLIST", result.data)
        } else {
            console.log("接口状态码不是200")
        }
    },
    async floorList(context) {
        let result = await reqFloorList()
        // console.log(result)
        // 判断数据接口是否正常
        if (result.code === 200) {
            context.commit("FLOORLIST", result.data)
        } else {
            console.log("接口状态码不是200")
        }
    },
}
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    BANNERLIST(state, value) {
        state.bannerList = value
    },
    FLOORLIST(state, value) {
        state.floorList = value
    }
}
const getters = {}
export default {
    // 开启命名空间
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}