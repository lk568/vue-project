<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 全部商品分类和三级列表外包一个盒子，把鼠标移出事件放在这，就可以实现只有移出全部商品分类时背景色才会消失 -->
      <!-- 利用了事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- transition标签，动画标签，过渡样式：用类v-enter/leave等设置；如果设置了name属性，类名为<name>-enter/leave -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @click="goSearch"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex === index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级和三级分类 -->
                <!-- 使用v-show或者:style控制二三级分类的显示与隐藏 使用v-show的话item-list类不能加display属性 -->
                <div class="item-list clearfix" v-show="currentIndex === index">
                  <!-- <div class="item-list clearfix" :style="{display:currentIndex === index ? 'block':'none'}"> -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入mapState获取仓库数据
import { mapState } from "vuex";
// 引入lodash  这是将lodash所有函数都引入了,不好
// import _ from "lodash";
// 最好按需加载 是默认暴露不需要{}
import throttle from "lodash/throttle";
export default {
  name: "type-nav",
  data() {
    return {
      currentIndex: -1,
      // 控制Search页面的三级列表显示和隐藏
      isShow: true,
    };
  },
  // 组件挂载完毕，可以向服务器发送请求
  mounted() {
    // 判断如果不是home页面，就隐藏商品分类列表
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    // 通过mapState获取vuex仓库数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList.slice(0, 16);
      },
    }),
  },
  methods: {
    // 用于修改组件实例身上的currentIndex值
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移出 商品列表一级列表隐藏
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    // 鼠标移入 商品列表一级列表显示
    enterShow() {
      this.isShow = true;
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 跳转时携带参数
      // 最好解决办法：编程式导航 + 事件委托 + 自定义属性data-categoryName、data-category1Id
      // 解构自定义属性dataset
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果标签身上有categoryname一定是a标签
      if (event.target.tagName === "A") {
        // 整理路由跳转所需参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 通过自定义属性categoryxid判断是几级列表，给query添加category?id属性
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 先判断有没有带params参数，如果有params参数，那么路由跳转时带上params参数
        // console.log("this.$route.params",this.$route.params);
        if (Object.keys(this.$route.params).length!==0) {
          location.params = this.$route.params;
        }
        // 合并路由跳转所需参数  this.$router.push({name:"search",params:{}})
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
  },
};
</script>
<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 463px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28.8px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background-color: skyblue;
          }
          //   h3:hover{
          //     background-color: skyblue;
          //   }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    //过渡动画的样式
    //  过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    //  过渡动画结束状态（进入）
    .sort-enter-to {
      height: 463px;
      // transform: rotate(360deg);
    }
    // 定义动画的时间、速率 (进入)
    .sort-enter-active {
      overflow: hidden;
      transition: all 0.5s linear;
    }
    //  过渡动画开始状态（移出）
    .sort-leave {
      height: 463px;
    }
    //  过渡动画结束状态（移出）
    .sort-leave-to {
      height: 0px;
    }
    //  定义动画的时间、速率（移出）
    .sort-leave-active {
      overflow: hidden;
      transition: all 0.5s linear;
    }
  }
}
</style>