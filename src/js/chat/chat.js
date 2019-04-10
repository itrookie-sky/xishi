import imConf from './webim.config.js';
// var _ = require('../lib/strophe-1.2.8.js');
import WebIM from 'easemob-websdk'

export var conn = null;

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
export function IMinit() {
    conn = new WebIM.connection({
        isHttpDNS: imConf.isHttpDNS,
        isMultiLoginSessions: imConf.isMultiLoginSessions,
        https: typeof imConf.https === 'boolean' ? imConf.https : location.protocol ===
            'https:',
        url: imConf.xmppURL,
        isAutoLogin: true,
        heartBeatWait: imConf.heartBeatWait,
        autoReconnectNumMax: imConf.autoReconnectNumMax,
        autoReconnectInterval: imConf.autoReconnectInterval,
        isStropheLog: imConf.isStropheLog,
        delivery: imConf.delivery
    });
    conn.config = imConf;
}





