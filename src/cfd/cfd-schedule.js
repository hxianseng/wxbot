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
exports.schedules = void 0;
var node_schedule_1 = __importDefault(require("node-schedule"));
var wechaty_1 = require("wechaty");
var ql_1 = __importDefault(require("../constant/ql"));
var config_1 = __importDefault(require("../conf/config"));
var request_1 = require("../api/request");
var Bot_1 = require("../bot/Bot");
var qlUtils_1 = require("../util/qlUtils");
var dbUtil_1 = require("../util/dbUtil");
var constant_1 = __importDefault(require("../constant/constant"));
var dataMonitoring_1 = require("../bot/message/dataMonitoring");
var lt_1 = require("../api/lt");
var moment_1 = __importDefault(require("moment"));
function schedules() {
    wechaty_1.log.info('初始化定时任务');
    if (config_1["default"].traffic_query.flag) {
        wechaty_1.log.info('定时推送流量开启');
        node_schedule_1["default"].scheduleJob(config_1["default"].traffic_query.timed_push_cron, function () {
            return __awaiter(this, void 0, void 0, function () {
                var msg, db, all_mobile, _a, _b, _i, item, contact;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            msg = '定时推送\n';
                            return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                        case 1:
                            db = _c.sent();
                            all_mobile = db.lt_arr;
                            constant_1["default"].read_flag = false;
                            _a = [];
                            for (_b in all_mobile)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 6];
                            item = _a[_i];
                            return [4, Bot_1.bot.Contact.find({ name: item })];
                        case 3:
                            contact = _c.sent();
                            if (contact == null) {
                                wechaty_1.log.info("\u6CA1\u627E\u5230\u6635\u79F0\u4E3A[".concat(item, "]\u7684\u597D\u53CB"));
                                return [3, 5];
                            }
                            wechaty_1.log.info("\u5F00\u59CB[".concat(item, "]\u597D\u53CB\u7684\u5B9A\u65F6\u63A8\u9001\u6D41\u91CF"));
                            return [4, dataMonitoring_1.DataMonitoring.queryTraffic(contact, msg)];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            _i++;
                            return [3, 2];
                        case 6: return [2];
                    }
                });
            });
        });
        wechaty_1.log.info('流量监控开启');
        node_schedule_1["default"].scheduleJob(config_1["default"].traffic_query.monitoring_jumps_cron, function () {
            return __awaiter(this, void 0, void 0, function () {
                var msg, db, all_mobile, _a, _b, _i, item, contact, name_1, db_1, mobile_arr, new_mobile_arr, current_traffic, i, data, _msg, res, time, dailyRentalPackage, combo_arr, voice_remainResource, voice_userResource, shortMessage_remainResource, shortMessage_userResource, universalTraffic, universalTraffic_use, directedTraffic, directedTraffic_use, freeTraffic_use, _c, combo_arr_1, i_1, rt, _d, dailyRentalPackage_1, item_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            msg = '监控跳点(5分钟刷新一次)\n';
                            return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                        case 1:
                            db = _e.sent();
                            all_mobile = db.lt_arr;
                            constant_1["default"].read_flag = false;
                            _a = [];
                            for (_b in all_mobile)
                                _a.push(_b);
                            _i = 0;
                            _e.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 22];
                            item = _a[_i];
                            console.log('=====================');
                            if (all_mobile[item].length == 0) {
                                wechaty_1.log.info("[".concat(item, "]\u7684\u624B\u673A\u53F7\u4E3A\u7A7A"));
                                return [3, 21];
                            }
                            return [4, Bot_1.bot.Contact.find({ name: item })];
                        case 3:
                            contact = _e.sent();
                            if (contact == null) {
                                wechaty_1.log.info("\u6CA1\u627E\u5230\u6635\u79F0\u4E3A[".concat(item, "]\u7684\u597D\u53CB"));
                                return [3, 21];
                            }
                            wechaty_1.log.info("\u5F00\u59CB\u5237\u65B0[".concat(item, "]\u597D\u53CB\u7684\u6D41\u91CF"));
                            name_1 = contact.name();
                            return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                        case 4:
                            db_1 = _e.sent();
                            mobile_arr = db_1.lt_arr[name_1];
                            if (!mobile_arr) return [3, 19];
                            new_mobile_arr = [];
                            current_traffic = 0;
                            i = 0;
                            _e.label = 5;
                        case 5:
                            if (!(i < mobile_arr.length)) return [3, 17];
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
                            if (data.notice != 0) {
                                new_mobile_arr.push(data);
                                return [3, 16];
                            }
                            _msg = msg;
                            _msg += "\u5C3E\u53F7: ".concat(data.mobile.slice(7), "\n");
                            return [4, lt_1.ltapi.queryTraffic(data.cookie)];
                        case 6:
                            res = _e.sent();
                            if (!res) return [3, 12];
                            if (!(res.data.code == '0000')) return [3, 7];
                            time = res.data.time;
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
                                else if (rt == 'I2' || rt == '13' || rt == 'I3') {
                                    directedTraffic += parseFloat(i_1.total);
                                    directedTraffic_use += parseFloat(i_1.use);
                                }
                            }
                            _msg += "\u8BED\u97F3: \u603B".concat(voice_userResource + voice_remainResource, "\u5206\u949F \u7528").concat(voice_userResource, "\u5206\u949F\n");
                            _msg += "\u77ED\u4FE1: \u603B".concat(shortMessage_userResource + shortMessage_remainResource, "\u6761 \u7528").concat(shortMessage_userResource, "\u6761\n");
                            for (_d = 0, dailyRentalPackage_1 = dailyRentalPackage; _d < dailyRentalPackage_1.length; _d++) {
                                item_1 = dailyRentalPackage_1[_d];
                                _msg += "\u65E5\u79DF\u5305: \u5DF2\u7528".concat(item_1.resourceSource, "\u4E2A/").concat(item_1.use, "M\n");
                            }
                            _msg += "\u901A\u7528: \u603B".concat(universalTraffic >= 1024 ? (universalTraffic / 1024).toFixed(2) + 'G' : universalTraffic + 'M', " \u7528").concat(universalTraffic_use >= 1024 ? (universalTraffic_use / 1024).toFixed(2) + 'G' : universalTraffic_use + 'M', "\n");
                            _msg += "\u5B9A\u5411: \u603B".concat(directedTraffic >= 1024 ? (directedTraffic / 1024).toFixed(2) + 'G' : directedTraffic + 'M', " \u7528").concat(directedTraffic_use >= 1024 ? (directedTraffic_use / 1024).toFixed(2) + 'G' : directedTraffic_use + 'M', "\n");
                            _msg += "\u514D\u8D39: ".concat(freeTraffic_use >= 1024 ? (freeTraffic_use / 1024).toFixed(2) + 'G' : freeTraffic_use + 'M', "\n");
                            _msg += "\u5DF2\u7528: ".concat(universalTraffic_use + directedTraffic_use >= 1024 ? ((universalTraffic_use + directedTraffic_use) / 1024).toFixed(2) + 'G' : universalTraffic_use + directedTraffic_use + 'M', "\n");
                            _msg += "\u4E0A\u6B21\u5237\u65B0\u65F6\u95F4: ".concat((0, moment_1["default"])(new Date(data.time)).format('MM-DD HH:mm'), "\n");
                            _msg += "\u8DF3\u70B9: ".concat(universalTraffic_use - data.flow, "M\n");
                            _msg += "\u76D1\u63A7: ".concat(data.notice == 0 ? '已开启' : '已关闭', "\n");
                            _msg += "\nPs: \u5DF2\u7528 = \u901A\u7528 + \u5B9A\u5411; \u6D41\u91CF\u76D1\u63A7\u6BCF5\u5206\u949F\u5237\u65B0\u4E00\u6B21,\u6CA1\u8FBE\u5230\u9608\u503C\u4E0D\u901A\u77E5 \n \u5173\u95ED\u76D1\u63A7\u53D1\u9001 \u83DC\u5355 \u67E5\u770B\u6307\u4EE4\n";
                            current_traffic = universalTraffic_use;
                            data.time = time;
                            return [3, 11];
                        case 7:
                            if (!(res.data.code == '4114030182')) return [3, 9];
                            return [4, contact.say('查询流量失败,系统升级中')];
                        case 8:
                            _e.sent();
                            new_mobile_arr.push(data);
                            return [3, 16];
                        case 9: return [4, contact.say("".concat(_msg, "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + JSON.stringify(res.data) + '\n流量监控每5分钟刷新一次,没达到阈值不通知')];
                        case 10:
                            _e.sent();
                            new_mobile_arr.push(data);
                            return [3, 16];
                        case 11: return [3, 14];
                        case 12: return [4, contact.say("".concat(_msg, "\u67E5\u8BE2\u6D41\u91CF\u5931\u8D25\n") + '[queryTraffic]api请求失败,请联系管理员查看日志')];
                        case 13:
                            _e.sent();
                            return [2];
                        case 14:
                            if (current_traffic - data.flow < data.threshold || data.notice != 0) {
                                new_mobile_arr.push(data);
                                console.log('没有达到阈值，不通知');
                                return [3, 16];
                            }
                            return [4, contact.say(_msg)];
                        case 15:
                            _e.sent();
                            data.flow = current_traffic;
                            new_mobile_arr.push(data);
                            _e.label = 16;
                        case 16:
                            i++;
                            return [3, 5];
                        case 17:
                            db_1.lt_arr[name_1] = mobile_arr.concat(new_mobile_arr);
                            return [4, (0, dbUtil_1.saveDb)(db_1, '../constant/lt.json')];
                        case 18:
                            _e.sent();
                            return [3, 21];
                        case 19: return [4, contact.say('此微信没有登录过,发送:\n联通登录 ')];
                        case 20:
                            _e.sent();
                            return [2];
                        case 21:
                            _i++;
                            return [3, 2];
                        case 22: return [2];
                    }
                });
            });
        });
    }
    else {
        wechaty_1.log.info('定时推送流量关闭');
        wechaty_1.log.info('流量监控关闭');
    }
    node_schedule_1["default"].scheduleJob('0 0 * * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config_1["default"].ql_module) {
                            return [2];
                        }
                        wechaty_1.log.info('定时更新青龙===========开始');
                        wechaty_1.log.info('初始化青龙===========开始');
                        wechaty_1.log.info('初始化青龙===========开始');
                        return [4, request_1.reapi.getQlToken()];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            wechaty_1.log.info('初始化青龙===========成功');
                            ql_1["default"].qlToken = res.data.data.token;
                            ql_1["default"].ql_token_type = res.data.data.token_type;
                        }
                        else {
                            wechaty_1.log.info("api\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\uFF01");
                            return [2];
                        }
                        wechaty_1.log.info('初始化青龙===========结束');
                        return [4, qlUtils_1.qlUtil.qlNotify()];
                    case 2:
                        _a.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 3:
                        _a.sent();
                        wechaty_1.log.info('定时更新青龙===========结束');
                        return [2];
                }
            });
        });
    });
}
exports.schedules = schedules;
