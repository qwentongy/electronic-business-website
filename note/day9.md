加购物车
    跳转路由之前发送求，将要加购的id和数量发给服务器存储
    成功路由跳转与参数传递
        简单的参数用query传递，复杂的对象信息运用会话存储技术
    失败提示失败信息

购物车
    发请求获取数据
    vux三连
    动态展示购物车

修改数量
    需要发送请求修改

删除某一个产品



!!!!!!!!!!
为什么async + await 能解决页面渲染不及时的问题
    是因为异步吗？



常规提交修改数据步骤
    写API，注意是否需要请求头验证，****若需要记得在请求拦截器中添加请求头
    在vuex中actions准备好函数发送请求，若有数据需要存储，则需先判断是什么数据类型在state中准备好空的数据，并在mutation设置存储
    在组件中通过this.$store.dispatch('actions中准备好的函数',数据) ****特别注意该数据若有多个只能通过对象的形式传入{a:a,b:b}，函数参数中通过解构的方法获取单个参数{a,b}
    ****this.$store.dispatch('actions中准备好的函数',数据)  需要放在try catch 中，否则可能会导致页面渲染延迟

    我经常忘记的，用了async忘了用await，vux中忘记导入API



****async await 
        注意在forEach中无法使用await 此时可直接改成for of循环 for(let *** of ***){} 