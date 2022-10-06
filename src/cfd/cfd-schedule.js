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
var file_box_1 = require("file-box");
function schedules() {
    wechaty_1.log.info('初始化定时任务');
    if (config_1["default"].traffic_query.flag) {
        wechaty_1.log.info('定时推送流量开启');
        node_schedule_1["default"].scheduleJob(config_1["default"].traffic_query.timed_push_cron, function () {
            return __awaiter(this, void 0, void 0, function () {
                var msg, all_mobile, _a, _b, _i, item, contact;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            msg = '定时推送\n';
                            return [4, (0, dbUtil_1.getDbAll)("../constant/user.json")];
                        case 1:
                            all_mobile = _c.sent();
                            constant_1["default"].read_flag = false;
                            _a = [];
                            for (_b in all_mobile)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 6];
                            item = _a[_i];
                            return [4, Bot_1.bot.Contact.find({ alias: new RegExp(item) })];
                        case 3:
                            contact = _c.sent();
                            if (contact == null) {
                                wechaty_1.log.info("\u6CA1\u627E\u5230\u5907\u6CE8\u4E3A[".concat(item, "]\u7684\u597D\u53CB"));
                                return [3, 5];
                            }
                            wechaty_1.log.info("\u5F00\u59CB[".concat(item, "]\u597D\u53CB\u7684\u5B9A\u65F6\u63A8\u9001\u6D41\u91CF"));
                            return [4, dataMonitoring_1.DataMonitoring.queryTraffic(contact, msg, item)];
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
                var msg, all_mobile, _a, _b, _i, item, contact;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            msg = '监控跳点(5分钟刷新一次)\n';
                            return [4, (0, dbUtil_1.getDbAll)("../constant/user.json")];
                        case 1:
                            all_mobile = _c.sent();
                            constant_1["default"].read_flag = false;
                            _a = [];
                            for (_b in all_mobile)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 6];
                            item = _a[_i];
                            console.log('=====================');
                            if (all_mobile[item].length == 0) {
                                wechaty_1.log.info("[".concat(item, "]\u7684\u624B\u673A\u53F7\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7"));
                                return [3, 5];
                            }
                            return [4, Bot_1.bot.Contact.find({ alias: new RegExp(item) })];
                        case 3:
                            contact = _c.sent();
                            if (contact == null) {
                                wechaty_1.log.info("\u6CA1\u627E\u5230\u5907\u6CE8\u4E3A[".concat(item, "]\u7684\u597D\u53CB\uFF0C\u8DF3\u8FC7"));
                                return [3, 5];
                            }
                            wechaty_1.log.info("\u5F00\u59CB\u76D1\u63A7[".concat(item, "]\u597D\u53CB\u7684\u6D41\u91CF"));
                            return [4, dataMonitoring_1.DataMonitoring.queryTraffic(contact, msg, item)];
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
    }
    else {
        wechaty_1.log.info('定时推送流量关闭');
        wechaty_1.log.info('流量监控关闭');
    }
    node_schedule_1["default"].scheduleJob('0 0 21 * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var weixin, zhifub, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        weixin = file_box_1.FileBox.fromFile('src/constant/weixin.png');
                        zhifub = file_box_1.FileBox.fromFile('src/constant/zhifub.png');
                        if (constant_1["default"].islogin) {
                            return [2];
                        }
                        if (!(config_1["default"].logGroup && config_1["default"].logGroup != '')) return [3, 5];
                        return [4, Bot_1.bot.Room.find({ topic: config_1["default"].logGroup })];
                    case 1:
                        room = _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say('感谢您的捐赠和支持！'))];
                    case 2:
                        _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say(weixin))];
                    case 3:
                        _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say(zhifub))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    });
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
