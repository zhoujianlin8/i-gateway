const BaseService = require('../util/base');
module.exports = BaseService([
    'usermanage/district/findDistrict',
   // 'userManager/sendSmsCode',
    'userManager/loginAndRegister',
    //'usermanage/userAddress/getAddressListByUID',
   // 'usermanage/userAddress/deleteAddress'
],{
    'userManager/sendSmsCode': async function (ctx) {
        const code = ctx.getDataValue('code');
        if (!code || !ctx.session.c || (code.toLowerCase() !== ctx.session.c.toLowerCase())) {
            return ctx.throw(0, '验证码错误')
        }
        delete ctx.request.paramdata.code;
        const body = await ctx.httpRequest({
            data: ctx.request.paramdata,
            url: ctx.getPrefixPath() + '/userManager/sendSmsCode'
        });
        return body

    }
});