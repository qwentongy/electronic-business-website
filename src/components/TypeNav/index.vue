<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
            <div class="container">
                <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
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
                <transition name="sort">
                <div class="sort" v-show="show" @mouseleave="leaveShow">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                        @mouseenter="changeIndex(index)"
                        @mouseleave="leaveIndex"
                        :class="{cur:currentIndex == index}"
                        >
                            <h3>
                                <!-- <a href="">{{c1.categoryName}}</a> -->
                                <a href="javascript:;" :data-categoryName = 'c1.categoryName' :data-cotegory1Id="c1.categoryId">{{c1.categoryName}}</a>
                                <!-- <router-link href="">{{c1.categoryName}}</router-link> -->
                            </h3>
                            <div class="item-list clearfix"
                            :style="{display:currentIndex == index?'block':'none'}"
                            >
                                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a href="javascript:;" :data-categoryName = 'c2.categoryName' :data-cotegory2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a href="javascript:;" :data-categoryName = 'c3.categoryName' :data-cotegory3Id="c3.categoryId">{{c3.categoryName}}</a>
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
        </div>
</template>

<script>
import {mapState} from 'vuex'

// 这种方式会把全部功能引入，会臃肿
// import _ from 'lodash'
// 最好按需引入
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    
    // 组件挂载完毕，可以向服务器发送请求
    mounted() {
        // 通知Vuex发请求，获取数据，存储于仓库当中
        // this.$store.dispatch('categoryList')
        if(this.$route.path !='/Home') this.show = false
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList: state => state.Home.categoryList
        })
    },
    methods: {
        // changeIndex(index) {
        //     this.currentIndex = index
        // },
        changeIndex:throttle(function(index) {
            this.currentIndex = index
        },100),
        leaveIndex() {
            this.currentIndex = -1
        },
        enterShow() {
            this.show = true
        },
        leaveShow() {
            if(this.$route.path !='/Home') this.show = false
        },

        // 不考虑性能可直接给把a标签替换router-link声明式导航，但是每一个router-link都是一个组件，三级联动可能有会创建上千个组件，非常占内存性能
        // 优化性能最好的方法是事件委派 + 编程式导航
        // 问题1：如何确定点击的是a才跳转   问题2：如何区分是一级二级三级分类的标签
        goSearch(event) {
            // 问题1：在a标签中添加自定义属性data-categoryName，其余子节点是没有的
            let {categoryname,cotegory1id,cotegory2id,cotegory3id} = event.target.dataset
            // 如果子节点有data-categoryname（注意浏览器会自动把大写改小写）那一定是标签
            if(categoryname) {
                // 整理路由跳转的参数
                let location = {name:'Search'}
                let query = {categoryName:categoryname}
                if(cotegory1id) {
                    query.category1Id = cotegory1id
                } else if(cotegory2id) {
                    query.category2Id = cotegory2id
                } else {
                    query.category3Id = cotegory3id
                }
                location.query = query
                location.params = this.$route.params
                // console.log(location)
                this.$router.push(location)
            }
        }
    }
}
</script>

<style lang="less" scoped>
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
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .cur {
                            background-color: pink;
                        }
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
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
                        
                        &:hover {
                            // background-color: pink;
                            .item-list {
                                // display: block;
                            }
                        }
                    }
                }
            }
            // 过度动画样式
            .sort-enter {
                height: 0;
            }
            .sort-enter-to {
                height: 461px;
            }
            .sort-enter-active {
                overflow: hidden;
                transition: all .5s linear
            }
        }
    }
</style>