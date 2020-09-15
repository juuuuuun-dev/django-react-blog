const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');

console.log("webpackdayo")
const plugin = new CopyPlugin({
  patterns: [{
    from: 'public/manifest.json',
    transform(content, path) {
      console.log({ content })
      content = content.toString().replace('process.env.API_BASE_URL', process.env.API_BASE_URL)
      content = content.toString().replace('process.env.REACT_APP_TITLE', process.env.REACT_APP_TITLE)
      return content;
    },
  }],
});
console.log(plugin)
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#333" }
  }),
  addWebpackPlugin(plugin)

);