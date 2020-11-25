const path = require('path');
const resolve = (...paths) => path.join(__dirname, ...paths);

module.exports = {
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    // 路径映射
    config.resolve.alias
      .set('@', resolve('src'))
      .set('<src>', resolve('src'))
      .set('<assets>', resolve('src/assets'))
      .set('<scripts>', resolve('src/assets/scripts'))
      .set('<util>', resolve('src/assets/scripts/util'))
      .set('<hook>', resolve('src/assets/scripts/hook'))
      .set('<components>', resolve('src/components'))
      .set('<provides>', resolve('src/provides'))
      .set('<views>', resolve('src/views'))
      .set('<public>', resolve('public'));
  }
};