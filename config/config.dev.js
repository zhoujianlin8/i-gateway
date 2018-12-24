'use strict';
//日常环境
const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    config.prefixObj = {
        recycle: 'http://172.19.14.47:8090/recycle',
        recycleapi: 'http://172.19.14.47:8090/recycle'
    };
    return config;
};
