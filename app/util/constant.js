module.exports = {
    platformObj: {
        default: 1,
        recycle: 2,
        finance: 3,
    },
    //token 过期时长
    tokenTimeObj: {
        default: 2 * 60 * 60 * 1000,// 2h
    },
    //token 是否自动加时间
    tokenReNewObj: {
        default: true
    }
}