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
exports.__esModule = true;
exports.DataMonitoring = exports.lt_data = void 0;
var lt_1 = require("../../api/lt");
var dbUtil_1 = require("../../util/dbUtil");
exports.lt_data = [];
var DataMonitoring = (function () {
    function DataMonitoring() {
    }
    DataMonitoring.getVerificationCode = function (contact, content, remarks) {
        return __awaiter(this, void 0, void 0, function () {
            var time, mobile, index, res, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = new Date().getTime();
                        mobile = content.replace("联通#", "");
                        return [4, contact.say('请稍后...')];
                    case 1:
                        _a.sent();
                        index = exports.lt_data.findIndex(function (x) { return x.name == contact.name(); });
                        if (!(index != -1)) return [3, 3];
                        return [4, contact.say('短时间内重复获取,请在三分钟后再试')];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3: return [4, lt_1.ltapi.sendRadomNum(mobile)];
                    case 4:
                        res = _a.sent();
                        if (!res) return [3, 12];
                        if (!(res.data.rsp_code == '0000')) return [3, 7];
                        return [4, contact.say('验证码已发送,请在120秒内回复\n联通#4位数字验证码')];
                    case 5:
                        _a.sent();
                        return [4, contact.say('例如 联通#7415')];
                    case 6:
                        _a.sent();
                        data = {
                            mobile: mobile,
                            name: contact.name()
                        };
                        exports.lt_data.push(data);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var index;
                            return __generator(this, function (_a) {
                                index = exports.lt_data.findIndex(function (x) { return x.name == contact.name(); });
                                if (index != -1) {
                                    exports.lt_data.splice(index, 1);
                                }
                                return [2];
                            });
                        }); }, 1000 * 180);
                        return [3, 11];
                    case 7:
                        if (!(res.data.rsp_code == '7096')) return [3, 9];
                        return [4, contact.say('距离上次随机码发送不超过1分钟')];
                    case 8:
                        _a.sent();
                        return [2];
                    case 9: return [4, contact.say('验证码发送失败\n' + JSON.stringify(res.data))];
                    case 10:
                        _a.sent();
                        return [2];
                    case 11: return [3, 13];
                    case 12:
                        contact.say('[sendRadomNum]api请求失败,请联系管理员查看日志');
                        return [2];
                    case 13: return [2];
                }
            });
        });
    };
    DataMonitoring.login = function (contact, content, remarks) {
        return __awaiter(this, void 0, void 0, function () {
            var index, data, code_sms, res, cookie, appId, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = exports.lt_data.findIndex(function (x) { return x.name == contact.name(); });
                        if (!(index == -1)) return [3, 2];
                        return [4, contact.say('验证失败,请重新获取验证码')];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2:
                        data = exports.lt_data[index];
                        code_sms = content.replace("联通#", "");
                        return [4, lt_1.ltapi.radomLogin(data.mobile, code_sms)];
                    case 3:
                        res = _a.sent();
                        if (!res) return [3, 13];
                        if (!(res.data.code == '0')) return [3, 10];
                        appId = res.data.appId;
                        cookie = res.headers['set-cookie'] || res.headers['Set-Cookie'];
                        if (Array.isArray(cookie)) {
                            cookie = cookie.join('; ');
                        }
                        if (!!cookie) return [3, 5];
                        return [4, contact.say("\u83B7\u53D6\u5230\u7684cookie\u4E3A\u7A7A,\u8BF7\u7A0D\u540E\u91CD\u8BD5")];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4, contact.say('登录成功')];
                    case 6:
                        _a.sent();
                        return [4, DataMonitoring.saveCookie(data.mobile, cookie, appId, contact.name())];
                    case 7:
                        _a.sent();
                        return [4, contact.say('查询中,请稍后...')];
                    case 8:
                        _a.sent();
                        msg = '';
                        return [4, DataMonitoring.queryTraffic(contact, msg)];
                    case 9:
                        _a.sent();
                        return [3, 12];
                    case 10: return [4, contact.say('登录失败\n' + JSON.stringify(res.data))];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3, 15];
                    case 13: return [4, contact.say('[radomLogin]api请求失败,请联系管理员查看日志')];
                    case 14:
                        _a.sent();
                        return [2];
                    case 15: return [2];
                }
            });
        });
    };
    DataMonitoring.saveCookie = function (mobile, cookie, appId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var db, mobile_arr, data, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                    case 1:
                        db = _a.sent();
                        mobile_arr = db.lt_arr[name];
                        data = {
                            mobile: mobile,
                            cookie: cookie,
                            appId: appId,
                            notice: 0,
                            threshold: 5,
                            flow: 0,
                            time: null
                        };
                        if (!mobile_arr) {
                            mobile_arr = [data];
                        }
                        else {
                            index = mobile_arr.findIndex(function (x) { return x.mobile == data.mobile; });
                            if (index != -1) {
                                mobile_arr.splice(index, 1);
                            }
                            mobile_arr.push(data);
                        }
                        db.lt_arr[name] = mobile_arr;
                        return [4, (0, dbUtil_1.saveDb)(db, '../constant/lt.json')];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DataMonitoring.queryTraffic = function (contact, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var name, db, mobile_arr, new_mobile_arr, i, data, _msg, res, time, dailyRentalPackage, combo_arr, voice_remainResource, voice_userResource, shortMessage_remainResource, shortMessage_userResource, universalTraffic, universalTraffic_use, directedTraffic, directedTraffic_use, freeTraffic_use, _i, combo_arr_1, i_1, rt, _a, dailyRentalPackage_1, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = contact.name();
                        return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                    case 1:
                        db = _b.sent();
                        mobile_arr = db.lt_arr[name];
                        if (!mobile_arr) return [3, 16];
                        new_mobile_arr = [];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < mobile_arr.length)) return [3, 14];
                        data = {
                            mobile: mobile_arr[i].mobile,
                            cookie: mobile_arr[i].cookie,
                            appId: mobile_arr[i].appId,
                            notice: mobile_arr[i].notice,
                            threshold: mobile_arr[i].threshold,
                            flow: mobile_arr[i].flow,
                            time: mobile_arr[i].time
                        };
                        mobile_arr.splice(i, 1);
                        i--;
                        _msg = msg;
                        _msg += "\u5C3E\u53F7: ".concat(data.mobile.slice(7), "\n");
                        return [4, lt_1.ltapi.queryTraffic(data.cookie)];
                    case 3:
                        res = _b.sent();
                        if (!res) return [3, 9];
                        if (!(res.data.code == '0000')) return [3, 4];
                        time = res.data.time;
                        data.time = time;
                        console.log('刚上线测试，因套餐不同，可能会有显示bug，打印套餐日志');
                        console.log("日租包：" + JSON.stringify(res.data.RzbResources));
                        console.log("套餐：" + JSON.stringify(res.data.resources));
                        console.log("==========================================================");
                        console.log("data：" + JSON.stringify(res.data));
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
                            else if (rt == 'I2' || rt == '13' || rt == 'I3') {
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
                        _msg += "\u8DF3\u70B9: ".concat(universalTraffic_use - data.flow, "M\n");
                        _msg += "\u65F6\u95F4: ".concat(time, "\n");
                        _msg += "\nPs: \u5DF2\u7528 = \u901A\u7528 + \u5B9A\u5411\n";
                        data.flow = universalTraffic_use;
                        return [3, 8];
                    case 4:
                        if (!(res.data.code == '4114030182')) return [3, 6];
                        return [4, contact.say('查询流量失败,系统升级中')];
                    case 5:
                        _b.sent();
                        return [2];
                    case 6: return [4, contact.say("".concat(_msg, "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + JSON.stringify(res.data) + '\n发送 联通登录 重新登录')];
                    case 7:
                        _b.sent();
                        return [3, 13];
                    case 8: return [3, 11];
                    case 9: return [4, contact.say('[queryTraffic]api请求失败,请联系管理员查看日志')];
                    case 10:
                        _b.sent();
                        return [2];
                    case 11:
                        new_mobile_arr.push(data);
                        return [4, contact.say(_msg)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13:
                        i++;
                        return [3, 2];
                    case 14:
                        db.lt_arr[name] = mobile_arr.concat(new_mobile_arr);
                        return [4, (0, dbUtil_1.saveDb)(db, '../constant/lt.json')];
                    case 15:
                        _b.sent();
                        return [3, 18];
                    case 16: return [4, contact.say('此微信没有登录过,发送:\n联通登录 ')];
                    case 17:
                        _b.sent();
                        return [2];
                    case 18: return [2];
                }
            });
        });
    };
    return DataMonitoring;
}());
exports.DataMonitoring = DataMonitoring;
