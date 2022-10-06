1:vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹:项目依赖文件夹

public文件夹:一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，
webpack进行打包的时候会原封不动打包到dist文件夹中

src文件夹（程序员源代码文件夹）:

    assets文件夹:一般也是放置一些静态资源（一般放置多个组件公用的静态资源），需要注意，放置在assets文件夹里面的静态资源，在webpack打包的时候，webpack会把静态资源当作一个模块，打包JS文件里面。

    components文件夹:一般放置的是非路由组件（全局组件）

    router文件夹:用于放置配置路由

    pages:用于放置路由组件

    App.vue:唯一的根组件，Vue当中的组件
    main.js:程序的入口文件，也是整个程序当中最先执行的文件

babel.config:配置文件（babel相关）

package.json:项目身份证，记录项目叫做什么、项目有哪些依赖、项目怎么运行。

pack-lock.json:缓存性文件

README.md:说明性文件



2:项目的其他配置
    1.项目运行的时候，让浏览器自动打开
        --package.json
        "scripts": {
            "serve": "vue-cli-service serve --open", // 该操作只支持Vue cli4
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        },

    2.eslint校验功能关闭
        --vue.config.js
        module.exports = defineConfig({
        lintOnSave: false
        })

    3.src文件夹简写方法，配置别名@。（@代表的是src文件夹，这样将来文件夹过多，找的时候方便很多）注意:node_modules和dist中不可以使用
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
        "@/*": [
            "src/*"
        ]
    }



3.项目路由的分析
vue-router
    前端所以路由:KV键值对。
    key:URL（地址栏中的路径）
    value:相应的路由组件
    注意:项目上中下结构

    路由组件:
        Home首页路由组件、Search路由组件、login登录路由组件
    非路由组件:
        Header、Footer（首页、搜索页有，登录注册页没有）



4.完成非路由组件Header+Footer业务
    1.书写静态页面（HTML+CSS）
    2.拆分组件
    3.获取服务器的数据动态展示
    4.完成相应的动态业务逻辑

    注意：
        1.创建组件的时候，组件结构 + 组件的样式 + 图片资源
        2.我们一般使用less样式，浏览器不识别less样式，需要通过npm i less-loader安装less-loader进行处理less样式变为css样式。
        3.需要在style标签身上添加lang="less"使组件能识别less

    组件使用步骤（非路由组件）
        -创建
        -引入
        -注册
        -使用
        创建后可直接使用插件自动补全



5.路由组件的搭建
    通过npm i vue-router@3安装3版本router，3版本支持vue2，4版本支持vue3不支持vue2
    该项目路由组件有四个: Home、Search、Login、Register
    components文件夹:一般放置的是非路由组件（全局组件）

    router文件夹:用于放置配置路由

    pages:用于放置路由组件

    1.配置路由
        项目当中配置的路由一般放置在router文件夹中

    2.总结
        路由组件和非路由组件的区别？
        1.路由组件一般放置在pages文件夹，非路由组件一般放置components文件夹中
        2.路由组件一般需要在router文件夹中进行注册（使用的即为组件名字），非路由组件在使用的时候，一般都是以标签的形式使用
        3.注册完路由，不管是路由组件还是非路由组件身上都有$route、$router属性

        $route:一般获取路由信息【路径、query、params等】
        $router:一般进行编程式导航进行路由跳转【push|replace】

    3.路由的跳转
        路由的跳转有两种形式：
        -声明式导航router-link，可以进行路由的跳转
        -编程式导航push|replace，也可进行路由的跳转

        编程式导航:声明式导航能做的，编程式导航都能做
        但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

        路由传参:
        params参数:属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
        query参数:不属于路径当中的一部分，类似于ajax中的queryString /Hone?k=v&kv=,不需要占位



6.Footer组件显示与隐藏
    Footer组件:在Home、Search显示Footer组件
    Footer组件:在登录、注册时候隐藏

    1.我们可以根据组件身上的$route获取当前路由信息，通过路由路径判断Footer显示与隐藏
    2.配置路由的时候，可以给路由添加路由元信息【meta】路由需要配置对象，它的key不能乱写


7.路由传参
    路由跳转有几种方式？
        声明式导航：router-link（务必要有to属性），可以实现路由跳转
        编程式导航：利用的式组件实例的$router.push|replace方法，该方法可以写自己的业务

    路由传参
        params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
        query参数：不属于路径当中的一部分，类似于ajax中的queryString /Hone?k=v&kv=,不需要占位

    如何指定params参数可传可不传
        在配置路由占位符后面添加【？】

    如果传递的参数是空串，路径会出问题如何解决
        使用undefined
        params: {keyword: this.keyword || undefined}

    路由组件能不能传递props数据
        可以，配置路由中添加props:true






