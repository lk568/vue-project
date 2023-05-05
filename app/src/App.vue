<template>
    <div>
        <Header></Header>
        <!-- 路由出口 -->
        <router-view></router-view>
        <!-- v-show根据路由元信息判断是否显示footer -->
        <Footer v-show="$route.meta.footerShow"></Footer>
    </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
    name: "",
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped></style>
