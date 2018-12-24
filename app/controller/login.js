'use strict';

const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index(ctx) {
         ctx.output(await ctx.login({
             url: ctx.getPrefixPath('usercenter')+'/userManager/loginAndRegister'
         }))
    }
    async isLogin(ctx){
        if(await ctx.checkToken()) return;
        ctx.output({isLogin: true});
    }
    // 通过token设置登录 需要安全校验
    async tokenLogin(ctx){
        const token = ctx.getDataValue('__token__');
        if(!token) return ctx.output({},'error','token不存在');
        const dToken = Buffer.from(token,'base64').toString() || '';
        const arr = dToken.split(';');
        const now = new Date().getTime();
        if(arr[1] < now){
            return ctx.throw(403,'token 已过期')
        }
        if(arr[0]){
            ctx.session.uid = arr[0];
            ctx.session.p = ctx.getPlatform();
            ctx.createToken();
            ctx.output({})
        }else {
            ctx.output({},'error','uid不存在')
        }

    }
    //通过uid设置登录 需要安全校验
    async uidLogin(ctx){
        const uid = ctx.getDataValue('uid');
        if(!uid) return ctx.output({},'error','uid不存在');
        ctx.session.p = ctx.getPlatform();
        ctx.session.uid = uid;
        ctx.createToken();
        ctx.output({})
    }

    async uidRedirectLogin(ctx){
        const redirect = ctx.getDataValue('redirect');
        if(!redirect) return ctx.output({},'error','redirect不存在');
        await this.uidLogin(ctx);
        if(ctx.request.token && ctx.getDataValue('uid')){
            const str = `__token__=${ctx.request.token}`;
            ctx.res.redirect(redirect+(redirect.indexOf('?')=== -1 ? '?':'&')+str)
        }
    }
}

module.exports = LoginController;
