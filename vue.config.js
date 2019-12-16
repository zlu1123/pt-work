const path = require('path')
module.exports = {
  publicPath: './', // 打包后的位置(如果不设置这个静态资源会报404)
  outputDir: 'dist', // 打包后的目录名称
  assetsDir: 'static', // 静态资源目录名称
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/style/common/variable.less")] // 引入全局样式变量
    }
  }
}
