'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '网关api';
  }
  async json (){
    const ctx = this.ctx;
    const service = ctx.service || {} ;
    ctx.request.paramdata = Object.assign(ctx.request.query|| {},ctx.request.body || {});
    ctx.output(await service[ctx.request.api](ctx));
  }

  async token(){
    const ctx = this.ctx;
    if(ctx.checkUid()) return;
    ctx.createToken();
    ctx.output({})
  }
}

module.exports = HomeController;
