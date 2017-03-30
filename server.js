const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')
const config = require('./config/')


var compiler = Webpack(webpackConfig)
var server = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    }
});

/*server.app.get(`${config.base}*`, function (req, res) {
    res.sendFile(__dirname + '/index.html')
});*/

server.listen(3001, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('http://localhost:8080' + config.base)
});