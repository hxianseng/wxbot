"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            timeout: 10000
        });
    };
    ltapi.radomLogin = function (mobile, code_sms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (0, axios_1["default"])({
                        url: 'https://m.client.10010.com/mobileService/radomLogin.htm',
                        method: 'post',
                        data: this.transParams({
                            mobile: (0, JSEncrypt_1["default"])(mobile),
                            password: (0, JSEncrypt_1["default"])(code_sms),
                            appId: this.random(160),
                            version: 'iphone_c@9.0100'
                        }),
                        headers: {
                            'accept': 'application/json, text/plain, */*',
                            'accept-encoding': 'gzip, deflate, br',
                            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                            'cache-control': 'no-cache',
                            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/105.0.0.0',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        timeout: 10000
                    })];
            });
        });
    };
    ltapi.random = function (num) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    ltapi.queryTraffic = function (cookie) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (0, axios_1["default"])({
                        url: 'https://m.client.10010.com/servicequerybusiness/operationservice/queryOcsPackageFlowLeftContentRevisedInJune',
                        method: 'post',
                        headers: {
                            'accept': 'application/json, text/plain, */*',
                            'accept-encoding': 'gzip, deflate, br',
                            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                            'cache-control': 'no-cache',
                            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/105.0.0.0',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'cookie': cookie
                        }
                    })];
            });
        });
    };
    return ltapi;
}());
exports.ltapi = ltapi;
