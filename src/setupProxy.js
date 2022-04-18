const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://api.mankai.shop/',
      pathRewrite: { '^/api': 'api' },
      changeOrigin: true,
    })
  )

  app.use(
    createProxyMiddleware('/sanctum', {
      target: 'http://api.mankai.shop/',
      pathRewrite: { '^/sanctum': 'sanctum' },
      changeOrigin: true,
    })
  )

  app.use(
    createProxyMiddleware('/media', {
      target: 'https://www.mankai.shop',
      pathRewrite: { '^/media': '' },
      changeOrigin: true,
    })
  )
}
