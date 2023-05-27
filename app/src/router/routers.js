import Home from "@/views/Home"
import Search from "@/views/Search"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Detail from "@/views/Detail"
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import PaySuccess from "@/views/PaySuccess"
export default [
    // home页面路由  声明式导航不用加name
    {
        path: "/home",
        component: Home,
        // 设置路由元信息meta 是否显示footer组件
        meta: { footerShow: true }
    },
    // search页面路由
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
    // 商品详情页面路由
    {
        // 有参数，使用:id占位
        path: "/detail/:id",
        component: Detail,
        name: "detail",
        meta: { footerShow: true }

    },
    // 添加到购物车成功页面路由
    {
        path: "/addCartSuccess",
        component: () => import("@/views/AddCartSuccess"),
        name: "addCartSuccess",
        meta: { footerShow: true }
    },
    // 购物车页面路由
    {
        path: "/shopcart",
        component: () => import("@/views/ShopCart"),
        meta: { footerShow: true }

    },
    // 订单页面路由
    {
        path: "/trade",
        component: Trade,
        meta: { footerShow: true }

    },
    // 支付页面路由
    {
        path: "/pay",
        component: Pay,
        meta: { footerShow: true }

    },
    // 支付成功页面路由
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { footerShow: true }

    },
    // 登录页面路由
    {
        path: "/login",
        component: Login,
        meta: { footerShow: false }
    },
    // 注册页面路由
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
]