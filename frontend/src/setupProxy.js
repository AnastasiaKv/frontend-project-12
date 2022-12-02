const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({ target: 'http://0.0.0.0:5001', changeOrigin: true }),
  );
};
