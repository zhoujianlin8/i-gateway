const constant = require('../util/constant');
const formstream = require('formstream');

module.exports = {
    //输出
    output: function (body,type,message,code) {
        const ctx = this;
         let data = {
            code: 1,
            data: body,
            msg: message || 'ok'
        };
         if(ctx.request.token){
             data.token = ctx.request.token;
         }
        const obj = {
            'warn': function () {
                data.code = 0;
                data.msg = message || body || 'warn';
                ctx.body = data;
            },
            'debug': function () {
                ctx.body = data;
            },
            'info': function () {
                ctx.body = data;
            },
            'error': function () {
                data.code = code || 0;
                data.msg = message || body || 'error';
                ctx.body = data;
            }
        };
        (obj[type] || obj['info'])();
    },
    getApi(){
        let api = this.request.api || '';
        const platform = this.session.p;
        if(!api && platform){
            for (let key in constant.platformObj){
                if(constant.platformObj[key] === platform){
                    api = key;
                    break;
                }
            }
        }
        return api;
    },
    getDataValue(key){
        const req = this.request;
        return req.body[key] || req.query[key]
    },

    getPrefixPath: function (api) {
        const ctx = this;
        const key = api || ctx.request.api;
        const config = ctx.app.config.prefixObj || {};
        return config[key];
    },

    getPlatform: function (api) {
        const key = api || this.request.api;
        return constant.platformObj[key] || constant.platformObj['default'];
    },
    checkUid: function (){
        const ctx = this;
        const uid = ctx.session.uid;
        const platform = ctx.session.p;
        if(!uid){
            return ctx.throw(403, '用户未登录');
        }
        if(platform && platform !== this.getPlatform()){
            return ctx.throw(403, '用户未登录');
        }
    },
    //token 与uid 相关  同时只能登陆一个平台
    checkToken: function () {
        const ctx = this;
        const key = ctx.request.api;
        if(this.checkUid()) return;

        const token = ctx.getDataValue('__token__');
        if(!token) return ctx.throw(403,'token 不存在');
        const uid = ctx.session.uid;
        const dToken = Buffer.from(token,'base64').toString() || '';
        const b = constant.tokenReNewObj[key] !== false;
        const arr = dToken.split(';');
        if(arr[0] !== uid){
            return ctx.throw(403,'token 错误')
        }
        const time = constant.tokenTimeObj[key] || constant.tokenTimeObj['default'];
        const now = new Date().getTime();
        if(arr[1] < now){
            return ctx.throw(403,'token 已过期')
        }
        if(b && (arr[1] - now < time/2)){
            this.createToken(key);
        }
    },
    createToken: function () {
        const ctx = this;
        const uid = ctx.session.uid;
        const key = ctx.request.api;
        if(uid){
            const time = constant.tokenTimeObj[key] || constant.tokenTimeObj['default'];
            let token = uid+';'+ (new Date().getTime()+time);
            ctx.request.token =  Buffer.from(token).toString('base64');
        }else{
            console.log('createToken uid 不能为空')
        }
    },
    login: async function (param) {
        const ctx = this;
        let data = param.data || ctx.request.body || {};
        if(!data.code || !ctx.session.c || (data.code.toLowerCase() !== ctx.session.c.toLowerCase())){
            return ctx.throw(0,'验证码错误')
        }
        delete data.code;
        param.data = data;
        const body = await ctx.httpRequest(param);
        if(body){
            ctx.session.uid = body.uid;
            ctx.session.p = ctx.getPlatform();
            ctx.createToken();
        }
        return body
    },
    throw: function(code,message){
        let err = new Error(message);
        err.status = code;
        throw err;
    },
    httpRequest: async function ( param = {}) {
        const ctx = this;
        const req = ctx.req;
        let obj = Object.assign({
            url: ctx.request.url || '',
            data: ctx.request.paramdata || {},
            method: req.method,
            dataType: 'json',
            headers: {
                'Content-Type': param.contentType  || ctx.request.type,
            },
        },param);

        if(obj.headers && obj.headers['Content-Type'] && obj.headers['Content-Type'] === 'multipart/form-data'){
            let form = formstream();
            if(obj.data && typeof obj.data === 'object'){
                for (let key in obj.data){
                    form.field(key,obj.data[key])
                }
            }
            obj.headers = Object.assign(obj.headers,form.headers());
            obj.stream = form;
            delete obj.data
        }
        const url = obj.url;
        delete obj.url;
        const result = await ctx.curl(url, obj);
        if (result.status !== 200) {
            const errorMsg = result.data && result.data.msg ? result.data.msg : 'unknown error';
            ctx.throw(result.status, errorMsg);
        }
        if (result.data.code !== 1) {
            // 远程调用返回格式错误
            ctx.throw(result.data.code, result.data.msg || 'remote response error');
        }
        return result.data.data;
    }
};