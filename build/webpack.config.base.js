const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { cdnPath } = require('../config')

const commonPath = {
  dist: path.resolve(__dirname, '../dist/static') // build 后输出目录
}
const rootPath = path.resolve(__dirname, '../')

// webpack主要公共配置
module.exports = {
  entry: {},
  output: {
    path: commonPath.dist,
    publicPath: cdnPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.html'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      src: path.join(rootPath, 'src'),
      assets: path.join(rootPath, 'src/assets'),
      interfaces: path.join(rootPath, 'src/interfaces'),
      containers: path.join(rootPath, 'src/containers'),
      utils: path.join(rootPath, 'src/utils'),
      components: path.join(rootPath, 'src/components'),
      services: path.join(rootPath, 'src/services'),
      tpl: path.join(rootPath, 'src/tpl'),
      static: path.join(rootPath, 'static')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'underscore-template-loader',
            options: {
              attributes: [],
              engine: 'lodash',
              prependFilenameComment: __dirname
            }
          }
        ]
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1, // 为了让后端好套页面，html内引入的资源文件一律不使用base64
          name: 'img/[name]-[hash:6].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin() // 进度条
  ]
}
