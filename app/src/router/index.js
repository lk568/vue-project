//配置路由的地方

// 引入插件1
import Vue from "vue"
import VueRouter from "vue-router"
// 使用插件2
Vue.use(VueRouter)
// 引入路由组件3
import Home from "@/views/Home"
import Search from "@/views/Search"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Detail from "@/views/Detail"
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
// 暴漏路由4，暴漏后在main.js中引入路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            // 设置路由元信息meta
            meta: { footerShow: true }
        },
        {
            // 指定params参数可传可不传
            path: "/search/:keyword?",
            // 直接导入
            component: () => import("@/views/Search"),
            meta: { footerShow: true },
            name: "search",
            // 路由组件传递props数据：
            // 1布尔值写法,只能传params
            // props:true,
            // 2对象写法,可以额外给路由组件传一些props数据
            // props: { a: 1, b: 2 },
            // 3函数写法,可以传params参数、query参数
            props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })

        },
        {
            // 有参数，使用:id占位
            path: "/detail/:id",
            component: Detail,
            name: "detail",
            // 设置路由元信息meta
            meta: { footerShow: true }

        },
        {
            path: "/login",
            component: Login,
            meta: { footerShow: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { footerShow: false }
        },
        // 重定向
        {
            path: "/",
            redirect: "/home"
        }
    ],
    // 路由跳转后的滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { x: 0, y: 0 }
    },
})