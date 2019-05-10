'use strict'
const path = require('path')

// 更改webpack配置
module.exports = {
    base:{
        
       
        cacheFile:['react','react-dom'] // 配置缓存第三方库
    },
    dev:{
        assetsSubDirectory: 'static', //打包后路径
        assetsPublicPath: '/',
        index: path.resolve(__dirname, '../public/index.html'),
        proxyTable: {},
        host: 'localhost',
        port: 8080, 
        autoOpenBrowser: true,
        // 是否生成sourceMap
        cssSourceMap: true,
    },
    build:{
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',//打包后路径
        assetsPublicPath: '/',
        index: path.resolve(__dirname, '../public/index.html'),
        // 是否生成sourceMap
        productionSourceMap: true,
         //bundle分析工具 npm_config_report 需要 npm 配置 --report like: npm run build --report 默认是http://127.0.0.1:8888
        bundleAnalyzerReport: process.env.npm_config_report ,
         productionGzip: true, // 是否开启gzip
        productionGzipExtensions:['.js','.css']
    }
}