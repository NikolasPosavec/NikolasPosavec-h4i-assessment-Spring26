const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // OpenAQ API proxy
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.openaq.org/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying OpenAQ:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Response OpenAQ:', proxyRes.statusCode, req.url);
      },
    })
  );

  // Photon Geocoding API proxy
  app.use(
    '/geocode',
    createProxyMiddleware({
      target: 'https://photon.komoot.io',
      changeOrigin: true,
      pathRewrite: {
        '^/geocode': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying Geocode:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Response Geocode:', proxyRes.statusCode, req.url);
      },
    })
  );
};