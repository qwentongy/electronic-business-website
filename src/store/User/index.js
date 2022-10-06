import { reqSecurityCode } from "@/api"
import { reqRegister } from "@/api"
import { reqLogin } from "@/api"
import { reqUserInfo } from "@/api"

const actions = {
    // 验证码
    async getSecurityCode(context,phone) {
        let result = await reqSecurityCode(phone)
        // console.log(result);
        if(result.code == 200) context.commit('GETSECURITYCODE',result.data)
    },
    // 请求注册
    async Register(context,data) {
        let result = await reqRegister(data)
        // console.log(result);
        if(result.code !== 200) return Promise.reject(new Error(result.message))
    },
    // 请求登录
    async Login(context,data) {
        let result = await reqLogin(data)
        // console.log(result);
        if(result.code == 200) {
            context.commit('LOGIN',result.data)
            localStorage.setItem('token',result.data.token)
        } else {
            return Promise.reject(new Error(result.message))
        } 
    },
}

const mutations = {
    GETSECURITYCODE(state,data) {
        // console.log(data);
        state.securityCode = data
    },
    LOGIN(state,data) {
        state.token = data.token
        state.userInfo = data
    }
}

const state = {
    securityCode: '',
    token: '',
    userInfo: {}
}

const getters = {

}

export default {
    actions,mutations,state,getters
}