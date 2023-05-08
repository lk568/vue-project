<template>
  <div>
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- v-show根据路由元信息meta判断是否显示footer -->
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 代码放在App入口文件是因为刷新页面mounted只执行一次（之后进行路由跳转不会再执行）而数据只需获取一次即可，可以优化性能
    // 派发请求给vuex actions  获取商品分类的三级列表的数据
    // 通知Vuex发送请求，让其actions获取数据，存储到仓库
    this.$store.dispatch("home/categoryList");
    // console.log(1);
    this.$store.dispatch("home/bannerList");
  },
};
</script>

<style scoped></style>
