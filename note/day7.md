分页器
    同时展示数据太多，采用分页，一次加载一页

    需要知道的数据
        1.pageNo：当前第几页
        2.pageSize：每一页需要展示多少数据
        3.pageTotal：一共多少数据
    页码的个数一般是5|7，因为奇数才是对称的（好看）
    总结：对于分页器而言需要提前知道的四个条件
        4.continues：代表分页连续页码数

    自定义分页器：先用假数据调试，好了再换真数据

    获取开始和结束页码
        let start = 0
            let end = 0
            if(this.continues > this.pageTotal) {
                start = 1
                end = this.pageTotal
            } else {
                start = this.pageNo - parseInt(this.continues/2)
                end = this.pageNo + parseInt(this.continues/2)
                if(start < 1) {
                    start = 1
                    end = this.pageTotal
                }
                if(end > this.pageTotal) {
                    end = this.pageTotal
                    start = this.pageTotal - this.continues + 1
                }
            }
            return {start,end}

    分页器动态展示，分为上中下,并且根据页码数给当前页码添加背景颜色


开发某一个产品的详情页
    1.静态组件
    2.发请求
    3.vuex
    4.动态展示组件

    当点击商品的时候，跳转到详情页面，在路由跳转的时候需要传递产品的id给详情页面

    跳转路由时发现，滚动条不会回到顶端，此时需要在路由中添加
    scrollBehavior() {
        return {x:0,y:0}
    }

    开始请求API
    
    vuex

    动态渲染