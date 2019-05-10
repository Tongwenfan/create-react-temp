const merge = require('webpack-merge')
const WebpackBaseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css样式
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack')
const os = require('os') //获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const chalk = require('chalk'); 
const path = require('path');
const config=require('../config');
const utils=require('./units');
const webpackProduction = merge(WebpackBaseConfig,{
    mode:'production',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
       
    },
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
        },{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
              }),
        }   
      ],
    },
    performance: {
        hints: false
      },
        
    plugins:[
        new HtmlWebpackPlugin({
            template:config.build.index,
            inject:'body',
            minify:{
                     removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    minifyCSS: true,
                    minifyJS: true,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'), 
            chunkFilename: utils.assetsPath('css/[id].[hash].css'),
        }),
        new HappyPack({ //开启多线程打包
            id: 'happy-babel-js',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
              }],
            threadPool: happyThreadPool
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'), 
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        })
    ],
    optimization: {
		splitChunks: {
			cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true
                },
                vendor: {
                    priority: 10,
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    enforce: true,
                    reuseExistingChunk: true
                }
			},

			chunks: 'all',
			minChunks: 1,
			minSize: 0,
			name: true
        },
        minimizer: [
            new UglifyJSPlugin({
                parallel: true,
                cache: true, 
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: true
                    ? {
                        map: { inline: false }
                    }
                    : {}
            })
        ],
	}
})

if (config.build.productionGzip) {
    //添加gzip压缩插件
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

// filename 压缩后的文件名
// algorithm 算法 默认gzip
// test 针对文件的正则表达式规则，符合规则的文件被压缩
// threshold 文件大于这个值的会被压缩
// minRatio 压缩率 默认0.8
    webpackProduction.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' +
              config.build.productionGzipExtensions.join('|') +
              ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackProduction.plugins.push(new BundleAnalyzerPlugin())
  }


module.exports = webpackProduction