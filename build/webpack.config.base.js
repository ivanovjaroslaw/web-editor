const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

const configBase = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'assets': utils.resolve('assets'),
      'pages': utils.resolve('src/pages'),
      'components': utils.resolve('src/components'),
      'dist': utils.resolve('dist'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  module: {
    noParse: /.*tsconfig\.json$/,
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /(\.d\.ts)/],
        use: 'tslint-loader',
        enforce: 'pre'
      },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /(\.d\.ts)/],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: utils.resolve('tsconfig.json'),
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  output: {
    path: utils.resolve(`dist`),
    publicPath: '/'
  }
};

module.exports = configBase;
