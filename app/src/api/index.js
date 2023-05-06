// 当前模块，进行统一管理API
// 引入
import requests from "./requests"

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 分别暴露,引入需要加{}
export const reqCategorylist = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}
