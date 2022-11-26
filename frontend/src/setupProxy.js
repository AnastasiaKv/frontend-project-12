const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({ target: process.env.PORT || 'http://0.0.0.0:5001', changeOrigin: true }),
  );
};
