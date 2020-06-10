const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    entry: {
        main: './client/main.js',
    },
    devtool: 'source-map',
    plugins: [
        new CompressionPlugin(),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackBar(),
    ],
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
})