import '../lib/NIM_Web_Chatroom_v6.2.0'
import config from "../config.js"
/**配置设置 */
export class Opation {
    /**请求协议 true https */
    secure = true;
    /**appid */
    appKey = config.wyAppid;
    account = "";
    token = "";
    nosScenes = Infinity;
    chatroomId = '';
    chatroomAddresses = [];
    /**连接成功 */
    onconnect;
    /**断开连接 */
    ondisconnect;
    /**错误 */
    onerror;
    /**消息 */
    onmsgs;
}

export var opation = new Opation();

export function chatInstance(opation) {
    Chatroom.getInstance(opation);
}