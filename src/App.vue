<template>
  <div id="app">
    <Header/>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 可以使用v-show判断是否显示Footer -->
    <!-- <Footer v-show="$route.path == '/Home' || $route.path == '/Search'"/> -->
    <!-- 上面的方式不建议使用，组件多的时候没办法每个都写判断 -->
    <!-- 一般在路由中配置元信息，通过元信息判断 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
