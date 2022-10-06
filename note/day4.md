1.开发Search模块中TypeNav商品分类菜单（过度动画效果）
    过度动画：前提组件元素必须要有v-if|v-show指令才可以进行过度动画
    

2.优化三级分类
    每次跳转到主页或搜索页都要重新获取接口数据，因为离开组件组件会销毁，重复挂载获取数据消耗性能
        在app组件挂载时获取，存储到Vuex的state中，后续生成三级菜单组件时只需要获取数据就行了


3.合并params和query参数
    目前点击菜单会传递query参数，点击搜索会传递params参数
    将其合并只需要通过this.$route.params|query添加到没有的那一项就可以了


4.开发Home首页当中的ListContainer组件于Floor组件
    未提供数据接口，这边我们自己生成，通过mock.js生成
    npm i mockjs    注意没有点
    使用步骤
        在项目src目录中创建mock文件夹
        准备JSON数据,在mock文件夹中创建相应的JSON文件，记得格式化，不能有空格，有空格跑不起来
        把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候会原封不动的打包到dist文件夹中】
        开始mock（虚拟数据），创建mockServe.js通过mockjs插件实现模拟数据
            // mock数据：第一个参数请求地址 第二个参数请求数据
            Mock.mock('/mock/banner',{code: 200,data:banner})
            Mock.mock('/mock/floors',{code: 200,data:floors})
        mockServe.js文件在入口文件中引用（至少需要执行一次，才能模拟数据）
            import '@/mock/mockServe/'


5.swiper轮播图
    在public文件夹中准备好swiper的js和css文件，在index.html中引入