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
 const Utils = {
     test: function() {
         this.log("utils install success", "arg2");
     },
     log: function() {
         if (config.isDebug) {
             let args = [];
             for (let i = 0; i < arguments.length; i++) {
                 args.push(arguments[i]);
             }
             console.log.apply(console, args);
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
         console.log(val + ":" + pa);
         return pa;
     },
     storage: new Storage()
 };

 export default Utils;