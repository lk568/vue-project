// 利用localStorage实现uuid存储
import { v4 as uuidv4 } from "uuid"
// 生成一个随机字符串，且每次执行不发生变化
export const getUUID = () => {
    let uuid_token = window.localStorage.getItem("UUIDTOKEN")
    if (!uuid_token) {
        // 本地没有先生成游客临时身份
        uuid_token = uuidv4()
        // 本地存储一次
        window.localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token
}