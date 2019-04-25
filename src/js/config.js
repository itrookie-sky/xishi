var AppConfig = {
    version: "1.0.1",
    port: "",
    ip: "http://demo.csjlive.com",
    client: "http://demo.csjlive.com",
    /**表情 线上目录 */
    res: "/res",
    img: "/img",
    gift: "/gift",
    emoji: "/emoji",

    isDebug: true,
    /**微信appid*/
    appid: "wxc9773ab548d317cb",
    /**微信秘钥 */
    appsecret: "3acae05dcee6d22c5cfb67f784bca7f1",
    /**网易appid */
    wyAppid: "fd245094b3a2ef23917eb657f702b72b",
    /**网易云秘钥 */
    wySecret: "b172795007e6",
    //地址相关
    /**内容分发 */
    /**获取用户信息 */
    getUserInfo: "/v1/user/getWxUser",
    /**登录 */
    login: "/v1/user/login",
    /**设置当前亲友的类型 */
    setLabel: "/v1/user/setLabel",
    /**直播页接口 */
    live: "/v1/index/index",
    /**添加聊天记录 */
    sendMsg: "/v1/chat/sendMsg",
    /**签到 */
    regin: "/v1/user/regin",
    /**获取校验码 */
    formCode: "/v1/user/formCode",
    /**发送验证码的接口 */
    sendVCode: "/v1/user/sendVCode",
    /**我的余额 */
    amount: "/v1/user/getAmount",
    /**上传图片 */
    uploadImg: "/v1/chat/upload",
    /**打赏列表 */
    giftList: "/v1/chat/giftList",
    /**获取当家指数贡献排行 */
    happy: "/v1/chat/videoList",
    /**排行榜 */
    exponent: "/v1/chat/exponent",
    /**请求微信签名 */
    wxSign: "/v1/user/getSignPackage",

    getUrl(path) {
        return this.ip + path;
    },
    getResUrl(path, name, format) {
        if (!format) format = ".png";
        return this.ip + this.res + path + "/" + name + format;
    }
};

export default AppConfig;