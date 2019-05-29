const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
            }
        ]
    },
    resolve: {
        modules:['../components','node_modules'], 
        extensions: ['.js', '.json', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../dist'),
    }
}