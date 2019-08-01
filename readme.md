## Build Setup

``` bash
# 安装依赖
npm install

# 开发环境
npm run dev

# production的发布时打包
npm run build

```
支持IE9+

### webpack多页面打包 基础配置，可拷贝重新建立项目文件夹，不要随意修改原始仓库！如要修改沟通 魏彬
### 已包含各种demo （多页面配置，css,js使用 art-template使用 雪碧图使用等等）
### 生产环境交付后端前请先配置publicPath,配合HOST 和 NGINX指向本地

如果增加新页面，只需两步，不需要改webpack等配置文件

1. 在pages中新增一个文件夹
2. 在page.config.js中添加这个页面的信息即可

比如
```
  {
    name: 'contact',
    html: 'contact/contact.art',
    jsEntry: 'contact/contact.js'
  }

```

### 功能

1. 雪碧图合并
2. 热更新 
3. babel-es6转换
4. post-css加前缀
5. HTML可插入图片(需要  require方式引入图，/pages/下有列子)
6. 生产环境打包可以设置publicPath默认的路径
7. art-template模板可渲染模板+引入公共模块


### art-template规则
include 方式 主要为了引入代码片段，可以传入一些死数据
导入.art模板可以做数据渲染

因为我们要弄成组件化
index.art里边导入list.art是按组件整体导出，包含HTML JS CSS 在自己的业务用直接装入HTML中
about.art里边导入list.art是只导出模板和样式  JS需要在自己业务中实现

发现一篇好文章
https://juejin.im/post/5d13889a6fb9a07efd471d7f