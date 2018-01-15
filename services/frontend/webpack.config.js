const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'public');

module.exports = {
  entry: APP_PATH + '/index.jsx',
  output: {
    filename: 'bundle.js',
    path: DIST_PATH,
  },
  module: {
    loaders: [{
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
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_PATH + '/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
  },
};
