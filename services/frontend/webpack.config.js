const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const APP_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'public');

module.exports = {
  entry: `${APP_PATH}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_PATH,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: 'eslint-loader',
      },
    ],
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: `${APP_PATH}/index.html`,
      filename: 'index.html',
      inject: 'body',
      inlineSource: '.jsx?$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
