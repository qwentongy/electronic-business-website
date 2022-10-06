<template>
  <div>
    <TypeNav />
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
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTrademarkInfo="getTrademarkInfo"
          @getAttrInfo="getAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive }" @click="changeOrder('1')">
                  <a>
                    综合
                    <span
                      class="iconfont"
                      v-show="isActive"
                      :class="{
                        'icon-jiantou_xiangxia': isAsc,
                        'icon-jiantou_xiangshang': !isAsc,
                      }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: !isActive }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      class="iconfont icon-jiantou_xiangxia"
                      v-show="!isActive"
                      :class="{
                        'icon-jiantou_xiangxia': isAsc,
                        'icon-jiantou_xiangshang': !isAsc,
                      }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/Detail/${good.id}`" href="item.html">
                      <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <Pagination 
          :pageNo="searchParams.pageNo"
          :pageSize="searchParams.pageSize"
          :pageTotal="total"
          :continues="5"
          @changePageNo="changePageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器用的：代表的是当前第几页
        pageNo: 1,
        // 代表的是每一页展示的个数
        pageSize: 10,
        // 平台售卖物品的售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 处理数据，挂载之前将跳转时路由所带的属性合并到searchParams中
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 挂载完毕将处理好的数据发送服务器获取数据
    this.getData();
  },
  computed: {
    // 获取vuex中的getter中的goodsList数据
    ...mapGetters(["goodsList"]),
    // 获取state中的searchList的total属性
    ...mapState({
      total: state=> state.Search.searchList.total
    }),
    // 判断按钮
    isActive() {
      return this.searchParams.order.indexOf(1) != -1;
    },
    // 判断排序
    isAsc() {
      return this.searchParams.order.indexOf("desc") != -1;
    }
  },
  methods: {
    // 向服务器发送请求获取search模块数据（根据参数不同返回不同的数据）
    // 把这次请求封装为一个函数，当你需要调用的时候调用即可
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    // 删除三级菜单路由所带的面包屑
    removeCategoryName() {
      // // 方法一：将数据置空重新发请求渲染
      // this.searchParams.categoryName = ''
      // this.searchParams.category1Id = ''
      // this.searchParams.category2Id = ''
      // this.searchParams.category3Id = ''
      // this.getData()

      // //方法二：直接传空数据请求
      // this.searchParams = {}
      // this.getData()

      // 方法三：传undefined，undefined参数服务器不会传递过去
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();

      // 路由带的参数也应该修改
      this.$router.push({ name: "Search", params: this.$route.params });
    },
    // 删除搜索路由所带面包屑
    removeKeyword() {
      // 将本身隐藏
      this.searchParams.keyword = undefined;
      // 同时将搜索框的文字清除
      this.$bus.$emit("clear");
      // 跳转原路由，删除params.同时触发监听，重新渲染页面
      this.$router.push({ name: "Search", query: this.$route.query });
    },
    // 删除点击商标所带来的面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 删除通过点击属性所带来的面包屑
    removeProp(index) {
      // 通过下标获取删除的是哪一个面包屑
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 点击添加商标面包屑
    getTrademarkInfo(trademark) {
      console.log(trademark);
      // 添加商标信息
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 点击添加属性面包屑
    getAttrInfo(attrId, attrValue, attrName) {
      // 处理属性信息
      let props = `${attrId}:${attrValue}:${attrName}`;
      // 判断原数据是否有该数据，无则添加
      if (this.searchParams.props.indexOf(props) == -1)
        this.searchParams.props.push(props);
      this.getData();
    },
    // 排序操作
    changeOrder(flag) {
      // 判断点击的是哪个按钮，1是综合，2是价格
      // if(flag == '1') {
      //   // 判断原本显示的是哪个按钮
      //   if(this.isActive) {
      //     this.searchParams.order = `${flag}:${this.searchParams.order.split(':')[1] == 'desc'?'asc':'desc'}`
      //     this.getData()
      //   } else{
      //     this.searchParams.order = `${flag}:desc`
      //     this.getData()
      //   }
      // } else{
      //   if(this.isActive) {
      //     this.searchParams.order = `${flag}:desc`
      //     this.getData()
      //   } else{
      //     this.searchParams.order = `${flag}:${this.searchParams.order.split(':')[1] == 'desc'?'asc':'desc'}`
      //     this.getData()
      //   }
      // }

      // 上面自己写的，复杂了，不需要判断点击的是哪一个，直接判断点击和原本显示的按钮是否为一个即可
      // 判断所点击的按钮和原本显示的按钮是否是同一个
      if (flag == this.searchParams.order.split(":")[0]) {
        // 是则不改变按钮，将排序取反
        this.searchParams.order = `${flag}:${
          this.searchParams.order.split(":")[1] == "desc" ? "asc" : "desc"
        }`;
        this.getData();
      } else {
        // 否则改变按钮，并将排序取默认值
        this.searchParams.order = `${flag}:desc`;
        this.getData();
      }
    },
    // 给子组件备好的自定义事件，获取点击页
    changePageNo(pageNo) {
      // console.log(pageNo);
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  watch: {
    // 监听$route不需要添加this，并且需要用''包起来
    $route() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // console.log(this.searchParams);
      // 每一次请求完，应该把1、2、3级分类的id置空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
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
                    margin-left: -5px;
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
  }
}
</style>
