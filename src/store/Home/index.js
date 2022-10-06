import { reqCategoryList } from "@/api"
import { reqBannerList } from "@/api"
import { reqFloorList } from "@/api"

// Home
const actions = {
    async categoryList(context) {
        let result = await reqCategoryList()
        // console.log(result);
        if(result.code == 200) context.commit('CATEGORYLIST',result.data)
    },
    async getBannerList(context) {
        let result = await reqBannerList()
        // console.log(result);
        if(result.data.code == 200) context.commit('REQBANNERLIST',result.data)
    },
    async getFloorList(context) {
        let result = await reqFloorList()
        // console.log(result);
        if(result.data.code == 200) context.commit('REQFLOORLIST',result.data)
    }
}
const mutations = {
    CATEGORYLIST(state,data) {
        state.categoryList = data.slice(0,16)
    },
    REQBANNERLIST(state,data) {
        // console.log(data.data);
        state.bannerList = data.data
    },
    REQFLOORLIST(state,data) {
        // console.log(data.data);
        state.floorList = data.data
    }
}
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters = {}

export default {
    // namespaced: true,
    actions,mutations,state,getters
}