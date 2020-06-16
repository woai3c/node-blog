const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackBar = require('webpackbar')
const ParallelUglifyPlugin =require('webpack-parallel-uglify-plugin')

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
        new ParallelUglifyPlugin({ // 多进程压缩代码文件
            cacheDir: '.cache/',
            uglifyJs: {
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                },
                sourceMap: true
            }
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
    },
})