import { reqAddressInfo, reqOrderInfo } from "@/api"
const state = {
    addressInfo: [],
    orderInfo: {}
}
const mutations = {
    ADDRESSINFO(state, value) {
        state.addressInfo = value
    },
    ORDERINFO(state, value) {
        state.orderInfo = value
    }
}
const actions = {
    async addressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code === 200) {
            commit("ADDRESSINFO", result.data)
        }
    },
    async orderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code = 200) {
            commit("ORDERINFO", result.data)
        }
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}