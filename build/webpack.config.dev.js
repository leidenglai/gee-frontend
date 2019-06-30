const webpack = require('webpack')
const config = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')

config.mode = 'development'
config.output.publicPath = '/'
config.output.filename = '[name].js'
config.output.chunkFilename = '[id].js'
config.devtool = 'cheap-module-eval-source-map'

// 开发环境下直接内嵌 CSS 以支持热替换
// modifyVars 替换默认主题
config.module.rules.push(
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      `css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      },
      'less-loader'
    ]
  }
)

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        rucksack(),
        autoprefixer({
          browsers: ['last 1 Chrome versions']
        })
      ]
    }
  }),
  new webpack.DefinePlugin({
    // ================================
    // 配置开发全局常量
    // ================================
    __DEV__: true,
    __PROD__: false
  }),

  new MiniCssExtractPlugin({ filename: '[name].css' })
)

module.exports = config
