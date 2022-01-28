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
exports.updata = void 0;
var node_schedule_1 = __importDefault(require("node-schedule"));
var bot_1 = require("../bot");
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../config"));
var dbUtil_1 = require("../bot/dbUtil");
var onMessage_1 = require("../bot/onMessage");
var qingLongApi_1 = require("./qingLongApi");
var util_1 = require("./util");
updataToLocal();
delSMSData();
autoUpdateNotify();
function autoUpdateNotify() {
    node_schedule_1["default"].scheduleJob('0 30 0 * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        wechaty_1.log.info('定时任务:对接青龙一对一通知 防止更新仓库被覆盖 开始');
                        return [4, util_1.util.autoUpdateQingLong()];
                    case 1:
                        _a.sent();
                        wechaty_1.log.info('定时任务:对接青龙一对一通知 防止更新仓库被覆盖 结束');
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    });
}
function updataToLocal() {
    node_schedule_1["default"].scheduleJob('0 0 * * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    updata();
                }
                catch (error) {
                    console.log(error);
                }
                return [2];
            });
        });
    });
}
function beanChangeCron() {
    node_schedule_1["default"].scheduleJob('0 1 21 * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, cookieArr, _a, _b, _i, i, jdId, contact, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        return [4, (0, dbUtil_1.getDb)('./db.json')];
                    case 1:
                        db = _c.sent();
                        cookieArr = db.cookieDetails;
                        _a = [];
                        for (_b in cookieArr)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 5];
                        i = _a[_i];
                        jdId = cookieArr[i].jdId;
                        return [4, bot_1.bot.Contact.find({ alias: new RegExp(jdId) })];
                    case 3:
                        contact = _c.sent();
                        if (contact == null)
                            return [3, 4];
                        (0, onMessage_1.beanChange)(jdId, contact, '【每天21.01分定时推送】');
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [3, 7];
                    case 6:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    });
}
function delSMSData() {
    node_schedule_1["default"].scheduleJob('0 0 0 * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, db, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath = '../constant/sms.json';
                        return [4, (0, dbUtil_1.getDb)(filePath)];
                    case 1:
                        db = _a.sent();
                        db.sms = [];
                        return [4, (0, dbUtil_1.saveDb)(db, filePath)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    });
}
function updata() {
    return __awaiter(this, void 0, void 0, function () {
        var container, dataArr, containerDetails, _loop_1, _a, _b, _i, i, state_1, db, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wechaty_1.log.info('#更新数据到db.json --> 开始');
                    container = config_1["default"].container.containerArr;
                    dataArr = [];
                    containerDetails = [];
                    _loop_1 = function (i) {
                        var QLurl, clientId, clientSecret, resp, token, resp1, cookieArr, containerDetail, _d, _e, _f, n, pt_pin, jdId, contact, data;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    QLurl = container[i].QLurl;
                                    clientId = container[i].clientId;
                                    clientSecret = container[i].clientSecret;
                                    if (QLurl == '' || clientId == '' || clientSecret == '') {
                                        wechaty_1.log.info('请填写青龙配置文件config.js');
                                        return [2, { value: void 0 }];
                                    }
                                    return [4, qingLongApi_1.qingLongApi.getToken(QLurl, clientId, clientSecret).then(function (res) {
                                            if (res.status == 200) {
                                                resp = res.data;
                                            }
                                        })];
                                case 1:
                                    _g.sent();
                                    if (resp == undefined) {
                                        wechaty_1.log.error("\u9752\u9F99 /open/auth/token\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6");
                                        return [2, { value: void 0 }];
                                    }
                                    token = resp.data.token;
                                    return [4, qingLongApi_1.qingLongApi.getCookies(QLurl, token).then(function (res) {
                                            if (res.status == 200) {
                                                resp1 = res.data;
                                            }
                                        })];
                                case 2:
                                    _g.sent();
                                    if (resp1 == undefined) {
                                        wechaty_1.log.error("\u9752\u9F99 /open/envs?searchValue\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6");
                                        return [2, { value: void 0 }];
                                    }
                                    cookieArr = resp1.data;
                                    containerDetail = {
                                        token: token,
                                        ckNum: cookieArr.length,
                                        ckMaxNum: container[i].cookieNumMax,
                                        container: container[i]
                                    };
                                    containerDetails.push(containerDetail);
                                    _d = [];
                                    for (_e in cookieArr)
                                        _d.push(_e);
                                    _f = 0;
                                    _g.label = 3;
                                case 3:
                                    if (!(_f < _d.length)) return [3, 8];
                                    n = _d[_f];
                                    pt_pin = cookieArr[n].value.match(/pt_pin=.+?;/) || [0];
                                    jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                                    if (!(cookieArr[n].status != 0)) return [3, 6];
                                    return [4, bot_1.bot.Contact.find({ alias: new RegExp(jdId) })];
                                case 4:
                                    contact = _g.sent();
                                    return [4, (contact === null || contact === void 0 ? void 0 : contact.say("".concat(jdId, ":\u4F60\u7684cookie\u5DF2\u5931\u6548,\u53D1\u9001 \u77ED\u4FE1\u767B\u5F55 \u66F4\u65B0cookie. \n(\u5982\u679C\u6B63\u5728\u66F4\u65B0cookie,\u8BF7\u5FFD\u7565\u6D88\u606F)")))];
                                case 5:
                                    _g.sent();
                                    _g.label = 6;
                                case 6:
                                    data = {
                                        jdId: jdId,
                                        token: token,
                                        container: container[i],
                                        cookie: cookieArr[n],
                                        updateTime: new Date().toLocaleString()
                                    };
                                    wechaty_1.log.info("\u66F4\u65B0".concat(jdId));
                                    dataArr.push(data);
                                    _g.label = 7;
                                case 7:
                                    _f++;
                                    return [3, 3];
                                case 8: return [2];
                            }
                        });
                    };
                    _a = [];
                    for (_b in container)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    i = _a[_i];
                    return [5, _loop_1(i)];
                case 2:
                    state_1 = _c.sent();
                    if (typeof state_1 === "object")
                        return [2, state_1.value];
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4:
                    _c.trys.push([4, 7, , 8]);
                    return [4, (0, dbUtil_1.getDb)('./db.json')];
                case 5:
                    db = _c.sent();
                    db.cookieDetails = dataArr;
                    db.containerDetails = containerDetails;
                    return [4, (0, dbUtil_1.saveDb)(db, './db.json')];
                case 6:
                    _c.sent();
                    return [3, 8];
                case 7:
                    error_4 = _c.sent();
                    console.log(error_4);
                    return [3, 8];
                case 8:
                    wechaty_1.log.info('#更新数据到db.json --> 结束');
                    return [2];
            }
        });
    });
}
exports.updata = updata;
