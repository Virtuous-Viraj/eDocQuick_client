const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
<<<<<<< HEAD
      target: 'http://localhost:5000',
=======
      target: 'https://edocquick-backend.onrender.com',
>>>>>>> 35dd7617920becc1363e428774bcaa677b0795cb
      changeOrigin: true,
    })
  );
};
