// detail模块的小仓库
// 引入真实接口数据 、 添加到购物车接口数据
import { reqDetailList,reqAddToCart } from "@/api"
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
        // console.log(result.code)
    }
   },
   async addToCart({context},{skuId,skuNum}){
    // 加入购物车返回的是数据进行解构
    // 加入购物车后（发请求），前台将参数带给了服务器，
    // 服务器存储数据成功后，并没有返回其他数据，只是返回code=200，代表操作成功(加入购物车成功)
    // 因为服务器没有返回其他数据，所以不需要vuex三连环存储数据
    let result = await reqAddToCart(skuId,skuNum)
    console.log(result);
    // if(result.code === 200){
    //     context.commit("DETAILLIST",result.data)
    // }else{
    //     console.log("接口状态码不是200");
    // }
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