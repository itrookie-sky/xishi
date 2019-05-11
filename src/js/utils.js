import config from './config.js'
import { localKey } from './const'

class Storage {

    getAppKey() {
        return localKey.APP + "-" + config.version;
    }

    getCurKey(key) {
        let appKey = this.getAppKey();
        return appKey + "_" + key;
    }

    setData(key, data) {
        let curKey = this.getCurKey(key);
        localStorage.setItem(curKey, data);
    }

    setObj(key, data) {
        this.setData(key, JSON.stringify(data));
    }

    getData(key) {
        let curKey = this.getCurKey(key);
        return localStorage.getItem(curKey);
    }

    getObj(key) {
        return JSON.parse(this.getData(key));
    }

    delData(key) {
        let curKey = this.getCurKey(key);
        localStorage.removeItem(curKey);
    }
}

class TimeParse {

    constructor() {//constructor是一个构造方法，用来接收参数
        this.map = [];
        this.timeId = 0;
    }

    init() {
        if (this.timeId) clearInterval(this.timeId);
        var _this = this;
        this.timeId = setInterval(function () {
            _this.update();
        }, 2000);
    }

    update() {
        if (!this.map.length) return;
        this.map.forEach((val, idx) => {
            val.func.call(val.thisObj);
        });
    }

    rgTimer(func, thisObj) {
        if (this.find(func, thisObj)) return;
        let timer = {
            func: func,
            thisObj: thisObj
        };
        this.map.push(timer);
    }

    rmTimer(func, thisObj) {
        let timer = this.find(func, thisObj);
        if (timer) {
            let idx = this.map.indexOf(timer);
            this.map.splice(idx, 1);
            return true;
        }
        return false;
    }

    find(func, thisObj) {
        let item;
        for (let i = 0; i < this.map.length; i++) {
            item = this.map[i];
            if (item.thisObj == thisObj && item.func == func) {
                return item;
            }
        }
        return null;
    }

    /**
     * 获取00d00h00m00s
     * @returns {string}
     */
    getTimeStr(sec) {
        sec = sec < 0 ? 0 : sec;
        let d = Math.floor(sec / 86400);
        let h = Math.floor(sec % 86400 / 3600);
        let m = Math.floor(sec % 3600 / 60);
        let s = Math.floor(sec % 60);
        let str = "";
        if (d > 0) str += (d < 10 ? "0" + d : d) + "d";
        if (h > 0) str += (h < 10 ? "0" + h : h) + "h";
        if (m > 0) str += (m < 10 ? "0" + m : m) + "m";
        if (s > 0) str += (s < 10 ? "0" + s : s) + "s";
        return str;
    }

    /**
     * 获取00:00:00
     * @returns {string}
     */
    getTimeStr2(sec) {
        sec = sec < 0 ? 0 : sec;
        let h = Math.floor(sec / 3600);
        let m = Math.floor(sec % 3600 / 60);
        let s = Math.floor(sec % 60);
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    /**
     * 获取YYYY-MM-DD, 通过时间戳
     * @returns {string}
     */
    getYTDByTimestamp(timestamp) {
        timestamp = timestamp < 0 ? 0 : timestamp;

        let date = new Date();
        date.setTime(timestamp);

        let Y = date.getFullYear();
        let M = date.getMonth() + 1;
        let D = date.getDate();
        return Y + "-" + (M < 10 ? "0" + M : M) + "-" + (D < 10 ? "0" + D : D);
    }

    /**
     * 获取MM月DD日, 通过时间戳
     * @returns {string}
     */
    getYTFByTimestamp(timestamp) {
        timestamp = timestamp < 0 ? 0 : timestamp;

        let date = new Date();
        date.setTime(timestamp);

        let y = date.getFullYear();
        let Y = y % 100;
        let M = date.getMonth() + 1;
        let D = date.getDate();
        return (M < 10 ? "0" + M : M) + "月" + (D < 10 ? "0" + D : D) + "日";
    }

    /**
     * 获取YY年MM月DD日 00:00:00, 通过时间戳
     * @returns {string}
     */
    getYMDHMSByTimestamp(timestamp) {
        return this.getYTDByTimestamp(timestamp * 1000) + " " + this.getHMSByTimestamp(timestamp * 1000);
    }
    /**
     * 获取00:00:00, 通过时间戳
     * @returns {string}
     */
    getHMSByTimestamp(timestamp) {
        timestamp = timestamp < 0 ? 0 : timestamp;

        let date = new Date();
        date.setTime(timestamp);

        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
    /**
    * 获取00:00, 通过时间戳
    * @returns {string}
    */
    getMSByTimestamp(timestamp) {
        timestamp = timestamp < 0 ? 0 : timestamp;

        let date = new Date();
        date.setTime(timestamp);

        let m = date.getMinutes();
        let s = date.getSeconds();
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }
}


const Utils = {
    storage: new Storage(),
    time: new TimeParse(),
    test: function () {
        this.log("utils install success", "arg2");
    },
    log: function () {
        if (config.isDebug) {
            let args = [];
            for (let i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            console.log.apply(console, args);
        }
    },
    warn: function () {
        if (config.isDebug) {
            let args = [];
            for (let i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            console.warn.apply(console, args);
        }
    },
    getNow() {
        if (!Date.now) {
            Date.now = function now() {
                return new Date().getTime();
            };
        }
        return Date.now();
    },
    getUrlParams(val, type) {
        if (!type) type = "search";
        let url = window.location[type];
        let re = new RegExp("" + val + "=([^&?]*)", "ig");
        let pa = ((url.match(re)) ? (url.match(re)[0].substr(val.length + 1)) : null);
        this.log(val + ":" + pa);
        return pa;
    },

};



export default Utils;