# merry

> Vue项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
## 第三方库
#### axios
```bash
# axios
 npm i axios
```
#### weixin-sdk
```bash
# weixin-js-sdk
 npm i weixin-js-sdk
```
#### element-ui
```bash
# element-ui
 npm i element-ui -S
# element-theme
 npm i element-theme -S
# element-chalk
 npm i element-theme-chalk -D
 et -i [可以自定义变量文件，默认为element-variables.scss]

```
#### UI框架px转rem
```bash
# lib-flexible
npm i lib-flexible --save
# 引入文件
# main.js 
# import 'lib-flexible/flexible'

# px2rem-loader
 npm install px2rem-loader
```
>在build文件中找到util.js，将px2rem-loader添加到cssLoaders中
```javascript
const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75 // 这里设置html根字体，vant-UI的官方根字体大小是37.5
    }
  }
```
> 在generateLoaders方法中添加px2remLoader

```javascript
function generateLoaders (loader, loaderOptions) {
　　const loaders = options.usePostCSS ?
　　[cssLoader, postcssLoader, px2remLoader] :
　　[cssLoader, px2remLoader]

if (loader) {
　　loaders.push({
　　loader: loader + '-loader',
　　options: Object.assign({}, loaderOptions, {
    　　    sourceMap: options.sourceMap
    　　})
　  　})
　　}


if (options.extract) {
　　return ExtractTextPlugin.extract({
    　　use: loaders,
    　　fallback: 'vue-style-loader'
　　})
　　} else {
　　    return ['vue-style-loader'].concat(loaders)
　　}
}
```
