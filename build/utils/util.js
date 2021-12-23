"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.util = void 0;
var config_1 = __importDefault(require("../config"));
var SendMsg_1 = require("./SendMsg");
var util = (function () {
    function util() {
    }
    util.delay = function () {
        return new Promise(function (resolve) {
            return setTimeout(resolve, Math.round(Math.random() * 800 + 500));
        });
    };
    util.pushChoice = function (msg) {
        var choice = config_1["default"].pushMessage.choice;
        if (choice == 0 || choice == null) {
            console.log("choice=0,\u4E0D\u63A8\u9001\u7CFB\u7EDF\u6D88\u606F");
            return;
        }
        else {
            var pushList = config_1["default"].pushMessage.pushList;
            for (var i in pushList) {
                if (choice == pushList[i].id && choice == 1) {
                    var params = Object.assign({
                        pushkey: pushList[i].pushKey,
                        text: msg
                    });
                    var sendMsg = new SendMsg_1.SendMsg();
                    sendMsg.sendServer(pushList[i].url, params);
                    break;
                }
                if (choice == pushList[i].id && choice == 2) {
                    var params = Object.assign({
                        token: pushList[i].pushKey,
                        content: msg
                    });
                    var sendMsg = new SendMsg_1.SendMsg();
                    sendMsg.sendServer(pushList[i].url, params);
                    break;
                }
            }
        }
    };
    return util;
}());
exports.util = util;
