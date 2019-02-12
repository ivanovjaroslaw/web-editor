'use strict';

const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const HOST = 'localhost';
const PORT = 8080;

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    host: HOST,
    port: PORT,
    clientLogLevel: 'warning',
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    // quiet: true,
    watchOptions: {
      poll: true,
      ignored: ['node_modules']
    }
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
});
