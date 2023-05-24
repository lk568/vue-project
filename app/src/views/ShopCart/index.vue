<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.skuId"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="checkCart(cartInfo.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con4">
            <button
              class="mins"
              @click="changeNum($event, cartInfo, -1)"
              :disabled="cartInfo.skuNum === 1"
            >
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              maxlength="8"
              minnum="1"
              class="itxt"
              :value="cartInfo.skuNum"
              @change="
                changeNum(
                  $event,
                  cartInfo,
                  $event.target.value * 1 - cartInfo.skuNum
                )
              "
              oninput="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
            />
            <!-- input输入框使用正则将不是数字(包括小数)的替换为空，并且0开头的去掉0  如001=1 00102=102 -->
            <button class="plus" @click="changeNum(null, cartInfo, 1)">
              +
            </button>
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con6">
            <a class="sindelet" @click="deteleCart(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- v-model和单选框结合 -->
        <input
          class="chooseAll"
          type="checkbox"
          v-model="isAllChecked"
          :disabled="cartInfoList.length === 0"
        />
        <span>全选 {{ isAllChecked }}</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedInfo">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters("shopcart", ["cartListValue"]),
    // 商品数组
    cartInfoList() {
      return this.cartListValue.cartInfoList || [];
    },
    // 商品是否全选  数组every方法，判断数组中所有元素是否都符合某条件，是返回true，否返回false
    // 只要有一个没选 即有一个元素的isChecked不为1，那就不是全选
    isAllChecked: {
      get() {
        // 如果购物车中商品数量为零，直接return 返回值为false，即全选按钮变成未勾选状态
        if (this.cartInfoList.length <= 0) return;
        return this.cartInfoList.every((item) => item.isChecked === 1);
      },
      async set(value) {
        const promises = this.cartInfoList.map((item) => {
          //console.log(value*1);//value为全选按钮是否勾选的状态checked属性值true或false true*1=1，false*1=0
          //  利用v-model根据全选按钮的状态去改变所有商品按钮的状态，就是将全选按钮checked的属性值true|false * 1 得到1|0，让所有商品的isChecked值跟全选按钮checked值相同(因为所有按钮的checked是根据isChecked判断的)
          return this.$store.dispatch("shopcart/checkCart", {
            skuId: item.skuId,
            isChecked: value * 1,
          });
        });
        await Promise.all(promises)
        .then((resolve) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
    // 获取所有商品的选中状态0..
    // 商品总个数
    totalNum() {
      return this.cartInfoList.reduce((sum, item) => sum + item.skuNum, 0);
    },
    // 总价函数
    totalPrice() {
      return this.cartInfoList.reduce(
        (sum, item) => sum + item.skuNum * item.skuPrice,
        0
      );
    },
    // 已经勾选的商品组成的数组
    checkedCartInfo() {
      // filter 返回所有满足条件(已勾选)的数组元素组成的新数组
      return this.cartInfoList.filter((item) => item.isChecked === 1);
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("shopcart/cartList");
    },
    // 改变商品数量函数 第1个参数是事件委托 第2个参数是确定哪一个商品，第3个参数changeNum是商品的数量变化
    changeNum: throttle(async function ($event, cartInfo, changeNum) {
      // 解构cartInfo skuId确定是哪一个商品，skuNum是上次更新后的商品数量
      const { skuId, skuNum } = cartInfo;
      // 商品数量不能为负
      if (skuNum + changeNum > 0) {
        await this.$store
          .dispatch("shopcart/addToCart", { skuId, skuNum: changeNum })
          .then((resolve) => {
            // console.log(resolve);
            this.getData();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 如果输入0，变为原来的
        $event.target.value = skuNum;
        alert("不能再少了哦");
      }
    }, 1000),
    // 删除购物车
    async deteleCart(skuId) {
      await this.$store
        .dispatch("shopcart/deleteCart", skuId)
        .then((resolve) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 改变勾选状态
    async checkCart(skuId, $event) {
      let isChecked = $event.target.checked ? 1 : 0;
      await this.$store
        .dispatch("shopcart/checkCart", { skuId, isChecked })
        .then((resolve) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除所有勾选的商品【重点看看】
    async deleteCheckedInfo() {
      if (this.checkedCartInfo.length === 0) return;
      if (window.confirm("你确定要删除吗？")) {
        // 将派发后的结果利用map方法存储到数组promises中
        const promises = this.checkedCartInfo.map((item) => {
          return this.$store.dispatch("shopcart/deleteCart", item.skuId);
        });
        await Promise.all(promises)
        .then((resolve) => {
          // 当全部promise的的返回结果都成功了，在进行重新获取数据
            // console.log(resolve);
            this.getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;
        }

        .cart-list-con4 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con5 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>