import wx from 'weixin-js-sdk'
import utils from './utils'
import config from './config'
import g from './global'
import { localKey } from './const';
import { post } from "./http/http.js";

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
        /**
         * https://open.weixin.qq.com/connect/oauth2/authorize?
         * appid=wxc9773ab548d317cb
         * &redirect_uri=http%3A%2F%2Fdemo.csjlive.com%2Fa.html
         * &response_type=code
         * &scope=snsapi_userinfo
         * &state=STATE#wechat_redirect
         */
        location.href = "" +
            "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + appid +
            "&redirect_uri=" + encodeURIComponent(url) +
            "&response_type=code" +
            "&scope=snsapi_userinfo" +
            "&state=STATE" +
            "#wechat_redirect";
    }
    /**配置 */
    config(timestamp, nonceStr, signature) {
        var s = this;

        wx.ready(function () {
            s.hideMenuItems();
        });

        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.APPid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
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

    chooseImg() {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    utils.log("%[wx chooseImage]微信选择图片接口", "color:green", res);
                    resolve(res.localIds);
                }
            })
        })
    }

    uploadImg() {
        this.chooseImage().then(function (localIds) {
            for (let localid of localIds) {
                wx.uploadImage({
                    localId: localid, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        post(config.getUrl(config.uploadImg), {
                            openId: g.openId,
                            img: serverId
                        }).then(function (resp) {
                            if (resp.data.success) {

                            }
                        });
                    }
                });
            }
        });
    }

    downImg(serverId) {
        return new Promise((resolve, reject) => {
            wx.downloadImage({
                serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var localId = res.localId; // 返回图片下载后的本地ID
                    resolve(localId);
                }
            });
        })
    }

    /**
     * 此接口仅在 iOS WKWebview 下提供，
     * 用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。 
     */
    getLocalImg(localId) {
        return new Promise((resolve, reject) => {
            wx.getLocalImgData({
                localId: '', // 图片的localID
                success: function (res) {
                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    resolve(res.localData);
                }
            });
        })

    }
}
let weixin = new Weixin();
export default weixin;