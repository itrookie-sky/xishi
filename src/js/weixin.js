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
    "getLocation",
    "chooseWXPay",
    "downloadImage",
    "getLocalImgData",
    "chooseImage",
    "uploadImage",
    "scanQRCode",
    "updateAppMessageShareData",
    "updateTimelineShareData"
];

class Weixin {
    /**微信授权 */
    wxAccess() {
        let openId = utils.storage.getData(localKey.openId);
        if (!openId) {
            utils.log("微信授权");
            let url = this.getUrl();
            this.getAccessCode(config.appid, url);
        }
    }

    getUrl() {
        return location.href.split('#')[0];
        // return config.client;
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


        wx.config({
            debug: config.wxDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: config.appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        });


        wx.ready(function (resp) {
            s.hideMenuItems();
        });
    }

    hideMenuItems() {
        wx.hideMenuItems({
            menuList: [
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:facebook",
                "menuItem:share:QZone",
                "menuItem:share:timeline",
                "menuItem:share:email",
            ]
        });
    }

    chooseImg(type) {
        var sourceType;
        switch (type) {
            case 1:
                sourceType = ['camera'];
            default:
                sourceType = ['album', 'camera'];
                break;
        }

        return new Promise((resolve, reject) => {
            wx.checkJsApi({
                jsApiList: ['chooseImage'],
                success: function () {
                    wx.chooseImage({
                        count: 9, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            utils.log("%c[wx chooseImage]微信选择图片接口", "color:green", res);
                            resolve(res.localIds);
                        },
                        fail: function (res) {
                            utils.log("%c[wx chooseImage]微信选择图片接口失败", "color:red", res);
                        }
                    });
                }
            });
        })
    }

    uploadImg() {
        return new Promise((resolve, reject) => {
            this.chooseImg().then(function (localIds) {
                var curIndex = 0;
                var servers = [];
                var imgs = [];
                wx.checkJsApi({
                    jsApiList: ['uploadImage'],
                    success: function () {
                        for (let localid of localIds) {
                            wx.uploadImage({
                                localId: localid, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    var serverId = res.serverId; // 返回图片的服务器端ID
                                    utils.log("%c[wx uploadImg] 微信上传图片成功", "color:green", res);
                                    curIndex++;
                                    servers.push(serverId);
                                    if (curIndex >= localIds.length) {
                                        utils.log("%c[wx uploadImg] 微信上传所有图片成功", "color:green", servers);

                                        post(config.getUrl(config.uploadImg), {
                                            openId: g.openId,
                                            img: servers
                                        }).then(function (resp) {
                                            if (resp.data.success) {
                                                utils.log("%c[http uploadImg] 服务器上传图片成功", "color:green", resp);
                                                resolve(resp.data.data.img);
                                            }
                                        });

                                    }

                                },
                                fail: function (res) {
                                    utils.log("%[wx uploadImage]微信选择图片接口失败", "color:red", res);
                                }
                            });
                        }
                    }
                });
            });
        })

    }

    downImg(serverId) {
        return new Promise((resolve, reject) => {
            wx.checkJsApi({
                jsApiList: ['uploadImage'],
                success: function () {
                    wx.downloadImage({
                        serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var localId = res.localId; // 返回图片下载后的本地ID
                            resolve(localId);
                        },
                        fail: function (res) {
                            utils.log("%[wx downloadImage]微信选择图片接口失败", "color:red", res);
                        }
                    });
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



    /**支付 */
    pay(timestamp, nonceStr, prepay_id, paySign) {
        return new Promise(function (resolve, reject) {
            wx.checkJsApi({
                jsApiList: ['chooseWXPay'],
                success: function () {

                    wx.chooseWXPay({
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        package: `prepay_id=${prepay_id}`,
                        paySign: paySign,
                        signType: "MD5",
                        success: function (resp) {
                            utils.log("%c[wx pay] 支付成功", "color:green", resp);
                            resolve(resp);
                        },
                        cencel: function (resp) {
                            utils.log("%c[wx pay] 支付取消", "color:red", resp);
                        },
                        fail: function (resp) {
                            utils.log("%c[wx pay] 支付失败", "color:red", resp);
                        }
                    });
                }
            });
        });

    }

    /**微信扫一扫接口 */
    scanQRCode() {
        return new Promise(function (resolve, reject) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    utils.log("%c[wx scanQRCode]扫一扫调用成功", "color:green", res.resultStr);
                    resolve(res.resultStr);
                }
            });
        });
    }

    /**微信分享 */
    shareUpdate() {
        post(config.getUrl(config.shareLink), {
            liveId: g.liveId,
            openId: g.openId
        }).then(function (resp) {
            if (resp.data.success) {
                var data = resp.data.data;
                wx.updateAppMessageShareData({
                    title: data.title, // 分享标题
                    desc: data.desc, // 分享描述
                    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.logo, // 分享图标
                    success: function () {
                        // 设置成功
                        utils.log("%c[wx updateAppMessageShareData]", "color:green", data);
                    }
                });
                wx.updateTimelineShareData({
                    title: data.title, // 分享标题
                    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.logo, // 分享图标
                    success: function () {
                        // 设置成功
                        utils.log("%c[wx updateTimelineShareData]", "color:green", data);
                    }
                })
            }
        });
    }
}
let weixin = new Weixin();
export default weixin;