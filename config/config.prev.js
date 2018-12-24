'use strict';
//预发环境
const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    config.prefixObj = {
        recycle: 'http://172.19.240.35:8090/recycle',
        'usercenter': 'http://172.19.240.35:8900',
        recycleapi: 'http://172.19.240.35:8081'
    };
    return config;
};
