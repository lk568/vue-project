// detail模块的小仓库
// 引入真实接口数据 
import { reqDetailList } from "@/api"
const state = {
    detailList:{},
}
const actions = {
   async detailList(context,skuId){
    let result = await reqDetailList(skuId)
    if(result.code === 200){
        context.commit("DETAILLIST",result.data)
    }else{
        console.log("接口状态码不是200");
        console.log(result.code)
    }
   }
}
const mutations = {
    DETAILLIST(state,value){
        state.detailList = value
    }
}
const getters = {
    // 简化参数连写
    categoryView(state){
        return state.detailList.categoryView || {}
    },
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    },
}
export default {
    // 开启命名空间
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}