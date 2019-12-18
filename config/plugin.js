'use strict';

// had enabled by egg
// exports.static = true;
/*exports.sessionRedis = {
    enable: false,
    package: 'egg-session-redis',
};
   
exports.redis = {
    enable: false,
    package: 'egg-redis',
};*/


exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
};


exports.oss = {
    enable: true,
    package: 'egg-oss',
    client: {
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        endpoint: '',
        timeout: '60s',
    },
};

exports.view = {
    enable: false,
    package: 'egg-view',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',

};

//csrf token 另外实现
;

