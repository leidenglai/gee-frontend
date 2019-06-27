const webpack = require('webpack')
const config = require('./webpack.config.prod')
const webpackInit = require('./webpack-init')
const newConf = webpackInit(config)

webpack(newConf, err => {
  err && console.log(err)
})
