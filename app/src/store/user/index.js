import { reqGetCode,reqUserRegister ,reqUserLogin} from "@/api"
const state = {
    // 验证码
    code:"",
    // vuex仓库的存储数据不是持久化的（刷新后，仓库中数据会清空，只有刷新时再次请求获得的数据会显示）
    token:"",
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code===200){
            commit("GETCODE",result.data)
            return "ok"
        }else {
            return Promise.reject(new Error("返回结果，获取验证码失败"))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code===200){
            return "ok"
        }else {
            return Promise.reject(result.message)
        }
    },
    // 用户登录
    async userLogin({commit},data){
        // 登录成功后，服务器会返回token，用户的唯一标识；
        // 以后登录就会携带token向服务器请求用户信息，用来展示
        let result = await reqUserLogin(data)
        if(result.code===200){
            commit("USERLOGIN",result.data.token)
            return "ok"
        }else {
            return Promise.reject(result.message)
        }
    }
}
const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
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