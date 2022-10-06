import Vue from "vue";
import Vuex from 'vuex'

// 需要使用插件一次
Vue.use(Vuex)

// const actions = {}
// const mutations = {}
// const state = {}
// const getters = {}

import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import ShopCart from "./ShopCart";
import User from "./User";
// 对外暴露一个Store类的实例
export default new Vuex.Store({
    modules: {
        Home,Search,Detail,ShopCart,User
    }
})