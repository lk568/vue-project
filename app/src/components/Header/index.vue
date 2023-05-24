<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 路由跳转，单纯跳转不需要做其他事情，用声明式导航<router-link> -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home" title="尚品汇">
          <img src="@/assets/images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 用了编程式导航，点击搜索按钮除了跳转到search页面还需要搜集用户输入的信息 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    // 搜索按钮的回调函数，需要向search路由进行跳转，并搜集用户输入信息
    goSearch() {
      // 通过$route搜集用户信息三种方法，常用第三种
      // 1.字符串
      // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase())
      // 2模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 3对象
      // this.$router.push({ name: "search", params: { keyword: this.keyword || undefined }, query: { k: this.keyword.toUpperCase() } })

      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      // 判断query对象是不是空对象  console.log("this.$route.query", Object.keys(this.$route.query).length);
      // 不能直接判断his.$route.query,空对象{}打印为true
      //如果有query参数（不是空对象），跳转的时候加上query参数
      if (Object.keys(this.$route.query).length !== 0) {
        location.query = this.$route.query;
      }
      // 路由跳转
      this.$router.push(location);

      //    面试题1:路由传参（对象写法）path是否可以和params参数一起使用？
      // 答：不可以,路由传参是对象写法可以是name、path形式，但是需要注意path这种写法不能与params参数一起使用
      // this.$router.push({path:"/search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
      //    面试题2：如何指定params参数可传可不传？
      // 答：如果路由要求传递params参数，但是就不传递params参数，此时URL会有问题。
      //    指定params参数可传可不传，需要在配置路由的时候，在占位(/:keyword)的后面加上一个问号?【params可传可不传】
      // this.$router.push({ name: "search", query: { k: this.keyword.toUpperCase() } })
      //    面试题3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
      // 答：params参数可以传递也可以不传递，但是如果传递的是空串，还是会出现URL问题(路由serach路径没有了)
      //    使用undefined解决：params可传可不传(传空串)
      // this.$router.push({ name: "search", params: { keyword: "" || undefined }, query: { k: this.keyword.toUpperCase() } })
      //    面试题4:路由组件能不能传递props数据?
      // 答：可以。有三种方法：具体操作在index.js search路由中
      // 布尔值写法(只能传递params参数)、
      // 对象写法(额外的给路由组件传递一些props)、
      // 函数写法(常用,可以传递params参数、query参数，通过props传递给路由组件)
      //    解决编程式导航多次跳转到同一个路由(参数不变),会抛出NavigationDuplicated警告错误（vue3好像没有这个问题了）
      // 答：通过重写push|replace方法，这两个方法存在于this.$router的隐式原型__proto__上也就是VueRouter的原型对象prototype上
      // console.log(this.$router.__proto__)
    },
  },
  mounted(){
    // 使用事件总线（接收数据），接收到兄弟组件Search的通知，清除搜索框信息
    this.$bus.$on("clear",()=>{
      this.keyword=''
    })
  }
};
</script>
<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>