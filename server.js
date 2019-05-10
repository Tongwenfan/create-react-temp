/**
 *  本地打包后开启静态资源查看
 */


const express = require('express'); // 服务
const compression = require('compression'); // gzip
const opn = require('opn'); // node的自动打开浏览器
const path = require('path');
const app = express();

app.use(compression());

app.use(express.static(__dirname + '/dist', {
  setHeaders: setCustomCacheControl
}));

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(process.env.PORT || 3002, function() {
  console.log(`已经启动服务： http://127.0.0.1:${process.env.PORT || 3002}`)
  if (process.env.Open) {
    opn(`http://127.0.0.1:${process.env.PORT || 3002}/index.html`);
  }
});

// 缓存控制
function setCustomCacheControl(res, path) {
  // 对html格式文件不设置缓存
  if (express.static.mime.lookup(path) == 'text/html') {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    // 其他静态资源使用强缓存
    res.setHeader('Cache-Control', 'public, max-age=3600')
  }
}
