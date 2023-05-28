<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="myOrder in myOrderList.records"
          :key="myOrder.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ myOrder.createTime }}&nbsp;订单编号：{{
                    myOrder.outTradeNo
                  }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(orderDetailList, index) in myOrder.orderDetailList"
              :key="orderDetailList.id"
            >
              <td width="60%">
                <div class="typographic">
                  <img
                    style="
                       {
                        width: 100px;
                        height: 100px;
                      }
                    "
                    :src="orderDetailList.imgUrl"
                  />
                  <a class="block-text">{{ orderDetailList.skuName }}</a>
                  <span>x{{ orderDetailList.skuNum }}</span>
                  <a class="service">售后申请</a>
                </div>
              </td>
              <!-- 用户买的商品循环占不同单元格，但后面的收货人需要合并单元格，合并的个数根据商品数量变化，
                并且需要隐藏利用index===0 也就是只要循环时候的第1个商品的后部分单元格，后面商品的隐藏-->
              <template v-if="index === 0">
                <td
                  :rowspan="myOrder.orderDetailList.length"
                  width="8%"
                  class="center"
                >
                  {{ myOrder.consignee }}
                </td>
                <td
                  :rowspan="myOrder.orderDetailList.length"
                  width="13%"
                  class="center"
                >
                  <ul class="unstyled">
                    <li>总金额¥{{ myOrder.totalAmount }}.00</li>
                    <li>在线支付</li>
                  </ul>
                </td>
                <td
                  :rowspan="myOrder.orderDetailList.length"
                  width="8%"
                  class="center"
                >
                  <a href="#" class="btn">{{ myOrder.orderStatusName }} </a>
                </td>
                <td
                  :rowspan="myOrder.orderDetailList.length"
                  width="13%"
                  class="center"
                >
                  <ul class="unstyled">
                    <li>
                      <a href="mycomment.html" target="_blank">评价|晒单</a>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页器 props通信 -->
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="myOrderList.total"
          :totalPages="myOrderList.pages"
          :continues="5"
          @getPageNo="getPageNo"
          @getPageSize="getPageSize"
        ></Pagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page: 1,
      limit: 5,
      // 我的订单数据
      myOrderList: {},
    };
  },
  mounted() {
    // 获取我的订单
    this.getMyOrderList();
  },
  methods: {
    // 获取我的订单
    async getMyOrderList() {
      let { page, limit } = this;
      let result = await this.$API.reqMyOrderList(page, limit);
      if (result.code === 200) {
        this.myOrderList = result.data;
      }
    },
    // 分页器 获取当前页码
    getPageNo(newPageNo) {
        // 更新当前页码
      this.page = newPageNo;
      this.getMyOrderList();
    },
    // 分页器 获取每页展示数量
    getPageSize(newPageSize) {
        // 更新每页展示数量
      this.limit = newPageSize;
      this.getMyOrderList();
    },
  },
};
</script>

<style>
</style>