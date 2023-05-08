// 当前模块，进行统一管理API
// 引入api真实数据
import requests from "./requests"
// 引入mock模拟数据
import mockRequests from "./mockAjax"

// 三级联动typrNav接口
// /api/product/getBaseCategoryList  get  无参数
// 分别暴露,引入需要加{}
export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

// mock banner轮播图接口
export const reqBannerList = ()=>{
    return mockRequests({
        url:"/banner",
        method:"get"
    })
}
// mock banner轮播图接口
// export const reqFloorList = ()=>{
//     return mockRequests({
//         url:"/floor",
//         method:"get"
//     })
// }