const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')

module.exports = merge(webpackBaseConfig, {
    entry: './src/main.js',
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ],
})