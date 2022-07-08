"use strict";
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
    reapi.send_sms = function (mobile) {
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].maiarkUrl, "/getsms?mobile=").concat(mobile),
            method: 'GET',
            headers: headers,
            timeout: 10000
        });
    };
    reapi.smsLogin = function (data) {
        return (0, axios_1["default"])({
            url: "".concat(config_1["default"].maiarkUrl, "/verify?mobile=").concat(data.mobile, "&gsalt=").concat(data.gsalt, "&guid=").concat(data.guid, "&lsid=").concat(data.lsid, "&smscode=").concat(data.smscode, "&"),
            method: 'GET',
            headers: headers,
            timeout: 10000
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
