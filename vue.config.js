const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        // 将 plugins 移到 postcssOptions 对象中
        postcssOptions: {
          plugins: [
            require("postcss-pxtorem")({
              rootValue: 37.5,
              propList: ["*"],
              selectorBlackList: [".no-rem", "no-rem-"], // 可选：排除特定选择器
              minPixelValue: 2, // 可选：最小转换像素值
              exclude: /node_modules/i, // 可选：排除 node_modules
            }),
          ],
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      // 组件按需引入
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
});
