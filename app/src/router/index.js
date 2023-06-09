//配置路由的地方

// 引入插件1
import Vue from "vue"
import VueRouter from "vue-router"
// 使用插件2
Vue.use(VueRouter)
// 引入store
import store from "@/store"
// 引入路由组件3
import routers from "./routers"
// 重写push|replace方法：
// 这两个方法的返回值都是Promise
/* 第一个参数：跳转的地址location
第二个参数：成功的回调resolve
第三个参数：失败的回调reject */
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(VueRouter.prototype)
    // console.log(this)
    if (resolve || reject) {
        // 调用原始push方法 并且改变this的指向为VueRouter类的实例对象
        //      (当前函数作用域中的this就是VueRouter类的实例对象this.$router)
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve || reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    // 配置路由
    routes: routers,
    // 路由跳转后的滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { x: 0, y: 0 }
    },
})
// 全局前置守卫（在路由跳转之前进行判断）
/* to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next next()放行 next(path)放行到指定的页面  next(false)放行到from页面 */
router.beforeEach(async (to, from, next) => {
    // 用户已经登陆
    if (store.state.user.token) {
        // 已经登陆，如果在去login，不能去（回到home页面）
        if (to.path === '/login') {
            next('/home')
            // console.log(111);
        } else {
            // 用户信息存在，可以跳转
            if (Object.keys(store.state.user.userInfo).length !== 0) {
                next()
                // console.log(222);
            } else {
                // 用户信息不存在，就派发action让仓库存储用户信息在跳转
                await store.dispatch("user/userInfo")
                    .then(resolve => {
                        // 获取用户信息成功
                        next()
                        // console.log(333);
                    })
                    .catch(async error => {
                        // token失效了获取不到用户信息 清除token 重新登录
                        // 退出登陆（清除token）
                        await store.dispatch("user/logout")
                            .then(resolve => {
                                next('/login')
                            })
                    })
            }
        }
    } else {
        // 未登录：不能去购物车、交易相关、支付相关、个人订单相关页面
        // 未登录如果要前往上面路由，跳转到登陆页面
        let toPath = to.path
        // (indexOf('xxx')===-1)表示路径中不包含xxx
        // toPath.indexOf('/center') !== -1 表示路径中包含center  这样可以直接判断/center/myorder 和 /center/grouporder
        // toPath.indexOf('/pay') !== -1 表示路径中包含pay   这样可以直接判断/pay 和 /paysuccess
        if (toPath.indexOf('/shopcart') !== -1 || toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
            // 利用query参数存储用户未登录时点击跳转的路由,当用户登录后，直接跳转到未登录时点击的路由
            // (在登陆跳转函数那做判断，有query参数就跳到对应参数路由，没有就跳到home路由)
            next(`/login?redirect=${toPath}`)
        } else {
            // 去的不是上面这些路由---放行
            next()
        }
    }
})
// 暴漏路由4，暴漏后在main.js中引入路由
export default router