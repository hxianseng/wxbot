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
exports.DataMonitoring = void 0;
var lt_1 = require("../../api/lt");
var file_box_1 = require("file-box");
var dbUtil_1 = require("../../util/dbUtil");
var moment_1 = __importDefault(require("moment"));
var utils_1 = require("../../util/utils");
var wechaty_1 = require("wechaty");
var DataMonitoring = (function () {
    function DataMonitoring() {
    }
    DataMonitoring.queryTraffic = function (contact, msg, remark, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _data, _a, _b, _i, i, remark_1, mobile, passwd, cookie, appId, notice, threshold, flow, time, _msg, res, dailyRentalPackage, combo_arr, voice_remainResource, voice_userResource, shortMessage_remainResource, shortMessage_userResource, universalTraffic, universalTraffic_use, directedTraffic, directedTraffic_use, freeTraffic_use, _c, combo_arr_1, i_1, rt, _d, dailyRentalPackage_1, item, res_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4, (0, dbUtil_1.getDb)("../constant/user.json", remark)];
                    case 1:
                        _data = _e.sent();
                        if (!(_data && _data.length > 0)) return [3, 28];
                        _a = [];
                        for (_b in _data)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 26];
                        i = _a[_i];
                        remark_1 = _data[i].remark;
                        mobile = _data[i].mobile;
                        passwd = _data[i].passwd;
                        cookie = _data[i].cookie;
                        appId = _data[i].appId;
                        notice = _data[i].notice;
                        threshold = _data[i].threshold;
                        flow = _data[i].flow;
                        time = _data[i].time;
                        if (notice == 1 && type == 3) {
                            wechaty_1.log.info("".concat(remark_1, "\u7684").concat(mobile, " \u5173\u95ED\u76D1\u63A7 \u8DF3\u8FC7"));
                            return [3, 25];
                        }
                        _msg = msg;
                        _msg += "\u5907\u6CE8: ".concat(remark_1, "\n");
                        _msg += "\u5C3E\u53F7: ".concat(mobile.slice(7), "\n");
                        return [4, lt_1.ltapi.queryTraffic(cookie)];
                    case 3:
                        res = _e.sent();
                        if (!res) return [3, 23];
                        if (!(res.data.code == '0000')) return [3, 11];
                        console.log('刚上线测试，因套餐不同，可能会有显示bug，打印套餐日志');
                        console.log("==========================================================");
                        console.log("data：" + JSON.stringify(res.data));
                        console.log("==========================================================");
                        _msg += "\u5957\u9910: ".concat((res.data.packageName).slice(0, 9) + '*', "\n");
                        dailyRentalPackage = res.data.RzbResources[0].details;
                        combo_arr = res.data.resources[0].details;
                        voice_remainResource = parseInt(res.data.resources[1].remainResource);
                        voice_userResource = parseInt(res.data.resources[1].userResource);
                        shortMessage_remainResource = parseInt(res.data.resources[2].remainResource);
                        shortMessage_userResource = parseInt(res.data.resources[2].userResource);
                        universalTraffic = 0;
                        universalTraffic_use = 0;
                        directedTraffic = 0;
                        directedTraffic_use = 0;
                        freeTraffic_use = res.data.MlResources[0].userResource ? res.data.MlResources[0].userResource : 0;
                        for (_c = 0, combo_arr_1 = combo_arr; _c < combo_arr_1.length; _c++) {
                            i_1 = combo_arr_1[_c];
                            rt = i_1.resourceType;
                            if (rt == '01' || rt == '47' || rt == 'I0') {
                                universalTraffic += parseFloat(i_1.total);
                                universalTraffic_use += parseFloat(i_1.use);
                            }
                            else if (rt == 'I2' || rt == '13' || rt == 'I3' || rt == 'S0') {
                                directedTraffic += parseFloat(i_1.total);
                                directedTraffic_use += parseFloat(i_1.use);
                            }
                        }
                        _msg += "\u8BED\u97F3: \u603B".concat(voice_userResource + voice_remainResource, "\u5206\u949F \u7528").concat(voice_userResource, "\u5206\u949F\n");
                        _msg += "\u77ED\u4FE1: \u603B".concat(shortMessage_userResource + shortMessage_remainResource, "\u6761 \u7528").concat(shortMessage_userResource, "\u6761\n");
                        for (_d = 0, dailyRentalPackage_1 = dailyRentalPackage; _d < dailyRentalPackage_1.length; _d++) {
                            item = dailyRentalPackage_1[_d];
                            _msg += "\u65E5\u79DF\u5305: \u5DF2\u7528".concat(item.resourceSource, "\u4E2A/").concat(item.use, "M\n");
                        }
                        _msg += "\u901A\u7528: \u603B".concat(universalTraffic >= 1024 ? (universalTraffic / 1024).toFixed(2) + 'G' : universalTraffic + 'M', " \u7528").concat(universalTraffic_use >= 1024 ? (universalTraffic_use / 1024).toFixed(2) + 'G' : universalTraffic_use + 'M', "\n");
                        _msg += "\u5B9A\u5411: \u603B".concat(directedTraffic >= 1024 ? (directedTraffic / 1024).toFixed(2) + 'G' : directedTraffic + 'M', " \u7528").concat(directedTraffic_use >= 1024 ? (directedTraffic_use / 1024).toFixed(2) + 'G' : directedTraffic_use + 'M', "\n");
                        _msg += "\u514D\u8D39: ".concat(freeTraffic_use >= 1024 ? (freeTraffic_use / 1024).toFixed(2) + 'G' : freeTraffic_use + 'M', "\n");
                        _msg += "\u5DF2\u7528: ".concat(universalTraffic_use + directedTraffic_use >= 1024 ? ((universalTraffic_use + directedTraffic_use) / 1024).toFixed(2) + 'G' : universalTraffic_use + directedTraffic_use + 'M', "\n");
                        _msg += "\u8DF3\u70B9: ".concat((universalTraffic_use - flow).toFixed(3), "M\n");
                        _msg += "\u9608\u503C: ".concat(threshold, "M\n");
                        _msg += "\u76D1\u63A7: ".concat(notice == 0 ? '已开启' : '已关闭', "\n");
                        _msg += "\u65F6\u95F4: ".concat((0, moment_1["default"])(new Date(res.data.time)).format('MM-DD HH:mm'), "\n");
                        _msg += "\nPs: \u5DF2\u7528 = \u901A\u7528 + \u5B9A\u5411\n";
                        _data[i].time = res.data.time;
                        if (!(type == 3)) return [3, 8];
                        if (!(universalTraffic_use - flow < threshold)) return [3, 4];
                        wechaty_1.log.info("".concat(remark_1, "\u7684").concat(mobile, "\u6CA1\u6709\u8FBE\u5230\u9608\u503C\uFF0C\u4E0D\u901A\u77E5"));
                        return [3, 7];
                    case 4:
                        _data[i].flow = universalTraffic_use;
                        return [4, utils_1.Utils.say(contact, _msg)];
                    case 5:
                        _e.sent();
                        return [4, utils_1.Utils.say(contact, file_box_1.FileBox.fromUrl('https://m.360buyimg.com/babel/jfs/t1/27447/23/19534/10072/633a996aE7f6b63a2/d8b7aff328dc56f8.jpg'))];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7: return [3, 10];
                    case 8:
                        _data[i].flow = universalTraffic_use;
                        return [4, utils_1.Utils.say(contact, _msg)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [3, 22];
                    case 11:
                        if (!(res.data.code == '4114030182')) return [3, 13];
                        return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25,\u7CFB\u7EDF\u5347\u7EA7\u4E2D"))];
                    case 12:
                        _e.sent();
                        return [3, 22];
                    case 13:
                        if (!(/999998/.test(JSON.stringify(res.data)))) return [3, 20];
                        if (!(passwd != '')) return [3, 18];
                        return [4, utils_1.Utils.say(contact, "\u5C3E\u53F7: ".concat(mobile.slice(7), "\n") + '查询流量失败, 使用密码重新获取cookie...')];
                    case 14:
                        _e.sent();
                        return [4, DataMonitoring.pw_login(mobile, passwd)];
                    case 15:
                        res_1 = _e.sent();
                        if (!(res_1.cookie != '')) return [3, 17];
                        return [4, utils_1.Utils.say(contact, '获取成功, 请重新查询')];
                    case 16:
                        _e.sent();
                        _data[i].cookie = res_1.cookie;
                        _data[i].appId = res_1.appId;
                        _e.label = 17;
                    case 17: return [3, 25];
                    case 18: return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n\u8054\u901A\u8FD4\u56DE:") + JSON.stringify(res.data) + '\n有时会查询失败, 如果一直查询失败请重新登录\n流量监控每5分钟刷新一次,没达到阈值不通知')];
                    case 19:
                        _e.sent();
                        return [3, 22];
                    case 20:
                        if (!(/999999/.test(JSON.stringify(res.data)))) return [3, 22];
                        return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n\u8054\u901A\u8FD4\u56DE:") + JSON.stringify(res.data) + '\n有时会查询失败, 如果一直查询失败请重新登录\n流量监控每5分钟刷新一次,没达到阈值不通知')];
                    case 21:
                        _e.sent();
                        _e.label = 22;
                    case 22: return [3, 25];
                    case 23: return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + '[queryTraffic]api请求失败,请联系管理员查看日志')];
                    case 24:
                        _e.sent();
                        _e.label = 25;
                    case 25:
                        _i++;
                        return [3, 2];
                    case 26: return [4, (0, dbUtil_1.saveDb)(_data, '../constant/user.json', remark)];
                    case 27:
                        _e.sent();
                        return [3, 30];
                    case 28: return [4, utils_1.Utils.say(contact, "\u6B64\u5FAE\u4FE1\u6CA1\u6709\u767B\u5F55\u8FC7,\u53D1\u9001:\n\u8054\u901A\u767B\u5F55 ")];
                    case 29:
                        _e.sent();
                        return [2];
                    case 30: return [2];
                }
            });
        });
    };
    DataMonitoring.pw_login = function (mobile, pw) {
        return __awaiter(this, void 0, void 0, function () {
            var res, cookie, appId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lt_1.ltapi.radomLogin_pw(mobile, pw)];
                    case 1:
                        res = _a.sent();
                        cookie = '', appId = '';
                        if (res) {
                            if (res.data.code == '0') {
                                appId = res.data.appId;
                                cookie = res.headers['set-cookie'] || res.headers['Set-Cookie'];
                                if (Array.isArray(cookie)) {
                                    cookie = cookie.join('; ');
                                }
                                if (!cookie) {
                                    return [2, {}];
                                }
                            }
                        }
                        return [2, { cookie: cookie, appId: appId }];
                }
            });
        });
    };
    return DataMonitoring;
}());
exports.DataMonitoring = DataMonitoring;
