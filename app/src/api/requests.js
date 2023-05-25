// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// start进度条开始，done进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"
// 引入store
import store from "@/store"

// 1.利用axios对象的方法create，创建一个axios实例(这里是requests)
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000
})
// 2.请求拦截器 可以在请求之前做些什么
requests.interceptors.request.use((config) => {
    // 开启进度条
    nprogress.start()
    // config:配置对象，里面有一个属性很重要，Header请求头
    // 将游客身份uuid放在请求头中，发请求时带给购物车页面
    if(store.state.detail.uuid_token){
        // 给请求头添加临时用户Id
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 将token添加到请求头中，当派发请求获取用户信息时利用token识别获取用户信息并展示
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config
})
// 3.响应拦截器 可以在响应之后处理事情
requests.interceptors.response.use((res) => {
    // 结束进度条
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('接口错误'))
})
// 对外暴露
export default requests;