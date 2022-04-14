const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8000',
      pathRewrite: { '^/api': 'api' },
      changeOrigin: true,
    })
  )

  app.use(
    createProxyMiddleware('/sanctum', {
      target: 'http://localhost:8000',
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
