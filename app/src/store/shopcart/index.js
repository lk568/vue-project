import { reqCartList, reqAddToCart, reqDeleteCart, reqCheckCart} from "@/api"
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
            return Promise.reject(new Error("返回结果，加入失败"))
        }
    },
    // 删除购物车
    async deleteCart({commit},skuId){
        let result = await reqDeleteCart(skuId)
        if(result.code===200){
            return "ok"
        }else{
            return Promise.reject(new Error("返回结果，删除失败"))
        }
    },
    // 修改商品选中状态
    async checkCart({commit},{ skuId, isChecked }){
        let result = await reqCheckCart(skuId, isChecked)
        if(result.code===200){
            return "ok"
        }else{
            return Promise.reject(new Error("返回结果，修改失败"))
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