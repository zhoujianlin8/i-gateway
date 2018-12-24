'use strict';
//线上环境
const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    config.prefixObj = {
        recycle: 'http://172.19.14.200:8090/recycle',
        finance: '',
        'usercenter': 'http://172.19.240.34:8900',
        recycleapi: 'http://172.19.14.200:8081'
    };
    config.logger = {
        dir: path.join(__dirname,`../../${appInfo.name}logs`)
    };
    return config;
};
