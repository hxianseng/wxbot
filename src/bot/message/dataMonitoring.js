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
            var index, data, code_sms, res, cookie, appId;
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
                        if (!res) return [3, 12];
                        if (!(res.data.code == '0')) return [3, 9];
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
                    case 5: return [4, contact.say('登录成功,查询流量中...')];
                    case 6:
                        _a.sent();
                        return [4, DataMonitoring.saveCookie(data.mobile, cookie, appId, contact.name())];
                    case 7:
                        _a.sent();
                        return [4, DataMonitoring.queryTraffic(contact)];
                    case 8:
                        _a.sent();
                        return [3, 11];
                    case 9: return [4, contact.say('登录失败\n' + JSON.stringify(res.data))];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3, 14];
                    case 12: return [4, contact.say('[radomLogin]api请求失败,请联系管理员查看日志')];
                    case 13:
                        _a.sent();
                        return [2];
                    case 14: return [2];
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
                            appId: appId
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
    DataMonitoring.queryTraffic = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var name, db, mobile_arr, _i, mobile_arr_1, item, mobile, cookie, appId, msg, res, time, dailyRentalPackage, combo_arr, voice_remainResource, voice_userResource, shortMessage_remainResource, shortMessage_userResource, _a, dailyRentalPackage_1, item_1, _b, combo_arr_1, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, contact.say('查询中,请稍后...')];
                    case 1:
                        _c.sent();
                        name = contact.name();
                        return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                    case 2:
                        db = _c.sent();
                        mobile_arr = db.lt_arr[name];
                        if (!mobile_arr) return [3, 16];
                        _i = 0, mobile_arr_1 = mobile_arr;
                        _c.label = 3;
                    case 3:
                        if (!(_i < mobile_arr_1.length)) return [3, 15];
                        item = mobile_arr_1[_i];
                        mobile = item.mobile;
                        cookie = item.cookie;
                        appId = item.appId;
                        msg = "\u5C3E\u53F7: ".concat(mobile.slice(7), "\n");
                        return [4, lt_1.ltapi.queryTraffic(cookie)];
                    case 4:
                        res = _c.sent();
                        if (!res) return [3, 10];
                        if (!(res.data.code == '0000')) return [3, 5];
                        time = res.data.time;
                        console.log('刚上线测试，因套餐不同，可能会有显示bug，打印套餐日志');
                        console.log("日租包：" + JSON.stringify(res.data.RzbResources));
                        console.log("套餐：" + JSON.stringify(res.data.resources));
                        console.log("==========================================================");
                        console.log("data：" + JSON.stringify(res.data));
                        dailyRentalPackage = res.data.RzbResources[0].details;
                        combo_arr = res.data.resources[0].details;
                        voice_remainResource = res.data.resources[1].remainResource;
                        voice_userResource = res.data.resources[1].userResource;
                        shortMessage_remainResource = res.data.resources[2].remainResource;
                        shortMessage_userResource = res.data.resources[2].userResource;
                        for (_a = 0, dailyRentalPackage_1 = dailyRentalPackage; _a < dailyRentalPackage_1.length; _a++) {
                            item_1 = dailyRentalPackage_1[_a];
                            msg += "".concat(item_1.addUpItemName, ": \u5DF2\u7528").concat(item_1.resourceSource, "\u4E2A/").concat(item_1.use, "MB\n");
                        }
                        for (_b = 0, combo_arr_1 = combo_arr; _b < combo_arr_1.length; _b++) {
                            i = combo_arr_1[_b];
                            msg += "".concat(i.feePolicyName.includes('全国流量王套餐-8元') ? '8元流量王' : i.feePolicyName, ": \u603B").concat(i.total >= 1024 ? i.total / 1024 + 'G' : i.total + 'M', " \u7528").concat(i.use >= 1024 ? i.use / 1024 + 'G' : i.use + 'M', "\n");
                        }
                        msg += "\u8BED\u97F3: \u7528".concat(voice_userResource, "\u5206\u949F, \u5269").concat(voice_remainResource, "\u5206\u949F\n");
                        msg += "\u77ED\u4FE1: \u7528".concat(shortMessage_userResource, "\u6761, \u5269").concat(shortMessage_remainResource, "\u6761\n");
                        msg += "\u65F6\u95F4: ".concat(time);
                        return [3, 9];
                    case 5:
                        if (!(res.data.code == '4114030182')) return [3, 7];
                        return [4, contact.say('查询流量失败,系统升级中')];
                    case 6:
                        _c.sent();
                        return [2];
                    case 7: return [4, contact.say('查询流量失败\n' + JSON.stringify(res.data))];
                    case 8:
                        _c.sent();
                        return [2];
                    case 9: return [3, 12];
                    case 10: return [4, contact.say('[queryTraffic]api请求失败,请联系管理员查看日志')];
                    case 11:
                        _c.sent();
                        return [2];
                    case 12: return [4, contact.say(msg)];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14:
                        _i++;
                        return [3, 3];
                    case 15: return [3, 18];
                    case 16: return [4, contact.say('此微信没有登录过,发送:\n联通登录 ')];
                    case 17:
                        _c.sent();
                        return [2];
                    case 18: return [2];
                }
            });
        });
    };
    return DataMonitoring;
}());
exports.DataMonitoring = DataMonitoring;
