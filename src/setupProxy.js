const { createProxyMiddleware } = require('http-proxy-middleware');//引入第三方插件  npm http-proxy-middleware
module.exports = function(app) {
    app.use('/fy',createProxyMiddleware( {
        target: 'https://www.maomin.club',
        changeOrigin: true
    }))//设置路径
};

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) { 
//   app.use(createProxyMiddleware('/ug', {target: 'https://c.m.163.com', changeOrigin: true}))  
// }