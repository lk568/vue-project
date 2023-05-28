<!-- 这是Search模块 -->
<template>
  <div>
    <type-nav></type-nav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索框关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑  这里对品牌id和name做了字符串分隔，因为传递的参数是"ID:Name",但只需要展示name-->
            <!-- 注意：如果用v-show，删除面包屑时不能将trademark置为undefined，会报错因为undefined读取不了split，因为v-show是隐藏元素但是结构还在；而v-if是直接删除元素结构不在了。如果非要使用v-show，只能是将trademark置为空字符串"",对空字符串分隔不会报错-->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台属性信息的面包屑 这里用户每点击一个属性就显示一个面包屑，不能用v-if了，要用v-for -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector
          @trademarksInfo="trademarksInfo"
          @attrInfo="attrInfo"
        ></SearchSelector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合销量价格评价 切换栏 -->
                <li
                  :class="{ active: this.searchParams.order.includes('1') }"
                  @click="changeOrder('1')"
                >
                  <!-- orderIcon决定是上还是下 v-if判断是否显示 -->
                  <a
                    >综合
                    <i
                      :class="orderIcon"
                      v-if="this.searchParams.order.includes('1')"
                    ></i
                  ></a>
                </li>
                <li
                  :class="{ active: this.searchParams.order.includes('2') }"
                  @click="changeOrder('2')"
                >
                  <a
                    >价格
                    <i
                      :class="orderIcon"
                      v-if="this.searchParams.order.includes('2')"
                    ></i
                  ></a>
                </li>
                <!-- 下面两个没有对应数据，以后补充数据-->
                <li><a>销量</a></li>
                <li><a>评价</a></li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goods in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 导航式路由跳转到商品详情页 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 props通信 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :totalPages="totalPages"
            :continues="5"
            @getPageNo="getPageNo"
            @getPageSize="getPageSize"
          ></Pagination>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SearchSelector from "@/views/Search/SearchSelector";
export default {
  name: "Search",
  // 路由组件可以传递props
  // props:['a','b']
  props: ["keyword", "k"],
  data() {
    return {
      searchParams: {
        // 一级分类Id
        category1Id: "",
        // 二级分类Id
        category2Id: "",
        // 三级分类Id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 用户搜索框中输入的关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器，显示第几页
        pageNo: 1,
        // 每一页显示的数据个数
        pageSize: 10,
        // 平台操作页点击时携带的参数
        props: [],
        // 品牌名
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 确保在第一次【从home跳转到search】发送请求之前，将改变后的参数带给服务器【将发送请求携带的参数做修改】
    this.searchParams = {
      ...this.searchParams,
      ...this.$route.query,
      ...this.$route.params,
    };
    // console.log("发请求之前更新数据",this.searchParams);
  },
  mounted() {
    this.getData();
  },
  watch: {
    // 监听$route是否发生变化，来确定是否需要重新发送请求
    $route(newValue, oldValue) {
      // 每次请求之前清除上次请求缓存的categoryxId值，确保本次请求中不包含多余的categoryxId值
      // 例如【上次请求携带的为category3Id，本次请求是category1Id那么就不需要再携带category3Id了】
      // 带给服务器的参数都是可选的，不需要的参数可以置为空字符串，但如果是空字符串仍然会将参数带给服务器，可以将其置为undefined，就不会带给服务器了，可以提高性能
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 只需要清除这三级分类的id，其他的不需要清除【如果清除其他的，那么请求不就是白发了】
      this.searchParams = {
        ...this.searchParams,
        ...this.$route.query,
        ...this.$route.params,
      };
      this.getData();
    },
  },
  computed: {
    // ...mapState({
    //    trademarkList:(state)=>{
    //       return state.search.searchList.trademarkList
    //    }
    // }),
    ...mapState("search", {
      // 防止没有网，没网请求到的searchList是undefined 而undefined.xxxxsList就会报错；
      // 解决方法：正常是返回一个数组，那就给一个默认值空数组
      goodsList: (state) => state.searchList.goodsList || [],
      attrsList: (state) => state.searchList.attrsList || [],
      trademarkList: (state) => state.searchList.trademarkList || [],
      // 分页器数据
      total: (state) => state.searchList.total,
      totalPages: (state) => state.searchList.totalPages,
    }),
    // 判断Icon图标使用哪一个（上还是下）
    orderIcon() {
      return this.searchParams.order.split(":")[1] === "desc"
        ? "el-icon-bottom"
        : "el-icon-top";
    },
  },
  methods: {
    getData() {
      // 接口返回的数据格式，第二个参数要传递一个对象
      this.$store.dispatch("search/searchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName() {
      // 删除面包屑 ，删除:清空name和id,然后重新发送请求
      // 带给服务器的参数都是可选的，不需要的参数可以置为空字符串，但如果是空字符串仍然会将参数带给服务器，可以将其置为undefined，就不会带给服务器了，可以提高性能
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // this.getData()  下面有路由跳转会发送请求，不需要再发送请求了，不然会发送2次请求
      // 进行路由跳转，清除地址栏中的query参数，但还要保留params参数；即如果params参数存在就
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removeKeyword() {
      // 删除面包屑 ，删除:清空keyword,然后重新发送请求
      // 带给服务器的参数都是可选的，不需要的参数可以置为空字符串，但如果是空字符串仍然会将参数带给服务器，可以将其置为undefined，就不会带给服务器了，可以提高性能
      this.searchParams.keyword = undefined;
      // 使用事件总线（提供数据），通知兄弟组件Header清除关键字（搜索框中）
      this.$bus.$emit("clear");
      // this.getData()
      // 进行路由跳转，清除地址栏中的params参数，但还要保留query参数；即如果query参数存在就
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 使用子组件SearchSelector传递的自定义事件trademarksInfo和品牌的数据
    trademarksInfo(trademarksInfo) {
      // console.log("父组件",trademarksInfo);
      // 整理品牌字段参数 "ID:品牌名称"  重复点击同一个只发一次请求
      if (
        this.searchParams.trademark !==
        `${trademarksInfo.tmId}:${trademarksInfo.tmName}`
      ) {
        this.searchParams.trademark = `${trademarksInfo.tmId}:${trademarksInfo.tmName}`;
        // 发送请求
        this.getData();
      }
    },
    // 删除品牌面包屑及其信息
    removeTrademark() {
      // 删除后置空品牌信息
      this.searchParams.trademark = undefined;
      // 再次发送请求
      this.getData();
    },
    // 平台售卖信息属性的信息，（自定义事件，由子组件传递过来）
    attrInfo(attrs, attrValue) {
      // console.log(attrs,attrValue);
      // 整理数据参数，将数据赋给父组件 "id:属性值:属性名"
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // 对数据去重，重复点击无效，每个属性只显示一次
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
        // this.searchParams.props = [...new Set(this.searchParams.props)]
        this.getData();
      }
    },
    // 删除平台售卖信息面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发送请求
      this.getData();
    },
    // 排序的
    changeOrder(newOrderFlag) {
      let [orderFlag, orderType] = this.searchParams.order.split(":");
      if (newOrderFlag === orderFlag) {
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        orderFlag = newOrderFlag;
        orderType = "desc";
      }
      // 改变排序状态 "1/2:desc/asc"
      this.searchParams.order = `${orderFlag}:${orderType}`;
      // 再次发送请求
      this.getData();
    },
    // 自定义事件：子组件Pagination传递的，获取当前页码
    getPageNo(newPageNo) {
      // 更新页码
      this.searchParams.pageNo = newPageNo;
      // 发送请求
      this.getData();
    },
    // 自定义事件：子组件Pagination传递过来的，获取当前页展示多少条数据
    getPageSize(newPageSize) {
      // 改变展示的个数，重新发请求
      this.searchParams.pageSize = newPageSize;
      this.getData();
    },
  },
};
</script>
<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 2px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 2px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>