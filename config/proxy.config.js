// 这里只提供基本用法 , 更多配置请参考 http-proxy-middleware readme:http://www.voidcn.com/article/p-etuniecs-bqr.html
function onProxyReq(proxyReq, req, res) {
    // add custom header to request 
    proxyReq.setHeader('x-added', 'foobar');
    proxyReq.setHeader('Origin', 'http://dev.test.com');
    proxyReq.setHeader('Referer', 'http://dev.test.com');
}


module.exports = {
   
    '/proxy-api': {
        target: 'http://dev.test.com',
        changeOrigin: true,
        withCredentials: true,
        onProxyReq:onProxyReq,
        pathRewrite: function (path, req) { 
            //console.log('current request proxy-api : ' + path)
            return path.replace('/proxy-api', '') 
        }
    }, 
   
    '/mock-api': {
        target: 'http://127.0.0.1:9002',
        changeOrigin: true,
        pathRewrite: function (path, req) { 
            //console.log('current request api : ' + path)
            return path.replace('/mock-api', '/api') 
        }
    },
}

// // rewrite path 
// pathRewrite: {'^/old/api' : '/new/api'}

// // remove path 
// pathRewrite: {'^/remove/api' : ''}

// // add base path 
// pathRewrite: {'^/' : '/basepath/'}

// // custom rewriting 
// pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }