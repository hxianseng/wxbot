"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ltapi = void 0;
var axios_1 = __importDefault(require("axios"));
var JSEncrypt_1 = __importDefault(require("../lib/JSEncrypt"));
var headers;
var ltapi = (function () {
    function ltapi() {
    }
    ltapi.transParams = function (data) {
        return Object.keys(data)
            .map(function (k) { return "".concat(k, "=").concat(encodeURIComponent(data[k])); })
            .join('&');
    };
    ltapi.sendRadomNum = function (mobile) {
        return (0, axios_1["default"])({
            url: 'https://m.client.10010.com/mobileService/sendRadomNum.htm',
            method: 'post',
            data: this.transParams({
                mobile: (0, JSEncrypt_1["default"])(mobile),
                version: 'iphone_c@9.0100',
                keyVersion: ''
            }),
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'cache-control': 'no-cache',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/105.0.0.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseEncoding: "utf-8",
            timeout: 10000
        });
    };
    return ltapi;
}());
exports.ltapi = ltapi;
