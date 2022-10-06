<template>
  <div>
        <!-- 商品分类导航 -->
        <TypeNav/>

        <!--列表-->
        <ListContainer/>

        <!--今日推荐-->
        <TodayRecommend/>

        <!-- 商品排行 -->
        <Rank/>

        <!-- 猜你喜欢 -->
        <Like/>

        <!--楼层-->
        <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>

        <!--商标-->
        <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import TodayRecommend from '@/pages/Home/TodayRecommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';
import { mapState } from 'vuex';
export default {
    name: "Home",
    components: { ListContainer, TodayRecommend, Rank, Like, Floor ,Brand},
    mounted() {
        this.$store.dispatch('getFloorList')
    },
    computed: {
        ...mapState({
            floorList: state => state.Home.floorList
        })
    }
}
</script>

<style lang="less" scoped>
        
</style>