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
exports.qingLongApi = void 0;
var axios_1 = __importDefault(require("axios"));
var request_1 = __importDefault(require("request"));
var qingLongApi = (function () {
    function qingLongApi() {
    }
    qingLongApi.getToken = function (QLurl, clientId, clientSecret) {
        return (0, axios_1["default"])({
            url: QLurl + "/open/auth/token?client_id=".concat(clientId, "&client_secret=").concat(clientSecret),
            method: 'get',
            headers: qingLongApi.headers2,
            timeout: 1000 * 10
        });
    };
    qingLongApi.getCookies = function (QLurl, token) {
        var t = new Date().getTime();
        return (0, axios_1["default"])({
            url: QLurl + "/open/envs?searchValue=&t=".concat(t),
            method: 'get',
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'Connection': 'keep-alive',
                'Authorization': "Bearer ".concat(token),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.62'
            },
            timeout: 1000 * 10
        });
    };
    qingLongApi.updateCookie = function (data, token, QLurl) {
        return __awaiter(this, void 0, void 0, function () {
            var t, url;
            return __generator(this, function (_a) {
                t = new Date().getTime();
                url = QLurl + "/open/envs?t=".concat(t);
                return [2, axios_1["default"].put(url, data, {
                        headers: {
                            'Connection': 'keep-alive',
                            Authorization: "Bearer ".concat(token),
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    })];
            });
        });
    };
    qingLongApi.enableCookie = function (QLurl, id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var t, url;
            return __generator(this, function (_a) {
                t = new Date().getTime();
                url = QLurl + "/open/envs/enable?t=".concat(t);
                return [2, axios_1["default"].put(url, [id], {
                        headers: {
                            'Connection': 'keep-alive',
                            Authorization: "Bearer ".concat(token),
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    })];
            });
        });
    };
    qingLongApi.addCookie = function (cookie, token, QLurl) {
        return __awaiter(this, void 0, void 0, function () {
            var data, t, url;
            return __generator(this, function (_a) {
                data = [{
                        name: 'JD_COOKIE',
                        value: cookie
                    }];
                t = new Date().getTime();
                url = QLurl + "/open/envs?t=".concat(t);
                return [2, axios_1["default"].post(url, data, {
                        headers: {
                            'Connection': 'keep-alive',
                            'Content-Type': 'application/json;charset=UTF-8',
                            Authorization: "Bearer ".concat(token)
                        }
                    })];
            });
        });
    };
    qingLongApi.getConfigNolan = function (url) {
        return new Promise(function (resolve) {
            var options = {
                'url': url,
                'headers': qingLongApi.headers
            };
            request_1["default"].get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (data) {
                            data = JSON.parse(data);
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    resolve(data);
                }
            });
        });
    };
    qingLongApi.getUser = function (url) {
        return (0, axios_1["default"])({
            url: url,
            method: 'get',
            headers: qingLongApi.headers,
            timeout: 1000 * 10
        });
    };
    qingLongApi.delUser = function (url, data) {
        return (0, axios_1["default"])({
            url: url,
            method: 'post',
            headers: qingLongApi.headers,
            data: data,
            timeout: 1000 * 10
        });
    };
    qingLongApi.sendSMSNolan = function (url, data) {
        return (0, axios_1["default"])({
            url: url,
            method: 'post',
            headers: qingLongApi.headers,
            data: data,
            timeout: 1000 * 180
        });
    };
    qingLongApi.verifyCodeNolan = function (url, data) {
        return (0, axios_1["default"])({
            url: url,
            method: 'post',
            headers: qingLongApi.headers,
            data: data,
            timeout: 1000 * 60
        });
    };
    qingLongApi.autoCaptchaNolan = function (url, data) {
        return new Promise(function (resolve) {
            var options = {
                url: url,
                json: true,
                body: data,
                headers: qingLongApi.headers
            };
            request_1["default"].post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (data) {
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    resolve(data);
                }
            });
        });
    };
    qingLongApi.getQLConfig = function (url) {
        return new Promise(function (resolve) {
            var options = {
                url: url,
                headers: qingLongApi.headers
            };
            request_1["default"].get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (data) {
                            data = JSON.parse(data);
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    resolve(data);
                }
            });
        });
    };
    qingLongApi.headers = {
        'accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.62'
    };
    qingLongApi.headers2 = {
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.62'
    };
    return qingLongApi;
}());
exports.qingLongApi = qingLongApi;
