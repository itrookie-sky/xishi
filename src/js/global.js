import wx from './weixin.js'
import utils from './utils.js'
import config from './config.js'
import { localKey } from './const.js'
import { post, fetch } from './http/http.js'
import IM from './chat/chat.js'
import weixin from './weixin';

const Global = {
    openId: "",
    code: "",
    utils: utils,
    config: config,
    userInfo: {},
    userLabel: "1",
    liveId: "1000",
    IMpassword: "xishi123456",
    hongbaoId: 1000,//发送红包生成ID
    live: {
        "id": 1000,
        "name": "吴奇隆与刘诗诗结婚现场",
        "company_id": 1000,
        "man": "吴奇隆",
        "man_tel": "13800138000",
        "man_count": 0,
        "woman": "刘诗诗",
        "woman_tel": "1380013801",
        "woman_count": 0,
        "planner": "子龙",
        "planner_tel": "10086",
        "start_time": 1548257460,
        "end_time": 1556670600,
        "wedding_day": 1554078600,
        "provice": "北京市",
        "city": "北京市",
        "area": "海淀区",
        "address": "西苑东路",
        "video": "",
        "package_id": 1000,
        "status": "1",
        "order_sta": "nopay",
        "chat": "78895638446081",
        "remark": "",
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "is_sign": "0",
        "is_duikang": "0",
        "is_chat": "0",
        "is_img": "0",
        "is_dashang": "0",
        "is_hongbao": "0",
        "is_zan": "0",
        "is_pageflag": "0",
        "visit_num": 0,
        "visit_rand": 0,
        "createtime": 1548257460,
        "is_del": "0"
    }, //直播界面数据初始化
    chatRoomId: "78895638446081",
    appSecret: null,

    init() {
        let liveId = utils.getUrlParams("liveid");
        if (liveId) this.liveId = liveId;
        utils.log("liveid:", this.liveId);
        this.login();
        IM.init();
    },

    login() {
        var self = this;
        fetch(config.configSrc).then(function (resp) {
            if (resp.status == 200) {
                utils.log("%c[config] 获取配置文件成功", "color:green");
                let data = resp.data;
                for (let key in data) {
                    config[key] = data[key];
                }
                self.getCode();
            }
        });
    },

    getCode() {
        let self = this;
        let code = utils.getUrlParams("code");
        if (code === "test") {
            this.openId = "obeXIt3aK3UJKf1G-i5LYMrB3TZA";
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
                        //请求签名
                        post(config.getUrl(config.wxSign), {
                            openId: self.openId,
                            liveId: self.liveId
                        }).then(function (resp) {
                            if (resp.data.success) {
                                self.appSecret = resp.data.data;
                                weixin.config(
                                    self.appSecret.timestamp,
                                    self.appSecret.nonceStr,
                                    self.appSecret.signature
                                );
                            }
                        });
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