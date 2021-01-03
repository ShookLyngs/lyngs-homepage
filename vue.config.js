const path = require('path');
const resolve = (...paths) => path.join(__dirname, ...paths);
const aliasMap = () => ({
  // root
  '@': resolve('src'),
  '<src>': resolve('src'),
  '<public>': resolve('public'),
  // src
  '<views>': resolve('src/views'),
  '<assets>': resolve('src/assets'),
  '<provides>': resolve('src/provides'),
  '<components>': resolve('src/components'),
  // scripts
  '<scripts>': resolve('src/assets/scripts'),
  '<util>': resolve('src/assets/scripts/util'),
  '<hook>': resolve('src/assets/scripts/hook'),
});

module.exports = {
  publicPath: './',
  assetsDir: 'assets',
  pluginOptions: {
    // 处理全局 less 样式
    // 注意，需要在 webstorm -> setting -> editor -> inspections 中关闭对引入的检测
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/styles/index.less')
      ]
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    // 配置路由别名
    const alias = aliasMap();
    Object.keys(alias).forEach(
      key => config.resolve.alias.set(key, alias[key])
    );

    // 使得 html 文件可被 webpack 编译
    // 用于 Module<sandbox> 的 html文件
    config.module
      .rule('html')
      .test(/\.(html)$/)
      .exclude.add(/index\.html/i).end()
      .use('html-loader').loader('html-loader').end();
  },
};