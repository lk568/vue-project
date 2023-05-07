// home模块的小仓库
import {reqCategoryList} from "@/api"
const state = {
    categoryList:[]
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
    }
}
const mutations={
    CATEGORYLIST(state,value){
        state.categoryList = value
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