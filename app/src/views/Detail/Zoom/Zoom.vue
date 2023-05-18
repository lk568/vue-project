<template>
  <div class="spec-preview">
    <!-- 图片 -->
    <img :src="skuImage.imgUrl" />
    <!-- 鼠标移入移出事件 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大镜大图 -->
    <div class="big">
      <img :src="skuImage.imgUrl" ref="big" />
    </div>
    <!-- 蒙版遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    // 处理父组件传递过来的数组skuImageList它里面的数据是对象，我们要用到对象中的图片，所以要保证数组skuImageList中数据对象让其不能为undefined,最起码是一个空对象
    skuImage() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    // 全局事件总线，接受兄弟组件ImageList传递过来的索引值index，然后对大图的索引值做修改
    this.$bus.$on("changeIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    // 放大镜效果
    handler(event) {
      // 遮罩层响应式数据
      let mask = this.$refs.mask;
      // 放大后图片响应式数据
      let big = this.$refs.big;
      // mask距离盒子的距离 = 鼠标距离盒子距离 - 盒子1/2宽
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 约束范围：遮罩层的移动不能超过盒子 盒子的宽是遮罩层的2倍，所以为了保证遮罩层不出去盒子，遮罩层只从0移动到盒子的一半距离也就是遮罩层的宽度
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      // 修改mask和big的top和left实现移动
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 遮罩层和放大后的图片移动是相反的，并且大图宽度是原来图片的2倍，所有放大后图片移动距离为-2倍的遮罩层移动距离
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>