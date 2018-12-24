module.exports = () => {
    return async function serviceExits(ctx, next) {
        let pathKey;
        ctx.req.url.replace(/^\/([^\\/\.]+)/,function (w,$1) {
            pathKey = $1;
        });
        const service = ctx.service || {} ;
        if(service[pathKey]){
            ctx.request.api = pathKey;
            await next(ctx);
        }
    };
};