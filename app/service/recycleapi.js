const BaseService = require('../util/base');
module.exports = BaseService([
    'product/product/getProductModel',
    'product/product/listByCategoryId',
    'product/category/listCategory',
    'product/brand/listBrand',
    'platform/banner/home',
   // 'order/user/listBusinessOption'
],{});