const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productConfig = {
  mode: 'production', //production打包出来压缩 development不压缩
  devtool: 'cheap-module-source-map',
  //开发环境建议用cheap-module-eval-source-map
  // 生产环境建议 cheap-module-source-map
  //开启sorce-map 报错定位具体文件，不会定位到打包文件
  //cheap代表只查找到错误行，不精确到哪个字符，用eval方式可以提高打包速度
  //module 只查找业务代码，不会查找loader里的错误

  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
   // publicPath: 'http://asserts.xcarimg.com/resource/XXX/', //加入CDN的域名
  },

  optimization: {
    //压缩合并CSS
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true
        }
      })
    ]
  },

  module: {
    //MiniCssExtractPlugin 当前版本对HMR支持不好，只在生产环境使用
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], //loader顺序从下到上，从右到左
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //替换style-loader
          {
            loader: 'css-loader',
            // options: {
            //   importLoaders: 2, //比如一个SASS文件，内部又import了一个B.scss文件，那么为了让B.scss文件也先走postcss 和 sass-loader
            //   modules:true, //默认是false 代表当前页面import 的css只作用于当前页面
            // },
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', // add this
      '.ts'
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename:'[name].css',
      chunkFilename: '[name].chunk.css',
    })

  ]

}

module.exports = merge(commonConfig, productConfig)