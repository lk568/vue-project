<!-- 这是Home模块 -->
<template>
  <div>
    <!-- 使用三级联动全局组件 三级联动组件已经注册为全局组件不需要引入 -->
    <type-nav></type-nav>
    <!-- 使用ListContainer组件 -->
    <ListContainer></ListContainer>
    <!-- 使用TodayRecommend组件 -->
    <TodayRecommend></TodayRecommend>
    <!-- 使用Rank组件 -->
    <Rank></Rank>
    <!-- 使用Like组件 -->
    <Like></Like>
    <!-- 使用FLoor组件 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- 使用Brand组件 -->
    <Brand></Brand>
  </div>
</template>
<script>
// 引入其他组件
import ListContainer from "@/views/Home/ListContainer";
import TodayRecommend from "@/views/Home/TodayRecommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";
// 引入mapState获取vuex中的数据
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    // action需要在home中派发，因为有两个FLoor组件，需要用v-for遍历Floor组件【props传递数据父传子】
    this.$store.dispatch("home/floorList");
  },
  computed:{
    ...mapState({
      floorList:(state)=>{
        return state.home.floorList;
      }
    })
  },
  
};
</script>
<style scoped lang="less">
</style>