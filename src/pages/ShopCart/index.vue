<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @click="changeIsChecked(cartInfo.skuId, cartInfo.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"
            @click="handle(cartInfo.skuId,-1)"
            >-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handle(cartInfo.skuId,$event.target.value * 1 - cartInfo.skuNum)"
              ref="num"
            />
            <a href="javascript:void(0)" class="plus"
            @click="handle(cartInfo.skuId,1)"
            >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet"
            @click="deleteCartInfo(cartInfo.skuId)"
            >删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" 
        :checked='isChecked'
        @click="changeAllIsChecked($event)"
         />
        <span>全选</span>
      </div>
      <div class="option">
        <a
        @click="deleteCheckedCar"
        >删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    // 通知vuex发请求vuex三连
    getShopCartList() {
      this.$store.dispatch("getShopCart");
    },
    // 更改isChecked 是否选中
    async changeIsChecked(skuId, isChecked) {
      // 传数据要的是准备修改成的状态，当前是选中（1）的话点击就是未选中（0），把要准备变成未选中的（0）传过去
      isChecked == 1?isChecked = 0:isChecked = 1
      // console.log(id, isChecked);
      try {
        await this.$store.dispatch('changeIsChecked',{skuId:skuId, isChecked:isChecked})
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改购买数量
    async handle(id,value) {
      // console.log(id,value);
      if(!isNaN(value)) {
        let skuNum = parseInt(value)
        try {
          await this.$store.dispatch('changeSkuNum',{skuId:id,skuNum:skuNum})
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      } else {
        alert('请输入数字')
      }
    },
    // 删除购物车商品
    async deleteCartInfo(skuId) {
      try {
        await this.$store.dispatch('deleteCartInfo',skuId)
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中得商品
    async deleteCheckedCar() {
      let checkedCarIdList = []
      this.cartInfoList.forEach(carInfo => {
        if(carInfo.isChecked == 1) checkedCarIdList.push(carInfo.skuId)
      })
      // console.log(checkedCarIdList);
      for(let checkedCarId of checkedCarIdList) {
        try {
          // console.log(checkedCarId);
          await this.$store.dispatch('deleteCartInfo',checkedCarId)
          this.getShopCartList()
        } catch (error) {
          alert(error.message);
        }
      }
    },
    // 全选按钮修改所有购物车物品的选中状态
    async changeAllIsChecked(e) {
      // 空数组，用于装购物车商品id
      let cartListIsChecked = []
      // 跟随全选按钮选中状态
      let isChecked = e.target.checked == true? 1:0
      // console.log(e.target.checked);
      // 获遍历购物车商品将每个商品id加入cartListIsChecked
      this.cartInfoList.forEach(carInfo => {
        cartListIsChecked.push(carInfo.skuId)
      })
      // console.log(cartListIsChecked);
      // 遍历将每个skuId传给服务器更改选中状态
      for(let car of cartListIsChecked) {
        try {
          await this.$store.dispatch('changeIsChecked',{skuId:car, isChecked:isChecked})
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      }
      // 注意在forEach中无法使用await 此时可直接改成for of循环 for(let *** of){}
      // cartListIsChecked.forEach(car => {
      //   // console.log(car);
      //   try {
      //     this.$store.dispatch('changeIsChecked',{skuId:car, isChecked:isChecked})
      //   } catch (error) {
      //     alert(error.message);
      //   }
      // });
      // this.getShopCartList();
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车物品列表
    cartInfoList() {
      return this.cartList.cartInfoList;
    },
    // 购物车选中的总价
    totalPrice() {
      let sum = 0;
      if (this.cartInfoList) {
        this.cartInfoList.forEach((carInfo) => {
          if(carInfo.isChecked == 1) sum += carInfo.skuNum * carInfo.skuPrice;
        });
      }
      return sum;
    },
    // 判断底部复选框是否勾选
    isChecked() {
      if(this.cartInfoList){
        // every方法，遍历数组，并且每一项符合要求返回true
        return this.cartInfoList.every(carInfo => carInfo.isChecked == 1)
      } 
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 8%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
