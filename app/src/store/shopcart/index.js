import { reqCartList,reqAddToCart } from "@/api"
const state = {
    cartList: []
}
const actions = {
    async cartList(context) {
        let result = await reqCartList()
        if(result.code === 200){
            context.commit("CARTLIST",result.data)
        }
    },
    // 加入购物车 || 修改购物车商品数量
    async addToCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) {
            // 代表加入购物车成功
            return "ok"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error("Promise返回失败"))
        }
    }
}
const mutations = {
    CARTLIST(state , value){
        state.cartList = value
    }
}
const getters = {
    cartListValue(state){
        return state.cartList[0] || {}
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