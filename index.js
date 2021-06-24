const Koa = require('koa')
const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const config = require('./config/webpack')
const koaStatic = require('koa-static');
config.mode = 'production'
const compiler = webpack(config);
console.log("compiler", compiler.plugin)

const app = new Koa()
const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  //publicPath: config.output.publicPath
})
app.use(wdm)
app.use(webpackHotMiddleware(compiler))

app.use(koaStatic(__dirname + '/client/dist'));

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000,() => {
  console.log('[WUJI] HTTP Server is running.');
  console.log(`http://127.0.0.1:${3000}/\n`);
});