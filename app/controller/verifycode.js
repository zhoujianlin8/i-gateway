
'use strict';
const Controller = require('egg').Controller;
class VerifyCodeController extends Controller {
    async index() {
        const ctx = this.ctx;
        ctx.type = 'image/jpeg';
        const body = await ctx.httpRequest({
            url: ctx.getPrefixPath('usercenter')+'/userManager/validateCode',
            //url: ctx.getPrefixPath('recycle')+'/user/manager/validateCode',
            method: 'get'
        });
        if(body){
            ctx.session.c = body.code;
            ctx.body = Buffer.from(body.img, 'base64');
        }
    }
}
module.exports = VerifyCodeController;
