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
export const reqBannerList = () => {
    return mockRequests({
        url: "/banner",
        method: "get"
    })
}
// mock floor轮播图接口
export const reqFloorList = () => {
    return mockRequests({
        url: "/floor",
        method: "get"
    })
}

// search接口  /api/list   POST   有参数
/* 参数示例 
{
    "category1Id": "61",
    "category2Id": "61",
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */

//   params由搜索页派发actions第二个参数 传递过来  至少是一个空对象
export const reqSearchList = (params) => {
    return requests({
        url: "/list",
        method:"POST",
        data:params
    })
}
// 详情页接口 URL: /api/item/{ skuId }  GET  有参数{必须}skuId	string	商品ID
export const reqDetailList = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method:"GET",
    })
}
// 7. 添加到购物车(对已有物品进行数量改动) URL：/api/cart/addToCart/{ skuId }/{ skuNum }  POST  
/* 参数  skuID	string	Y	商品ID
        skuNum	string	Y	商品数量 正数代表增加 负数代表减少 */
export const reqAddToCart = (skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:"POST"
    })
}
