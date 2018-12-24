
module.exports = function (ignoreUidPaths= [],replaceHanldObj = {}) {
    return async function (ctx) {
        const api = ctx.request.api;
        const path = ctx.req._parsedUrl.pathname;
        const prefix = ctx.getPrefixPath(api);
        const replaceKey = path.replace(/\.json$/g,'').replace(new RegExp(`^\/${api}\/`,'g') ,'');
        if(replaceHanldObj[replaceKey]){
            return await replaceHanldObj[replaceKey](ctx)
        }
        if(ignoreUidPaths.indexOf(replaceKey) === -1){
            await ctx.checkToken();
            ctx.request.paramdata.uid = ctx.session.uid;
            delete  ctx.request.paramdata.__token__;
        }
        return await ctx.httpRequest({
            data: ctx.request.paramdata,
            url : prefix+'/'+replaceKey
        })
    }
};