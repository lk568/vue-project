import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
// 引入持久化存储token的函数
import { getToken, setToken, removeToken } from "../utils/token"
const state = {
    // 验证码
    code: "",
    // vuex仓库的存储数据不是持久化的（刷新后，仓库中数据会清空，只有刷新时再次请求获得的数据会显示）
    // 利用本地存储实现持久化存储token,（在utils里封装了一个持久化存储token的函数setToken和获取token的函数getToken）
    token: getToken(),
    // 用户信息
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("返回结果，获取验证码失败"))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code === 200) {
            return "ok"
        } else {
            return Promise.reject(result.message)
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        // 登录成功后，服务器会返回token，用户的唯一标识；
        // 以后登录就会携带token向服务器请求用户信息，用来展示
        let result = await reqUserLogin(data)
        if (result.code === 200) {
            // 用户已经成功登录，且获取到了token
            commit("USERLOGIN", result.data.token)
            // 持久化存储token(在utils里封装了一个持久化存储token的函数)
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(result.message)
        }
    },
    // 获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit("USERINFO", result.data)
        }
    },
    // 退出登录
    async logout({commit}){
        let result = await reqLogout()
        if(result.code===200){
            commit("LOGOUT")
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, value) {
        state.token = value
    },
    USERINFO(state, value) {
        state.userInfo = value
    },
    LOGOUT(state){
        // 清空仓库中用户信息和token
        state.token=""
        state.userInfo={}
        // 本地存储数据清除函数
        removeToken()
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}