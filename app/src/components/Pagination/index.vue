<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="GetPageNo(pageNo - 1)">
      上一页
    </button>
    <!-- start等于第一个时，第一页对应按钮隐藏 -->
    <button
      v-if="startEnd.start !== 1"
      @click="GetPageNo(1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <!-- 当连续页开始页start小于等于2时隐藏... -->
    <button v-if="startEnd.start > 2">···</button>

    <!-- v-for和v-if不能一起使用 -->
    <template v-for="(page, index) in startEnd.end">
      <button
        :key="index"
        v-if="page >= startEnd.start"
        @click="GetPageNo(page)"
        :class="{ active: pageNo === page }"
      >
        {{ page }}
      </button>
    </template>

    <!-- 当连续页结束页end大于等于总页数-1时，隐藏... -->
    <button v-if="startEnd.end < totalPages - 1">···</button>
    <!-- end等于最后一个时，最后一页对应按钮隐藏 -->
    <button
      v-if="startEnd.end !== totalPages"
      @click="GetPageNo(totalPages)"
      :class="{ active: pageNo === totalPages }"
    >
      {{ totalPages }}
    </button>
    <button :disabled="pageNo === totalPages" @click="GetPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 20px">共 {{ total }} 条数据</button>
    <!-- 每页展示的数据条数，可以更改，利用v-model+watch+emit实现 -->
    <template>每页展示数据条数: {{ newPageSize }}</template>
    <select v-model="newPageSize" style="margin: 5px 0 0 10px">
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "totalPages", "continues"],
  data() {
    return {
      newPageSize: 10,
    };
  },
  computed: {
    // 分页器连续页码开始与结束函数
    startEnd() {
      // 先定义两个变量保存开始与结束编码
      let start = 0,
        end = 0;
      // 当连续页码超过总页码时：直接全部展示{1,总页码}
      if (this.continues > this.totalPages) {
        start = 1;
        end = this.totalPages;
      } else {
        // 连续页码没超过总页码：开始页码=当前页码-连续页码数(一般为奇数)/2向下取整；结束页码=当前页码+连续页码数(一般为奇数)/2向下取整
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 小bug：开始页码不能小于1（当前页码为1-2=-1、2-2=0），结束页码不能超过总页码
        // 当前页位于前几页(start为负数或零时)，应该是{1,continues}
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 当前页位于后几页(结束页码大于了总页数)，应该是{,totalPages}
        if (end > this.totalPages) {
          // 保证最后是 {总页码-连续页码数+1到总页码}长度为连续页码数
          start = this.totalPages - this.continues + 1;
          end = this.totalPages;
        }
      }
      return { start, end };
    },
  },
  methods: {
    // 获取点击后的页码，传递给父组件Search，使其发送请求显示相应数据
    GetPageNo(newPageNo) {
      this.$emit("getPageNo", newPageNo);
    },
  },
  watch: {
    newPageSize(newValue, oldValue) {
      this.$emit("getPageSize", this.newPageSize);
    },
  },
};
</script>
  
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: pink;
      color: #fff;
    }
  }
}
</style>
  