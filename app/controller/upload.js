'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
class UploadController extends Controller {
    async index() {
        const ctx = this.ctx;
        const file = ctx.request.files[0] || {};
        if(ctx.checkToken()) return;
        if(!file.filename) return ctx.output('file 不能为空','error');
        const name =  md5.update(path.basename(file.filename)).digest('hex');
        let result;
        try {
            result = await ctx.oss.put(name, file.filepath);
        } finally {
            await fs.unlink(file.filepath);
        }
        if(result){
            ctx.output(result)
        }else{
            ctx.output('文件上传失败','error')
        }
        ctx.type = 'json';
    }
}

module.exports = UploadController;
