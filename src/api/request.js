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
exports.reapi = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = __importDefault(require("../conf/config"));
var ql_1 = __importDefault(require("../constant/ql"));
var headers;
axios_1["default"].interceptors.request.use(function (config) {
    return config;
}, function (err) {
    console.log(err);
    return Promise.resolve(err);
});
axios_1["default"].interceptors.response.use(function (data) {
    return data;
}, function (err) {
    console.log(err);
    return null;
});
var reapi = (function () {
    function reapi() {
    }
    reapi.send_sms_nark = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (0, axios_1["default"])({
                        url: "".concat(config_1["default"].nark.url, "/api/SendSMS"),
                        method: 'post',
                        data: {
                            Phone: content,
                            qlkey: config_1["default"].nark.qlkey
                        },
                        headers: headers,
                        timeout: 10000
                    })];
            });
        });
    };
    reapi.send_sms = function (mobile) {
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].maiarkUrl, "/getsms?mobile=").concat(mobile),
            method: 'GET',
            headers: headers
        });
    };
    reapi.smsLogin_nark = function (mobile, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (0, axios_1["default"])({
                        url: "".concat(config_1["default"].nark.url, "/api/VerifyCode"),
                        method: 'post',
                        data: {
                            Phone: mobile,
                            QQ: "",
                            qlkey: config_1["default"].nark.qlkey,
                            Code: code
                        },
                        timeout: 10000
                    })];
            });
        });
    };
    reapi.smsLogin = function (data) {
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].maiarkUrl, "/verify?mobile=").concat(data.mobile, "&gsalt=").concat(data.gsalt, "&guid=").concat(data.guid, "&lsid=").concat(data.lsid, "&smscode=").concat(data.smscode, "&"),
            method: 'GET',
            headers: headers
        });
    };
    reapi.getQlToken = function () {
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/auth/token?client_id=").concat(config_1["default"].clientId, "&client_secret=").concat(config_1["default"].clientSecret),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            timeout: 10000
        });
    };
    reapi.getFileByName = function (fileName) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/scripts/").concat(fileName, "?path=").concat(config_1["default"].qlNotify.jdLibrary, "&t=1657098356275"),
            method: 'GET',
            headers: qlheaders,
            timeout: 10000
        });
    };
    reapi.getFileByName2 = function (fileName) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/scripts/").concat(fileName, "?path=&t=1657098356275"),
            method: 'GET',
            headers: qlheaders,
            timeout: 10000
        });
    };
    reapi.putFile = function (data) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/scripts?t=1657098356275"),
            method: 'PUT',
            headers: qlheaders,
            data: data,
            timeout: 10000
        });
    };
    reapi.getEnvsById = function (id) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs/id"),
            method: 'GET',
            headers: qlheaders,
            timeout: 10000
        });
    };
    reapi.getEnvs = function (name) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs?searchValue=").concat(name, "&t=1657204378316"),
            method: 'GET',
            headers: qlheaders,
            timeout: 10000
        });
    };
    reapi.addEnvs = function (data) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs?t=1657204378316"),
            method: 'POST',
            headers: qlheaders,
            data: data,
            timeout: 10000
        });
    };
    reapi.deleteEnvs = function (id) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs?t=1657204378316"),
            method: 'DELETE',
            headers: qlheaders,
            data: ["".concat(id)],
            timeout: 10000
        });
    };
    reapi.disableEnvs = function (id) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs/disable?t=1657204378316"),
            method: 'PUT',
            headers: qlheaders,
            data: ["".concat(id)],
            timeout: 10000
        });
    };
    reapi.enableEnvs = function (id) {
        qlheaders.Authorization = "".concat(ql_1["default"].ql_token_type, " ").concat(ql_1["default"].qlToken);
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].QLurl, "/open/envs/enable?t=1657204378316"),
            method: 'PUT',
            headers: qlheaders,
            data: ["".concat(id)],
            timeout: 10000
        });
    };
    return reapi;
}());
exports.reapi = reapi;
var qlheaders = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Authorization': '',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44'
};
