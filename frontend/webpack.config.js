/**
 * not working
 * go to config-overrides.js
 */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
console.log("webpackdayo")
const nodeExternals = require('webpack-node-externals');

const packageJson = require('./package.json');

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'index.js'),
  externals: [nodeExternals(), 'antd', 'less', 'less-loader', 'sass-loader'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'dev'),
    filename: `${packageJson.name}.js`,
    library: 'AntdScssThemePlugin',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  plugins: [
    new CopyPlugin([
      {
        from: 'manifest.json',
        transform(content, path) {
          console.log({ content })
          content = content.toString().replace('process.env.API_BASE_URL', process.env.API_BASE_URL)
          content = content.toString().replace('process.env.REACT_APP_TITLE', process.env.REACT_APP_TITLE)
          return content;
        },
      },
    ],
};

module.exports = webpackConfig;
