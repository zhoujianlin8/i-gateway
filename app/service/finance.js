const BaseService = require('../util/base');
module.exports = BaseService([],{
    login: async function (ctx) {
        const body = await ctx.login({
            url: ctx.getPrefixPath()+'/usermanage/login',
        });
        return body
    }
});