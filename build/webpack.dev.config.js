const merge = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
const path = require('path');
const webpack = require('webpack');
const utils = require('./units');
const HappyPack = require('happypack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const os = require('os') //获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = merge(WebpackBaseConfig, {
            mode: 'development',
            devtool: 'cheap-module-eval-source-map',
            module: {
                rules: [
                  {
                    test: /\.(js|jsx|mjs)$/,
                    include: path.resolve(__dirname,'../src'),
                    loader: require.resolve('babel-loader'),
                    options: {
                      
                      // This is a feature of `babel-loader` for webpack (not Babel itself).
                      // It enables caching results in ./node_modules/.cache/babel-loader/
                      // directory for faster rebuilds.
                      cacheDirectory: true,
                    },
                  },
                  {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                            },
                        },
                    ],
                },
                {
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                    use:[
                        {
                                loader:'css-loader'
                        },
                        {
                                loader:'sass-loader'
                        }
                    ],
                        fallback:'style-loader'
                    })
                },
             
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                      }),
                }],
            },

                plugins: [
                    new HtmlWebpackPlugin({
                        template: config.dev.index,
                        inject: 'body',
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeAttributeQuotes: true
                        }
                    }),

                    new HappyPack({ //开启多线程打包
                        id: 'happy-babel-js',
                        loaders: [{
                            loader: 'babel-loader?cacheDirectory=true',
                        }],
                        threadPool: happyThreadPool
                    }),
                    new ProgressBarPlugin({
                        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
                    }),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NamedModulesPlugin(),
                    new ExtractTextPlugin("styles.css"),

                ],
                devServer: {
                    host: config.dev.host,
                    port: config.dev.port,
                    contentBase: path.join(__dirname, '../public'),
                    compress: true,
                    historyApiFallback: true,
                    hot: true,
                    https: false,
                    noInfo: true,
                    open: config.dev.autoOpenBrowser,
                    proxy: config.dev.proxyTable,
                }

            })