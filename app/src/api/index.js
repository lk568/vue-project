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
    return mockRequests({ url: "/floor", method: "get" })
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
    return requests({ url: "/list", method: "POST", data: params })
}
// 详情页接口 URL: /api/item/{ skuId }  GET  有参数{必须}skuId	string	商品ID
export const reqDetailList = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: "GET", })
}
//  添加到购物车(对购物车中已有物品进行数量改动) URL：/api/cart/addToCart/{ skuId }/{ skuNum }  POST  
/* 参数  skuID	string	Y	商品ID
        skuNum	string	Y	商品数量 正数代表增加 负数代表减少 */
export const reqAddToCart = (skuId, skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "POST" })
}
// 获取购物车列表  URL: /api/cart/cartList   GET
export const reqCartList = () => {
    return requests({ url: "/cart/cartList", method: "GET" })
}
// 删除购物车商品  URL:/api/cart/deleteCart/{skuId}       DELETE
/*参数名称	类型	是否必选	描述
skuId	string	Y	商品id*/
export const reqDeleteCart = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: "DELETE" })
}
// 修改商品选中状态  URL：/api/cart/checkCart/{skuId}/{isChecked}  GET
/* skuID	string	Y	商品ID
isChecked	string	Y	商品选中状态
                        0代表取消选中
                        1代表选中

 */
export const reqCheckCart = (skuId, isChecked) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "GET" })
}
// 获取验证码   /api/user/passport/sendCode/{phone}     get
export const reqGetCode = (phone) => {
    return requests({ url: `/user/passport/sendCode/${phone}`, method: "GET" })
}
/*  注册接口  /api/user/passport/register  POST  传参data:data  对象kv一致省略v
phone	string	Y	注册手机号
password	string	Y	密码
code	string	Y	验证码 */
export const reqUserRegister = (data) => {
    return requests({ url: `/user/passport/register`, method: "POST" ,data})
}
// 注册接口  /api/user/passport/login  POST  传参data:data  对象kv一致省略v
export const reqUserLogin = (data) => {
    return requests({ url: `/user/passport/login`, method: "POST" ,data})
}

// 获取用户信息【携带token去获取用户信息,将token存储到请求头中】 URL: api/user/passport/auth/getUserInfo  GET
export const reqUserInfo = ()=>{
    return requests({url:"/user/passport/auth/getUserInfo",method:"GET"})
}

// 退出登录
export const reqLogout=()=>{
    return requests({url:"/user/passport/logout",method:"GET"})
}

// 获取用户地址信息  URL:/api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo=()=>{
    return requests({url:"/user/userAddress/auth/findUserAddressList",method:"GET"})
}

// 获取商品清单  URL：/api/order/auth/trade   get
export const reqOrderInfo=()=>{
    return requests({url:"/order/auth/trade",method:"GET"})
}

// 提交订单接口 URL:/api/order/auth/submitOrder?tradeNo={tradeNo}    POST
/* 参数名称	      类型	  是否必选	    描述
traderNo	    string	    Y	    交易编号(拼接在路径中)
consignee	    string	    Y	    收件人姓名
consigneeTel	string	    Y	    收件人电话
deliveryAddress	string	    Y	    收件地址
paymentWay	    string	    Y	    支付方式(ONLINE代表在线)
orderComment	string	    Y	    订单备注
orderDetailList	Array	    Y	    存储多个商品对象的数组 */
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo} `,method:"POST",data})
}

// 获取支付信息 /api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo=(orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`,method:"GET"})
}

// 获取订单支付状态 URL: /api/payment/weixin/queryPayStatus/{orderId} GET
// orderId	string	Y	支付订单ID
export const reqPayStatus= (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"GET"})
}

// 获取我的订单列表 /api/order/auth/{page}/{limit}
/* 参数名称	 类型	是否必选	描述
    page	string	Y	        页码
    limit	string	Y	    每页显示数量 */

export const reqMyOrderList = (page,limit)=>{
    return requests({url:`/order/auth/${page}/${limit}`,method:"GET"})
}