const webpack = require('webpack')
const config = require('./webpack.config.prod')
const webpackConfInit = require('./utils/webpackConfInit')
const newConf = webpackConfInit(config)

webpack(newConf, err => {
  err && console.log(err)
})
