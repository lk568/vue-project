<template>
   <div>
      <h1>我是搜索页面</h1>
      <h2>params参数---{{ $route.params.keyword }}-------{{ keyword }}</h2>
      <h2>query参数---{{ $route.query.k }}-------{{ k }}</h2>
   </div>
</template>
<script>
export default {
   // 路由组件可以传递props
   // props:['a','b']
   props:['keyword','k']
}
</script>
<style scoped lang="less"></style>