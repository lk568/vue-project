// 将持久化存储token的函数暴露
export const setToken=(token)=>{
    window.localStorage.setItem("TOKEN",token)
}
// 将获取token的函数暴露
export const getToken=()=>{
    return window.localStorage.getItem("TOKEN")
}
// 清除token函数暴漏
export const removeToken=()=>{
    window.localStorage.removeItem("TOKEN")
}