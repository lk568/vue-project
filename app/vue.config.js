const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave:false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 代理配置，解决跨域问题
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
