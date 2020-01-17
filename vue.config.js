const path = require("path");
module.exports = {
  publicPath: "./", // 打包后的位置(如果不设置这个静态资源会报404)
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/pt-work/", // 打包后的位置(如果不设置这个静态资源会报404)
  outputDir: "dist", // 打包后的目录名称
  assetsDir: "static", // 静态资源目录名称
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/style/common/variable.less")] // 引入全局样式变量
    }
  },
  devServer: {
    port: process.env.PORT,
    disableHostCheck: true, // 跳过host检查
    proxy: {
      "/lsgService": {
        target: "http://test.coa.police.adxinfo.cn:8811/lsg",
        changeOrigin: true,
        pathRewrite: {
          "^/lsgService": ""
        }
      }
    }
  },

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true
};
