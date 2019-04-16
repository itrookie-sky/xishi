import imConf from './webim.config.js';
import WebIM from 'easemob-websdk';
import g from "../global.js";
import config from "../config.js";
import utils from "../utils.js";
import { post } from "../http/http.js";




/**
 * The connection class.
 * @param {Object} options - 创建连接的初始化参数
 * @param {String} options.url - xmpp服务器的URL
 * @param {String} options.apiUrl - API服务器的URL
 * @param {Boolean} options.isHttpDNS - 防止域名劫持
 * @param {Boolean} options.isMultiLoginSessions - 为true时同一账户可以同时在多个Web页面登录（多标签登录，默认不开启，如有需要请联系商务），为false时同一账号只能在一个Web页面登录
 * @param {Boolean} options.https - 是否启用wss.
 * @param {Number} options.heartBeatWait - 发送心跳包的时间间隔（毫秒）
 * @param {Boolean} options.isAutoLogin - 登录成功后是否自动出席
 * @param {Number} options.autoReconnectNumMax - 掉线后重连的最大次数
 * @param {Number} options.autoReconnectInterval -  掉线后重连的间隔时间（毫秒）
 * @param {Boolean} options.isWindowSDK - 是否运行在WindowsSDK上
 * @param {Boolean} options.encrypt - 是否加密文本消息
 * @param {Boolean} options.delivery - 是否发送delivered ack
 * 初始化
 */
function init() {
    mod.conn = new WebIM.connection({
        isHttpDNS: imConf.isHttpDNS,
        isMultiLoginSessions: imConf.isMultiLoginSessions,
        https: typeof imConf.https === 'boolean' ? imConf.https : location.protocol === 'https:',
        url: imConf.xmppURL,
        isAutoLogin: imConf.isAutoLogin,
        heartBeatWait: imConf.heartBeatWait,
        autoReconnectNumMax: imConf.autoReconnectNumMax,
        autoReconnectInterval: imConf.autoReconnectInterval,
        isStropheLog: imConf.isStropheLog,
        delivery: imConf.delivery
    });
    mod.conn.config = imConf;
}

/**
 * 聊天接口登录
 */
function open() {
    var option = {
        apiUrl: imConf.apiURL,
        user: g.openId,
        pwd: g.IMpassword,
        appKey: imConf.appkey
    }
    mod.conn.open(option);
}

/**
 * 加入聊天室
 */
function join() {
    mod.conn.joinChatRoom({
        roomId: g.chatRoomId
    });
}


/**
 * 发送消息
 */
function sendMsg(data) {
    return new Promise((resolve, reject) => {
        var id = mod.conn.getUniqueId();
        var msg = new WebIM.message("txt", id);
        var send = JSON.stringify(data);
        var option = {
            msg: send, // 消息内容
            to: g.chatRoomId, // 接收消息对象(群组id)
            roomType: true, // 群聊类型，true时为聊天室，false时为群组
            success: function (msg) {
                var obj = {
                    openId: g.openId,
                    liveId: g.liveId,
                    type: data.type,
                    content: data.content
                };
                if (data.to_type) obj.toUser = data.to_type;
                resolve(data);
                post(config.getUrl(config.sendMsg), obj)
                    .then(function (resp) {
                        utils.log("%c[sendmsg] 聊天记录留存", "color:green", resp);
                    }).catch(function (err) {
                        utils.warn(err);
                    });
                utils.log("%c [success] send msg ", "color:green", msg);
            }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (msg) {
                utils.error(msg);
            } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        msg.setGroup("groupchat"); // 群聊类型
        mod.conn.send(msg.body);
        utils.log("%c[send msg] 发送消息:", "color:blue", msg.body);
    })

}

/**
 * 获取基本消息结构体
 */
function getBaseMsg(type, cnt) {
    if (!type) type = "text"
    let obj = {
        "from_name": g.userInfo.nickname,
        "from_headimg": g.userInfo.headimgurl,
        "from_label": g.userLabel,
        "type": type,
        "content": cnt || ""
    }
    return obj;
}

var mod = {
    sendMsg: sendMsg,
    join: join,
    init: init,
    conn: {},
    open: open,
    getBaseMsg: getBaseMsg
};

export default mod;


