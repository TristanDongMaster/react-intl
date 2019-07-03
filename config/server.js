var path = require('path')
var mockService = require('../mockService')
var webpack = require('webpack')
var cp = require('child_process')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.dev')
var express = require('express')
var app = express()
var port = 9002
var PATHS = require('./PATHS');
var proxy = require('http-proxy-middleware');
var compiler = webpack(config)
var proxyTable = require('./proxy.config.js');
var DIST_DIR = path.join(__dirname, "static")

// proxy api requests
// 顺序必须在 bodyParser 之前！！！
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxy(options.filter || context, options));
})

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
        colors: true
    },
  hot: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000 // is this the same as specifying --watch-poll?
  },
  index:'index.html'
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(PATHS.ROOT + '/'));

app.get("/api/*", function (req, res) {
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})

app.post("/api/*", function (req, res) {
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})

app.delete("/api/*", function (req, res) {
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})

app.put("/api/*", function (req, res) {
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})

app.get("/", function (req, res,next) {
  res.sendFile(PATHS.ROOT + '/temp/index.html')
})

app.get("/*", function (req, res,next) {
  res.sendFile(PATHS.ROOT + '/temp/index.html')
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/mc-intl/index in your browser.", port, port)
    //cp.exec('open http://localhost:9002/mc-intl/index')
  }
})
