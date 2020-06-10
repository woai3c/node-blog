const path = require('path')
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
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../client')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: './client/assets/favicon.ico',
            inject: true
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            },
        }
    },
}