'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,middlewares } = app;
  const errHandler = middlewares.errorHandler();
  router.get('/', controller.home.index);
  //网关接口
  router.all('/**.json',controller.home.json);

  router.get('/**.jsonp',app.jsonp(),controller.home.json);

  router.post('/*/upload',controller.upload.index);
  router.get('/*/verify-code.jpg',controller.verifycode.index);
  //登陆
  router.post('/*/login',controller.login.index);

  router.get('/*/token',controller.home.token);



  router.get('/*/logout',function (ctx) {
      ctx.session = {};
      ctx.output({});
  });

  router.get('/*/is-login',controller.login.isLogin);
  router.get('/*/token-login',controller.login.tokenLogin);
  router.get('/*/uid-login',controller.login.uidLogin);
  router.get('/*/uid-redirect-login',controller.login.uidRedirectLogin);

/*  //测试
   router.get('/!*!/test',async function (ctx) {
       const body = await ctx.httpRequest({
           url: 'http://172.19.14.200:8090/recycle/capital/capitalOpera/withdrawMoney',
           data: {
               uid: 'xnrxc1qf4s0xhgkme2k0li478kn7mqvd',
               type: '2',
               money: '0.1',
               account: '467011786@qq.com'
           },
           method: 'post'
       });


       ctx.output(body)


   })

    router.get('/!*!/a',async function (ctx) {
        ctx.throw(204,'qqw')
    });*/
};