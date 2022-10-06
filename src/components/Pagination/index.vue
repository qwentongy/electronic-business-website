<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="getPageNo(pageNo-1)">上一页</button>
        <button v-show="getStartNoAndEndNo.start >= 2" @click="getPageNo(1)" :class="{active:pageNo==1}">1</button>
        <button v-show="getStartNoAndEndNo.start > 2">···</button>

        <!-- 中间部分 -->
        <button
        v-for="(page,index) in getStartNoAndEndNo.end" :key="index"
        v-if="getStartNoAndEndNo.start <= page"
        @click="getPageNo(page)"
        :class="{active:pageNo==page}"
        >{{page}}</button>

        <button v-show="getStartNoAndEndNo.end < pageTotalNos - 1">···</button>
        <button  v-show="getStartNoAndEndNo.end != pageTotalNos" @click="getPageNo(pageTotalNos)" :class="{active:pageNo==pageTotalNos}">{{pageTotalNos}}</button>
        <button :disabled="pageNo==pageTotalNos" @click="getPageNo(pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{pageTotal}} 条</button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['pageNo','pageSize','pageTotal','continues'],
    computed: {
        pageTotalNos() {
            // 向上取整，获取一共多少页
            return Math.ceil(this.pageTotal/this.pageSize)
        },
        getStartNoAndEndNo() {
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
                    end = this.continues
                }
                if(end > this.pageTotalNos) {
                    end = this.pageTotalNos
                    start = this.pageTotalNos - this.continues + 1
                }
            }
            return {start,end}
        }
    },
    methods: {
        getPageNo(pageNo) {
            this.$emit('changePageNo',pageNo)
        }
    }

}
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>