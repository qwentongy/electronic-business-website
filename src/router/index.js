// 配置路由的地方
import Vue from 'vue'
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'

// 引入Vuex
import store from '@/store'

// 先把VueRouter原对象上的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，传递哪些参数
// 二三：成功失败回调
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router =  new VueRouter({
    // 配置路由
    routes:[
        {
            path: '/Home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            name: 'Search',
            // path: '/Search',
            path: '/Search/:keyword?',
            component: Search,
            meta: {
                show: true
            }
        },
        {
            name: 'Login',
            path: '/Login',
            component: Login
        },
        {
            name: 'Register',
            path: '/Register',
            component: Register
        },
        {
            path: '/Detail/:id',
            component: Detail
        },
        {
            path: '/ShopCart',
            component: ShopCart
        },
        {
            path: '/AddCartSuccess',
            name: 'AddCartSuccess',
            component: AddCartSuccess
        },
        {
            path:'*',
            redirect:'/Home'
        }
    ],
    scrollBehavior() {
        // 返回的y=0表示跳转滚动条高度为0，x则为横向滚动条
        return {x:0,y:0}
    }
})

// router.beforeEach((to,from,next) => {
//     console.log(store.state.User.userInfo);
//     if(store.state.User.token) {
//         console.log(2);
//         next()
//     } else {
//         try {
//             console.log(1);
//             this.store.dispatch('Login',loginInfo)
//             next()
//         } catch (error) {
//             alert(error.message)
//         }
//     }
// })

export default router