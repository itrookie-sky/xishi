window.onresize = setHtmlFontSize;
window.onload = setHtmlFontSize;

function setHtmlFontSize() {
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];

    htmlDom.style.fontSize = htmlWidth / 3.6 + 'px';

};
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../theme/index.css'
import ElementUI from 'element-ui'
import '../static/css/global.css' /*引入公共样式*/
/**播放器 */
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
require('video.js/dist/video-js.css') 
require('vue-video-player/src/custom-theme.css')

import '../static/css/iconfont/iconfont.css'
import { post, fetch, patch, put } from './js/http/http.js'
import global from './js/global'

/**微信授权 */
global.init();

Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.prototype.global = global;
Vue.use(ElementUI);
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})