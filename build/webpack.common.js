const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pageConfig = require('../page.config.js');
const SpritesmithPlugin = require('webpack-spritesmith');
const formatCssTemplate = function (data) {
    var str = '';
    for (let item of data.sprites) {
        str += `.icon-${item.name}{
        background-image: url('${item.image}');
        background-position: ${parseFloat(item.offset_x) / 2}px ${parseFloat(item.offset_y) / 2}px;
        background-size: ${parseFloat(item.total_width) / 2}px ${parseFloat(item.total_height) / 2}px;
        width: ${parseFloat(item.width) / 2}px ;
        height: ${parseFloat(item.height) / 2}px;
      }\n`
    }
    return str;
};

const config = {
    // entry:'./src/index.js',
    entry: {},
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            css: path.resolve(__dirname, '../src/css/'),
            js: path.resolve(__dirname, '../src/js/'),
            components: path.resolve(__dirname, '../src/components/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        limit: 2048 // 2KB以下用URL-LOADER转成BASE64
                    },
                }, ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

       
            // {
            //     test: /\.(tpl|ejs)$/,
            //     use: 'ejs-loader'
            // },

            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                }
            },

            // html中的img标签
            {
                test: /\.html$/,
                loader: 'html-withimg-loader',
                include: [path.join(__dirname, "../src")],
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[ext]'
                }
            }
        ]
    },
    optimization:{
         splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true, 
          cacheGroups: {             
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              name: 'vendor'
            },
            default: { 
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }    
    } 
}

const makePlugins = (config) => {
    const plugins = [
        //设置每一次build之前先删除dist  
        new CleanWebpackPlugin(),
        //全局垫片，如果某个库依赖JQ，会自动给他引入，否则按模块分离打包，他根本引入不到JQ
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ]

    if (pageConfig && Array.isArray(pageConfig)) {
        pageConfig.map(page => {
            config.entry[page.name] = path.resolve(__dirname, `../src/pages/${page.jsEntry}`)
            plugins.push(
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, `../src/pages/${page.html}`),
                    filename: `${page.name}.html`,
                    minify: false,
                    chunks: ['vendor',page.name] //对应要引入的文件
                }));
        })
    }

    plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, '../src/img/sprite/'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, '../src/spritesmith-generated/sprite.png'),
                css: [
                    [
                        path.resolve(__dirname, '../src/spritesmith-generated/sprite.css'),
                        {
                            format: "format_css_template"
                        }
                    ]
                ]
            },
            customTemplates: {
                format_css_template: formatCssTemplate
            },
            apiOptions: {
                cssImageRef: "sprite.png"
            },
            spritesmithOptions: {
                algorithm: 'top-down', // 从上到下生成方向.
                padding: 2// 每个小图标之间的间隙
            }
        })
    )
    return plugins;
}

config.plugins = makePlugins(config);
module.exports = config;