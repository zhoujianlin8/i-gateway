'use strict';
const fs = require('fs');
const path = require('path');
//主要参数
module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1540202073500_154';

    // add your config here
    config.middleware = ['errorHandler','serviceExits'];

    config.prefixObj = {

    };
    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.png')),
    };
    config.serviceExits = {
        ignore: /^\/$/
    };

    config.security = {
        domainWhiteList: ['http://localhost:3000','http://localhost:8000','http://localhost:8001','http://127.0.0.1:3000','http://192.168.2.23:8000'],
        csrf: {
            enable: false,
        },
    };

    config.multipart = {
        match: /\/upload$/
    };

    config.cors = {
        credentials: 'true'
    };
    return config;
};
