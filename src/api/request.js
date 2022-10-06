// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
import store from '@/store'
// 1.创建axios实例
const requests = axios.create({
    // 基础路径
    // baseURL: '/api',
    // 超时时间
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    if(store.state.Detail.id_token) {
        config.headers.userTempId = store.state.Detail.id_token
    }
    if(localStorage.getItem('token')) {
        config.headers.userTempId = localStorage.getItem('token')
    }
    // 进度条开始
    nprogress.start()
    // config:配置对象，对象里面有一个属性很重要，header请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    res => {
        nprogress.done()
        return res.data
    },
    error => console.log(error)
)

export default requests