import { reqShopCart } from "@/api"
import { reqAddShopCart } from "@/api"
import { reqChangeIsChecked } from "@/api"
import { reqDeleteCartInfo } from "@/api"
const actions = {
    async getShopCart(context) {
        let result = await reqShopCart()
        // console.log(result);
        if(result.code == 200) context.commit('GETSHOPCART',result.data)
    },
    async changeSkuNum(context,{skuId,skuNum}) {
        // console.log(skuId,skuNum);
        let result = await reqAddShopCart(skuId,skuNum)
        // console.log(result);
    },
    async changeIsChecked(context,{skuId,isChecked}) {
        // console.log(skuId,isChecked);
        let result = await reqChangeIsChecked(skuId,isChecked)
        // console.log(result);
    },
    async deleteCartInfo(context,skuId) {
        let result = await reqDeleteCartInfo(skuId)
        // console.log(result)
    }
}

const mutations = {
    GETSHOPCART(state,data) {
        state.shopCartList = data
    }
}

const state = {
    shopCartList: []
}

const getters = {
    cartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    actions,mutations,state,getters
}