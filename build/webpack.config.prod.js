const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const version = process.argv[2] // 版本号 用于build
const rootPath = path.resolve(__dirname, '..') // 项目根目录
const fileHash = version || '[chunkhash:6]'

// 公共第三方模块
const vendor = ['@babel/polyfill', '@babel/runtime', 'classnames', 'jquery', 'delegate', 'lodash', 'query-string', 'uikit', 'whatwg-fetch']

config.mode = 'production'
config.output.filename = `[name].${fileHash}.js`
config.output.chunkFilename = `[name].${fileHash}.js`
config.devtool = 'source-map'

// 生产环境下分离出 CSS 文件
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
    loader: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      },
      'less-loader'
    ]
  }
)

// 代码分块
config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        // eslint-disable-next-line camelcase
        keep_fnames: true
      }
    })
  ],
  splitChunks: {
    chunks: 'all',
    minChunks: 1,
    name: true,
    cacheGroups: {
      // 分离出第三方库
      vendors: {
        name: 'vendors',
        filename: '[name].[chunkhash:6].js',
        test(module) {
          // "有正在处理文件" + "这个文件包含在node_modules + vendor数组中"
          const isVendor =
            module.resource && vendor.find(name => module.resource.indexOf(path.join(rootPath, `node_modules/${name}/`)) === 0)

          return isVendor
        },
        chunks: 'initial',
        priority: 99
      }
    }
  },
  runtimeChunk: {
    name: 'manifest'
  }
}

config.plugins.push(
  // 打包细节插件，能查看已打包好的js包中各模块的体积
  // new BundleAnalyzerPlugin(),

  // 启用作用域提升
  // 作用域提升会移除模块外的函数包装,体积改进; 更显著的改进是 JavaScript 在浏览器中加载的速度
  new webpack.optimize.ModuleConcatenationPlugin(),

  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        rucksack(),
        autoprefixer({
          browsers: ['last 2 versions', '> 5%', 'not ie <= 10']
        })
      ]
    }
  }),
  new CleanWebpackPlugin('dist', {
    root: rootPath,
    verbose: false
  }),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  new webpack.DefinePlugin({
    // ================================
    // 配置开发全局常量
    // ================================
    __DEV__: true,
    __PROD__: false,
    'process.env': {
      // 这是给 React 打包用的
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new MiniCssExtractPlugin({ filename: '[name].[contenthash:6].css' })
)

module.exports = config
