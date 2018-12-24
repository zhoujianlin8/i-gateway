# i-gateway


## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
- npm run stop && EGG_SERVER_ENV=prod|dev|prev npm start

### 网关
- 提供安全可靠的服务访问机制
- 提供统一的用户管理机制
- 统一服务入口

### 网关服务约定
- 各微服务为无状态restful http，不需要进行cookie session等处理权限处理
- 各微服务，如果存在独立用户管理 需要提供用户登陆，注册接口等，接口成功必须返回uid {code:1,data: {uid:xx},msg: 'ok'}
- json接口返回必须是{code:1,data: {},msg: 'ok'}格式
- 除不需要校验的接口其他需要使用`__token__` 前端传入，token值在登陆完成后会返回{token: xxx},当快过期时token值会进行更新，在接口中也会返回更新的{token: xxx}
- 通过网关的用户校验的接口会传入uid给各微服务
- 通用api接口转发规则前端请求后缀为.json

### 提供服务
- 图片验证码${prefix}/verify-code.jpg 图片验证码提交字段约定为code
- 图片上传${prefix}/upload
- 登出${prefix}/logout
- 获取验证token必须已登陆${prefix}/token
- C端登入${prefix}/login
- 是否登录 ${prefix}/is-login
- token自动登录 ${prefix}/token-login?__token__=xxx
- uid自动登录 ${prefix}/uid-login?uid=xx
- uid登录中间跳转 ${prefix}uid-redirect-login?uid=xx&redirect=xxx

### 服务地址
- 预防35环境 http://172.19.240.35:7001
— 内网本地测试环境 http://192.168.0.69:7001/可以访问内网电脑ip测试 修改config.local.js

[egg]: https://eggjs.org
