import wx from './weixin'
import utils from './utils'
import config from './config'
import { localKey } from './const.js'
import { post } from './http/http.js'
import Utils from './utils';

const Global = {
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
            title: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABYCAYAAABF7PEoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZTFiNzkzOS1lNmM2LTdiNGEtYjRlYi1lNGFhNDU1MjhiZWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkFDMEFGQzUxNzA2MTFFOTlFMTlCM0M0Q0NDQkM3QjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkFDMEFGQzQxNzA2MTFFOTlFMTlCM0M0Q0NDQkM3QjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjJkYzJiYWQtMDRkZi0yNDQzLTk5MWUtMWRkODNmMmE4ZDEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmVlMWI3OTM5LWU2YzYtN2I0YS1iNGViLWU0YWE0NTUyOGJlYiIv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",
            labList: [
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字"
            ]
        },
        {
            id: "2",
            desc: "新娘",
            title: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABYCAYAAABF7PEoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZTFiNzkzOS1lNmM2LTdiNGEtYjRlYi1lNGFhNDU1MjhiZWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkFDMEFGQzUxNzA2MTFFOTlFMTlCM0M0Q0NDQkM3QjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkFDMEFGQzQxNzA2MTFFOTlFMTlCM0M0Q0NDQkM3QjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjJkYzJiYWQtMDRkZi0yNDQzLTk5MWUtMWRkODNmMmE4ZDEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmVlMWI3OTM5LWU2YzYtN2I0YS1iNGViLWU0YWE0NTUyOGJlYiIv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",
            labList: [
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字",
                "最多五个字"
            ]
        }
    ],
    openId: "",
    code: "",
    utils: utils,
    config: config,
    userInfo: null,
    liveId: "",

    init() {
        this.liveId = Utils.getUrlParams("liveid");
        this.login();
    },

    login() {
        let openId = utils.storage.getData(localKey.openId);
        if (openId) {
            this.openId = openId;
        } else {
            this.getCode();
        }
    },

    getCode() {
        let self = this;
        let code = utils.getUrlParams("code");
        if (code) {
            //axios->成功 缓存openid 失败
            utils.log("code 获取成功", code);
            this.code = code;
            post(config.getUrl(config.getUserInfo), {
                wxCode: code
            }).then(function(resp) {
                utils.log("微信code发送成功", resp);
                if (resp.data.success) {
                    self.userInfo = resp.data.data;
                } else {
                    console.warn("获取用户信息失败");
                }
            }).catch(function(err) {
                utils.log("失败", err)
            });
        } else {
            wx.wxAccess();
        }
    }
};

export default Global;