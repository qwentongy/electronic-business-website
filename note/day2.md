1.编程式路由跳转到当前路由（参数不变），多次执行会抛出navigationDuplicated的警告错误
    路由跳转有两种形式：声明式导航、编程式导航
    声明式导航没有这类问题，因为vue-router底层已经处理好了

    为什么编程式导航进行路由跳转的时候，就有这种错误？
        最新的vue-router引入了promise，只有第一次有回调多次没有响应的回调函数，所以报错
    如何解决
        添加上对应的回调函数，但该方法治标不治本
        重写push方法
            // 先把VueRouter原对象上的push保存一份
            let originPush = VueRouter.prototype.push;
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




2.Home模块组件拆分
    先把静态页面完成
    拆分出静态组件
    获取服务器的数据进行展示
    动态业务



3.三级联动组件完成
    由于三级联动，在Home，Search，Detail,把三级联动注册为全局组件
        好处：只需要注册一次，就可以在项目任何地方使用


4.完成其他静态组件
    HTML + CSS + 图片资源 信息【结构、样式、图片资源



5.POSTMAN测试接口
    如果服务器返回的数据code字段200，代表服务器返回数据成功
    整个项目，接口前缀都有/api



6.axios二次封装
    // 对于axios进行二次封装
    import axios from 'axios'

    // 1.创建axios实例
    const requests = axios.create({
        // 基础路径
        baseURL: '/api',
        // 超时时间
        timeout: 5000,
    })

    // 请求拦截器
    requests.interceptors.request.use((config) => {
        // config:配置对象，对象里面有一个属性很重要，header请求头
        return config
    })

    // 响应拦截器
    requests.interceptors.response.use(
        res => res.data,
        error => console.log(error)
    )

    export default requests


7.接口统一管理
    项目很小：完全可以在组件的声明周期函数中法请求
    项目很大：axios.get('xxx')

    跨域问题：协议、域名、端口号不同，简称跨域
        JSONP,cors,代理服务器



8.nprogress进度条的使用
    npm i nprogress
    引入nprogress 并且必须引入nprogress样式才有效果样式可修改
    nprogress.start() 一般放在请求拦截器中
    nprogress.done() 一般放在响应拦截器的成功回调中



9.vuex状态管理库
    vuex是什么
        vuex是官方提供的一个插件，状态管理库，集中式管理项目组件中的数据
        并不是所有项目都需要用Vuex，小项目完全不需要Vuex，大项目组件数据多才使用
    action
    mutations
    state
    getters
    module
