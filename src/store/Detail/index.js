import { reqAddShopCart, reqGoodsInfo } from "@/api"
import { getId_token } from "@/utils/id_token"
const actions = {
    async getGoodsInfo(context,id) {
        let result = await reqGoodsInfo(id)
        // console.log(result);
        if(result.data.code == 200) context.commit('GETGOODSINFO',result.data)
    },
    async addShopCart(context,{skuId,skuNum}) {
        let result = await reqAddShopCart(skuId,skuNum)
        // console.log(result);
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state,data) {
        state.detail = data.data
    }
}

const state = {
    detail: {},
    id_token: getId_token()
}

const getters = {
    // 产品面包屑
    categoryView(state) {
        // 数据没有回来时detail是空对象会报错，添加{}
        return state.detail.categoryView || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.detail.spuSaleAttrList || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.detail.skuInfo || {}
    },

}

export default {
    actions,mutations,state,getters
}