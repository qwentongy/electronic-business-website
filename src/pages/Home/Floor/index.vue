<template>
  <div class="floor">
            <div class="py-container">
                <div class="title clearfix">
                    <h3 class="fl">{{floor.name}}</h3>
                    <div class="fr">
                        <ul class="nav-tabs clearfix">
                            <li :class= 'index==0?"active":""' v-for="(nav,index) in floor.navList" :key="index">
                                <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        <div class="floor-1">
                            <div class="blockgary">
                                <ul class="jd-list">
                                    <li v-for="(keyword,index) in floor.keywords" :key="index">{{keyword}}</li>
                                </ul>
                                <img :src="floor.imgUrl" />
                            </div>
                            <div class="floorBanner">
                                <div class="swiper-container" ref="Swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="carousel in floor.carouselList" :key="carousel.id">
                                            <img :src="carousel.imgUrl">
                                        </div>
                                    </div>
                                    <!-- 如果需要分页器 -->
                                    <div class="swiper-pagination"></div>

                                    <!-- 如果需要导航按钮 -->
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[0]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[1]" />
                                </div>
                            </div>
                            <div class="split center">
                                <img :src="floor.bigImg" />
                            </div>
                            <div class="split">
                                <span class="floor-x-line"></span>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[2]" />
                                </div>
                                <div class="floor-conver-pit">
                                    <img :src="floor.recommendList[3]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Floor',   
    props: ['floor'],
    mounted() {
        // 第一次书写Swiper的时候：在mounted当中书写是不可以的，但是为什么现在可以
        // 第一次的时候，是在当前组件内部法请求，动态渲染解构【前台至少服务器数据需要回来】，因此当年的写法在这里不行
        // 所有数据在父组件已经获取好了直接传给了当前组件
        
        },
        watch: {
            floor: {
                // 立即监听：不管你数据有没有变化，我上来立即监听一次

                immediate:true,
                handler() {
                    // 监听的数据有了但是不确定v-for动态渲染结构有没有完成所以还是需要$nextTick
                    this.$nextTick(() => {
                        var floor1Swiper = new Swiper(this.$refs.Swiper, {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                        });
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>