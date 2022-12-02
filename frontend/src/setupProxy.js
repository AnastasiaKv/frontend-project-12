const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || '5001';

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({ target: `http://0.0.0.0:${port}`, changeOrigin: true }),
  );
};
