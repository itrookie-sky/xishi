 import config from './config.js'
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
     }
 };

 export default Utils;