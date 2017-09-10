const webpack = require('webpack');
const path = require('path');

const srcPath = path.resolve(__dirname, 'frontend');

module.exports = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: {
    bundle: path.resolve(srcPath, 'entry.js'),
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.ejs/,
        use: 'ejs-loader',
      },
      { test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }] },
      { test: /\.css$/, use: 'style!css' },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
    }),
  ],
  watch: true,
};
