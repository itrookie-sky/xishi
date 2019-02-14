import wx from 'weixin-js-sdk'
import utils from './utils'
import config from './config'
import g from './global'
import { localKey } from './const';

const jsApiList = [
    "closeWindow",
    "hideMenuItems",
    "onMenuShareAppMessage",
    "onMenuShareTimeline",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "getLocation"
];

class Weixin {
    /**微信授权 */
    wxAccess() {
        let openId = utils.storage.getData(localKey.openId);
        if (!openId) {
            utils.log("微信授权");
            let url = location.href.split("#")[0];
            this.getAccessCode(config.appid, url);
        }
    }

    getAccessCode(appid, url) {
            location.href = "" +
                "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=" + appid +
                "&redirect_uri=" + encodeURIComponent(url) +
                "&response_type=code" +
                "&scope=snsapi_userinfo" +
                "&state=1" +
                "#wechat_redirect";
        }
        /**配置 */
    config(timestamp, nonceStr, signature) {
        var s = this;
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.APPid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        });

        wx.ready(function() {
            s.hideMenuItems();
        });
    }

    hideMenuItems() {
        wx.hideMenuItems({
            "menuList": [
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:share:facebook",
                "menuItem:share:QZone",
                "menuItem:share:timeline",
                "menuItem:editTag",
                "menuItem:delete",
                // "menuItem:copyUrl",
                "menuItem:originPage",
                "menuItem:readMode",
                "menuItem:openWithQQBrowser",
                "menuItem:openWithSafari",
                "menuItem:share:email",
                "menuItem:favorite",
                "menuItem:share:brand"
            ]
        });
    }
}
let weixin = new Weixin();
export default weixin;