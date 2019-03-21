const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const utils = require('./utils');
const configBase = require('./webpack.config.base');

const HOST = 'localhost';
const PORT = 8080;

const configDev = {
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
  // @todo: what's the difference with `devtool: '#eval-source-map',`
  devtool: 'inline-source-map',
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
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
  output: {
    path: utils.resolve(`dist/dev`),
    publicPath: '/'
  }
};

module.exports = merge(configBase, configDev);
