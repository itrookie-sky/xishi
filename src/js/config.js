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
    configSrc: `http://demo.csjlive.com/res/config/liveconfig.json`,

    isDebug: true,
    wxDebug: true,
    showPanelMenu: true,
    /**微信appid*/
    appid: "wx41e6ffacc036a4da",
    /**微信秘钥 */
    appsecret: "96b8298d471a07f1b5e605cd2b2c458a",
    //测试号
    // appid: "wxc9773ab548d317cb",
    // appsecret: "3acae05dcee6d22c5cfb67f784bca7f1",
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
    /**获取聊天记录的接口 */
    getChatList: "/v1/chat/index",
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
    /**发送红包 */
    sendHongbao: "/v1/user/sendHongbao",
    /**打开红包 */
    openHongbao: "/v1/user/receiveHongbao",
    /**送礼物 */
    sendGift: "/v1/chat/sendGift",
    /**签到进度 */
    signInData: "/v1/user/signInData",
    /**提现 */
    cashOut: "/v1/user/cashOut",
    /**点赞 */
    liked: "/v1/chat/liked",
    /** 准备抽奖*/
    prizeReady: "/v1/screen/ready",
    /**抽奖页面 */
    luckDraw: "/v1/screen/luckDraw",
    /** 全部中奖名单*/
    allPrizePeople: "/v1/screen/winner",
    /**大屏登录 */
    bigLogin: "/v1/screen/login",
    /**大屏扫码登录 */
    bigSigin: "/v1/screen/sigin",
    /**绑定新人 */
    newFormCode: "/v1/user/newFormCode",
    /**发送短信验证码 */
    newSendVCode: "/v1/user/newSendVCode",
    /** 绑定新人*/
    newVerification: "/v1/user/newVerification",
    /**微信分享数据 */
    shareLink: "/v1/user/shareLink",
    /**表情地址列表 */
    expression: [
        "http://demo.csjlive.com/res/emoji/xqxa.gif",
        "http://demo.csjlive.com/res/emoji/ttmm.gif",
        "http://demo.csjlive.com/res/emoji/ssss.gif",
        "http://demo.csjlive.com/res/emoji/marr-me.gif",
        "http://demo.csjlive.com/res/emoji/love.gif",
        "http://demo.csjlive.com/res/emoji/long.gif",
        "http://demo.csjlive.com/res/emoji/jyly.gif",
        "http://demo.csjlive.com/res/emoji/happy.gif",
        "http://demo.csjlive.com/res/emoji/hand.gif",
        "http://demo.csjlive.com/res/emoji/daji.gif",
        "http://demo.csjlive.com/res/emoji/bnhh.gif",
        "http://demo.csjlive.com/res/emoji/blbq.gif",
        "http://demo.csjlive.com/res/emoji/yyah.gif"
    ],
    guideliveText: `<p>当家指数玩法规则:</p>
        <p>所有的互动环节(发送文字和图片，打赏，发红包，点赞，</p>
        <p>(分享)都会获得当家指数，根据之前所选的标签给相应阵营增加</p>
        <p>当家指数</p>
        <p>目前所获得的当家指数：3041</p>
        <p>1.发送文字信息(1条=1当家指数)：12</p>
        <p>2.发送图片信息(1张=2当家指数)：20</p>
        <p>3.点赞(5个赞=1当家指数)：10</p>
        <p>4.打赏(1rmb=100当家指数)：999</p>
        <p>5.打赏(1rmb=100当家指数)：1000</p>
        <p>6.分享(1次=1000当家指数，每天通过分享最多获得3000当家指数)：1000   (1/3)</p>
        <p>7.签到成功后增加5000当家指数：0</p>`,
    getUrl(path) {
        return this.ip + path;
    },
    getResUrl(path, name, format) {
        if (!format) format = ".png";
        return this.ip + this.res + path + "/" + name + format;
    }
};

export default AppConfig;