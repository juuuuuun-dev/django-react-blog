const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin')

console.log("override build start")
/**
 * https://github.com/facebook/create-react-app/issues/8320
 * CircleCI + Terser Error: Call retries were exceeded
 */
function myOptimization(config) {
  config.optimization.minimizer.forEach(minimizer => {
    if (minimizer && minimizer.options && minimizer.options.parallel === true) {
      minimizer.options.parallel = 1;
    }
  });
  return config;
}

module.exports = override(
  myOptimization,
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#444", "@border-color-split": "#e9e9e9" }
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
    },
    {
      from: 'public/sitemap.xml',
      transform(content, path) {
        content = content.toString()
          .replace("%REACT_APP_BACKEND%", process.env.REACT_APP_BACKEND)
        return content;
      },
    }],
  }))
);
