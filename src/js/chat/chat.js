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
    
}

export function Chatroom(opation) {
    
}