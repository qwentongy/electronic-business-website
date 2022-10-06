// API统一管理模块
import axios from "axios";
import requests from "./request";

// 三级联动接口
export const reqCategoryList = () => {
  return requests({
    url: "http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList",
  });
};

// 获取banner（Hone首页轮播图接口）
export const reqBannerList = () => {
  return axios({
    url: "/mock/banner",
  });
};

// 获取floor数据 Home子组件
export const reqFloorList = () => {
  return axios({
    url: "/mock/floors",
  });
};

// 获取搜索模块
// 当前这个接口（获取搜索模块的数据，给服务器传递一个默认参数【至少是一个空对象】）
export const reqGetSearchInfo = (params) => {
  return axios({
    url: "http://gmall-h5-api.atguigu.cn/api/list",
    method: "post",
    data: params,
  });
};

// 获取商品详情模块
export const reqGoodsInfo = (params) => {
  return axios({
    url: `http://gmall-h5-api.atguigu.cn/api/item/${params}`,
    method: "get",
  });
};

// 获取购物车数据模块
export const reqShopCart = () => {
  return requests({
    url: "http://gmall-h5-api.atguigu.cn/api/cart/cartList",
  });
};

// 向购物车添加商品
export const reqAddShopCart = (skuId, skuNum) => {
  return requests({
    url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

// 修改购物车中商品是否选中状态
export const reqChangeIsChecked = (skuId, isChecked) => {
  return requests({
    url: `http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${skuId}/${isChecked}`,
  });
};

// 删除购物车中商品
export const reqDeleteCartInfo = (skuId) => {
  return requests({
    url: `http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};

// 获取验证码
export const reqSecurityCode = (phone) => {
  return requests({
    url: `http://gmall-h5-api.atguigu.cn/api/user/passport/sendCode/${phone}`
  })
}

// 请求注册
export const reqRegister = (data) => {
  return requests({
    url: 'http://gmall-h5-api.atguigu.cn/api/user/passport/register',
    data,
    method: 'post'
  })
}

// 请求登录并获取用户信息
export const reqLogin = (data) => {
  return requests({
    url: 'http://gmall-h5-api.atguigu.cn/api/user/passport/login',
    data,
    method: 'post'
  })
}

