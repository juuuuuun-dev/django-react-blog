const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');
console.log("override build start")
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#333" }
  }),
  addWebpackModuleRule({
    test: /\.less$/,
    exclude: /node_modules/,
    loader: ['style-loader', 'css-loader', 'less-loader'],
  }),
  addWebpackPlugin(new CopyPlugin({
    patterns: [{
      from: 'public/manifest.json',
      transform(content, path) {
        content = content.toString()
          .replace(/process.env.API_BASE_URL/g, process.env.API_BASE_URL)
          .replace(/process.env.REACT_APP_TITLE/g, process.env.REACT_APP_TITLE)
          .replace(/process.env.REACT_APP_THEME_COLOR/g, process.env.REACT_APP_THEME_COLOR)
        return content;
      },
    }],
  }))
);
