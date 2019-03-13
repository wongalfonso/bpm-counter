const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglify-webpack-plugin');
const webpack = require('webpack');
const commont = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
    })
  ]
})