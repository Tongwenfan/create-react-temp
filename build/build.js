//修改编译的方法
//显示编译的状态，编译结束提示编译成功
const ora = require('ora'); //是一个能让你在终端提示状态的库
const chalk = require('chalk'); //是方便我们美化输出的文本。
const webpack = require('webpack');
const webpackProduction = require('./webpack.prod.config');

const spinner = ora('--------------编译中主人请稍等--------------\n').start();
webpack(webpackProduction,function(err,start){
    if(err){
        console.log(err)
        spinner.fail('--------------编译失败主人--------------')
        return;
    }
    spinner.succeed('--------------编译结束主人--------------\n')
    process.stdout.write(start.toString({
        colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
    } + '\n\n'));
  
        console.log(chalk.yellow(
            '  提示: 编译后的文件可以上传并且部署到服务器\n' +
            '  通过file:// 打开index.html不会起作用.\n'
        ))
})