// Search
import {reqGetSearchInfo} from '@/api'
const actions = {
    async getSearchInfo(context,params={}) {
         let result = await reqGetSearchInfo(params)
         if(result.data.code) context.commit('GETSEARCHINFO',result.data)
    }
}
const mutations = {
    GETSEARCHINFO(state,value) {
        state.searchList = value.data
    }
}
const state = {
    searchList: {}
}
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}

export default {
    // namespaced: true,
    actions,mutations,state,getters
}