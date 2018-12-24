'use strict';
//线上环境
const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    config.prefixObj = {
        recycle: 'http://192.168.2.118:8090/recycle',
        //'usercenter': 'http://192.168.2.10:8080',
        'usercenter': 'http://172.19.240.35:8900',
        recycleapi: 'http://192.168.2.120:8081',
    };
    return config;
};
