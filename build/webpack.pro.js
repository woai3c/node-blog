const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    entry: './src/main.js',
    devtool: 'source-map',
    plugins: [
        new CompressionPlugin(),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ],
})