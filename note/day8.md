详情页传递数据时，会由于数据没有及时获取到导致系统报错，该错误无影响，但最好解决
    用计算属性返回原数据若没有数据返回则返回一个[{}]
        return this.xxx || [{}]


数字以外的数 * 1 = NaN
isNaN可以判断数据是否是NaN