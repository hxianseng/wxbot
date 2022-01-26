"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SendMsg = void 0;
var axios_1 = __importDefault(require("axios"));
var SendMsg = (function () {
    function SendMsg() {
    }
    SendMsg.prototype.sendServer = function (url, params) {
        axios_1["default"].get("".concat(url), {
            params: params
        }).then(function (response) {
            console.log('推送系统消息,请求状态码：' + response.status);
        })["catch"](function (error) {
            console.log('推送系统消息失败');
        });
    };
    return SendMsg;
}());
exports.SendMsg = SendMsg;
