## Build Setup

``` bash
# 安装依赖
npm install

# 开发环境
npm run dev

# production的发布时打包
npm run build

```


### webpack多页面打包

如果增加新页面，只需两步，不需要改webpack等配置文件

1. 在pages中新增一个文件夹
2. 在page.config.js中添加这个页面的信息即可

比如
```
  {
    name: 'contact',
    html: 'contact/contact.html',
    jsEntry: 'contact/contact.js'
  }

```

### 功能

1. 雪碧图合并
2. 热更新 
3. babel-es6转换
4. post-css加前缀
5. HTML可插入图片
6. 生产环境打包可以设置publicPath默认的路径
7. ejs模板可渲染模板+引入公共模块