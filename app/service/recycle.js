const BaseService = require('../util/base');
module.exports = BaseService([
    'capital/capitalOpera/rechargeMoneyBackPass'
],{
    login: async function (ctx) {
        const body = await ctx.login({
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            url: ctx.getPrefixPath('recycle')+'/user/manager/login',
        });
        return body
    }
});