const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  // 根路径配置
  publicPath: process.env.NODE_ENV == 'development' ? '/' : './',
  // 静态资源目录
  assetsDir: 'static',
  //打包不生成Map文件
  productionSourceMap: false,
  configureWebpack: config => {
    let result = {};
    result.resolve = {
      alias: {
        '@': resolve('/src'),
        '@/assets': resolve('/src/assets'),
        '@/components': resolve('/src/components'),
      }
    }
    if (process.env.NODE_ENV === 'development') {
      result.devtool = 'source-map';
    }
    return result
  },
  devServer: {
    port: 9000,
    open: false,
    https: false,
    hot: true,
    disableHostCheck: true,
    publicPath: "/",
    proxy: { //配置跨域
      "/api": {
        target: "https://www.achencybe.com/admin",
        // target: "http://192.168.18.6:8080/admin",
        // target: "http://192.168.31.97:8080/admin",
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "" //请求的时候使用这个api就可以
        }
      },
    }
  }

}