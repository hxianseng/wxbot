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
var DataMonitoring = (function () {
    function DataMonitoring() {
    }
    DataMonitoring.queryTraffic = function (contact, msg, remark) {
        return __awaiter(this, void 0, void 0, function () {
            var _data, new_mobile_arr, i, current_traffic, data, _msg, res, time, dailyRentalPackage, combo_arr, voice_remainResource, voice_userResource, shortMessage_remainResource, shortMessage_userResource, universalTraffic, universalTraffic_use, directedTraffic, directedTraffic_use, freeTraffic_use, _i, combo_arr_1, i_1, rt, _a, dailyRentalPackage_1, item, res_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, (0, dbUtil_1.getDb)("../constant/user.json", remark)];
                    case 1:
                        _data = _b.sent();
                        if (!(_data && _data.length > 0)) return [3, 28];
                        new_mobile_arr = [];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < _data.length)) return [3, 26];
                        current_traffic = 0;
                        data = {
                            remark: _data[i].remark,
                            name: _data[i].name,
                            city: _data[i].city,
                            mobile: _data[i].mobile,
                            passwd: _data[i].passwd,
                            cookie: _data[i].cookie,
                            appId: _data[i].appId,
                            notice: _data[i].notice,
                            threshold: _data[i].threshold,
                            flow: _data[i].flow,
                            time: _data[i].time
                        };
                        _data.splice(i, 1);
                        i--;
                        _msg = msg;
                        _msg += "\u5907\u6CE8: ".concat(data.remark, "\n");
                        _msg += "\u5C3E\u53F7: ".concat(data.mobile.slice(7), "\n");
                        return [4, lt_1.ltapi.queryTraffic(data.cookie)];
                    case 3:
                        res = _b.sent();
                        if (!res) return [3, 16];
                        if (!(res.data.code == '0000')) return [3, 4];
                        time = res.data.time;
                        data.time = time;
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
                        for (_i = 0, combo_arr_1 = combo_arr; _i < combo_arr_1.length; _i++) {
                            i_1 = combo_arr_1[_i];
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
                        for (_a = 0, dailyRentalPackage_1 = dailyRentalPackage; _a < dailyRentalPackage_1.length; _a++) {
                            item = dailyRentalPackage_1[_a];
                            _msg += "\u65E5\u79DF\u5305: \u5DF2\u7528".concat(item.resourceSource, "\u4E2A/").concat(item.use, "M\n");
                        }
                        _msg += "\u901A\u7528: \u603B".concat(universalTraffic >= 1024 ? (universalTraffic / 1024).toFixed(2) + 'G' : universalTraffic + 'M', " \u7528").concat(universalTraffic_use >= 1024 ? (universalTraffic_use / 1024).toFixed(2) + 'G' : universalTraffic_use + 'M', "\n");
                        _msg += "\u5B9A\u5411: \u603B".concat(directedTraffic >= 1024 ? (directedTraffic / 1024).toFixed(2) + 'G' : directedTraffic + 'M', " \u7528").concat(directedTraffic_use >= 1024 ? (directedTraffic_use / 1024).toFixed(2) + 'G' : directedTraffic_use + 'M', "\n");
                        _msg += "\u514D\u8D39: ".concat(freeTraffic_use >= 1024 ? (freeTraffic_use / 1024).toFixed(2) + 'G' : freeTraffic_use + 'M', "\n");
                        _msg += "\u5DF2\u7528: ".concat(universalTraffic_use + directedTraffic_use >= 1024 ? ((universalTraffic_use + directedTraffic_use) / 1024).toFixed(2) + 'G' : universalTraffic_use + directedTraffic_use + 'M', "\n");
                        _msg += "\u8DF3\u70B9: ".concat((universalTraffic_use - data.flow).toFixed(3), "M\n");
                        _msg += "\u9608\u503C: ".concat(data.threshold, "M\n");
                        _msg += "\u76D1\u63A7: ".concat(data.notice == 0 ? '已开启' : '已关闭', "\n");
                        _msg += "\u65F6\u95F4: ".concat((0, moment_1["default"])(new Date(time)).format('MM-DD HH:mm'), "\n");
                        _msg += "\nPs: \u5DF2\u7528 = \u901A\u7528 + \u5B9A\u5411\n";
                        current_traffic = universalTraffic_use;
                        return [3, 15];
                    case 4:
                        if (!(res.data.code == '4114030182')) return [3, 6];
                        return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25,\u7CFB\u7EDF\u5347\u7EA7\u4E2D"))];
                    case 5:
                        _b.sent();
                        new_mobile_arr.push(data);
                        return [3, 25];
                    case 6:
                        if (!(/999998/.test(JSON.stringify(res.data)))) return [3, 13];
                        if (!(data.passwd != '')) return [3, 11];
                        return [4, utils_1.Utils.say(contact, '查询流量失败, 使用密码重新获取cookie...')];
                    case 7:
                        _b.sent();
                        return [4, DataMonitoring.pw_login(data.mobile, data.passwd)];
                    case 8:
                        res_1 = _b.sent();
                        if (!(res_1.cookie != '')) return [3, 10];
                        return [4, utils_1.Utils.say(contact, '获取成功, 请重新查询')];
                    case 9:
                        _b.sent();
                        data.cookie = res_1.cookie;
                        data.appId = res_1.appId;
                        _b.label = 10;
                    case 10:
                        new_mobile_arr.push(data);
                        return [3, 25];
                    case 11: return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + JSON.stringify(res.data) + '\n有时会查询失败, 如果一直查询失败请重新登录\n流量监控每5分钟刷新一次,没达到阈值不通知')];
                    case 12:
                        _b.sent();
                        new_mobile_arr.push(data);
                        return [3, 25];
                    case 13:
                        if (!(/999999/.test(JSON.stringify(res.data)))) return [3, 15];
                        return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + JSON.stringify(res.data) + '\n有时会查询失败, 如果一直查询失败请重新登录\n流量监控每5分钟刷新一次,没达到阈值不通知')];
                    case 14:
                        _b.sent();
                        new_mobile_arr.push(data);
                        return [3, 25];
                    case 15: return [3, 18];
                    case 16: return [4, utils_1.Utils.say(contact, "".concat(_msg + '\n', "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + '[queryTraffic]api请求失败,请联系管理员查看日志')];
                    case 17:
                        _b.sent();
                        new_mobile_arr.push(data);
                        return [3, 25];
                    case 18:
                        if (!(/监控跳点/).test(msg)) return [3, 23];
                        if (!(current_traffic - data.flow < data.threshold || data.notice != 0)) return [3, 19];
                        new_mobile_arr.push(data);
                        console.log('没有达到阈值，不通知');
                        return [3, 22];
                    case 19:
                        data.flow = current_traffic;
                        new_mobile_arr.push(data);
                        return [4, utils_1.Utils.say(contact, _msg)];
                    case 20:
                        _b.sent();
                        return [4, utils_1.Utils.say(contact, file_box_1.FileBox.fromUrl('https://m.360buyimg.com/babel/jfs/t1/27447/23/19534/10072/633a996aE7f6b63a2/d8b7aff328dc56f8.jpg'))];
                    case 21:
                        _b.sent();
                        _b.label = 22;
                    case 22: return [3, 25];
                    case 23:
                        data.flow = current_traffic;
                        new_mobile_arr.push(data);
                        return [4, utils_1.Utils.say(contact, _msg)];
                    case 24:
                        _b.sent();
                        _b.label = 25;
                    case 25:
                        i++;
                        return [3, 2];
                    case 26:
                        _data = _data.concat(new_mobile_arr);
                        return [4, (0, dbUtil_1.saveDb)(_data, '../constant/user.json', remark)];
                    case 27:
                        _b.sent();
                        return [3, 30];
                    case 28: return [4, utils_1.Utils.say(contact, "\u6B64\u5FAE\u4FE1\u6CA1\u6709\u767B\u5F55\u8FC7,\u53D1\u9001:\n\u8054\u901A\u767B\u5F55 ")];
                    case 29:
                        _b.sent();
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
