import wx from './weixin'
import utils from './utils'
import config from './config'
import { localKey } from './const.js'
import { post } from './http/http.js'
import { IMinit } from './chat/chat.js'

const Global = {
    openId: "",
    code: "",
    utils: utils,
    config: config,
    userInfo: null,
    liveId: "1000",
    IMpassword: "xishi123456",
    /**直播界面数据初始化 */
    live: null,

    init() {
        this.liveId = utils.getUrlParams("liveid");
        this.login();
        IMinit();
    },

    login() {
        // let openId = utils.storage.getData(localKey.openId);
        // if (openId) {
        //     this.openId = openId;
        // } else {
        this.getCode();
        // }
    },

    getCode() {
        let self = this;
        let code = utils.getUrlParams("code");
        if (code === "test") {
            this.openId = "obeXIt3aK3UJKf1G-i5LYMrB3TZI";
            this.liveId = "1000";
            config.isDebug = true;
        }
        if (!this.liveId) this.liveId = "1000";
        if (code) {
            //axios->成功 缓存openid 失败
            utils.log("code 获取成功", code);
            this.code = code;
            post(config.getUrl(config.getUserInfo), {
                wxCode: code
            }).then(function (resp) {
                if (resp.data.success) {
                    var data = resp.data.data;
                    if (data.errcode) {
                        utils.warn(data.errmsg);
                    } else {
                        self.userInfo = data;
                        self.openId = data.openid;
                    }
                } else {
                    console.warn("获取用户信息失败");
                }
            }).catch(function (err) {
                utils.log("失败", err)
            });
        } else {
            wx.wxAccess();
        }
    },
    testMenu: [{
        link: "/",
        desc: "登录页",
    },
    {
        link: "/live",
        desc: "直播页",
    }, {
        link: "/demo",
        desc: "示例页",
    }, {
        link: "/money",
        desc: "余额",
    }
    ],
    testGuideList: [{
        id: "1",
        desc: "新郎",
        title: require("../assets/img/guide/guide_07.png"),
        labList: [
            { title: "同学" }
        ]
    },
    {
        id: "2",
        desc: "新娘",
        title: require("../assets/img/guide/guide_09.png"),
        labList: [
            { title: "同学" }
        ]
    }
    ],
};

export default Global;