// home模块的小仓库
// 引入真实接口数据
import {reqCategoryList} from "@/api"
// 引入mock接口数据
import { reqBannerList } from "@/api"
const state = {
    categoryList:[],
    bannerList:[],
}
const actions ={
    async categoryList(context){
        let result =  await reqCategoryList()
        // 判断数据接口是否正常
        if(result.code===200){
            context.commit("CATEGORYLIST",result.data)
        }else{
            console.log("接口状态码不是200")
        }
    },
    async bannerList(context){
        let result =  await reqBannerList()
        console.log(result)
        // 判断数据接口是否正常
        if(result.code===200){
            context.commit("BANNERLIST",result.data)
        }else{
            console.log("接口状态码不是200")
        }
    },
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    BANNERLIST(state,value){
        state.bannerList = value
    }
}
const getters={}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}