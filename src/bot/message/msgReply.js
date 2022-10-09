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
exports.MsgReply = void 0;
var utils_1 = require("../../util/utils");
var lt_1 = require("../../api/lt");
var md5_1 = __importDefault(require("md5"));
var node_uuid_1 = __importDefault(require("node-uuid"));
var dataMonitoring_1 = require("./dataMonitoring");
var config_1 = __importDefault(require("../../conf/config"));
var request_1 = require("../../api/request");
var constant_1 = __importDefault(require("../../constant/constant"));
var qlUtils_1 = require("../../util/qlUtils");
var ql_1 = __importDefault(require("../../constant/ql"));
var dbUtil_1 = require("../../util/dbUtil");
var jd_api_1 = require("../../api/jd_api");
var _user = (function () {
    function _user() {
        this.userName = '';
        this.startTime = 0;
        this.queryList = [];
        this.type = 1;
        this.step = 0;
        this.userData = {
            remark: '',
            name: '',
            city: '',
            mobile: '',
            passwd: '',
            cookie: '',
            appId: '',
            notice: 0,
            threshold: 10,
            flow: 0,
            time: null
        };
    }
    return _user;
}());
var msg = {
    msg1: '同时会话人数过多, 请稍后...',
    msg2: '会话开启,发送 q 退出会话',
    msg3: '回复序号:\n\n1: 短信登录\n\n2: 密码登录',
    msg4: '回复序号:\n\n1: 短信登录\n\n2: CK登录',
    msg5: '会话已退出',
    msg6: '请发送手机号',
    msg7: '请发送:手机号#六位数字密码',
    msg8: '请发送:带有 pt_key=和pt_pin= 字段的cookie',
    msg9: '会话已超时',
    msg10: '手机号格式有误, 请重新发送',
    msg11: '获取验证码中...',
    msg12: '验证码已发送,请回复4位数字验证码',
    msg13: '距离上次随机码发送不超过1分钟',
    msg14: '验证码发送失败\n',
    msg15: '[sendRadomNum]api请求失败,请联系管理员查看日志',
    msg16: '验证码格式有误, 请重新发送'
};
var MsgReply = (function () {
    function MsgReply(conf, bot) {
        this.Bot = bot;
        this.conf = conf;
        this.userBotDict = {};
        this.max_user = conf.max_user;
        this.tipsword = {
            'q': 0,
            '联通登录': 1,
            '京东登录': 2,
            '监控设置': 3
        };
    }
    MsgReply.prototype.run = function (contact, id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var type, alias, remark_arr, remark, _i, remark_arr_1, item, msg_1, remarks, rem_1, cha, _loop_1, i, len, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!Object.keys(this.userBotDict).includes(id)) return [3, 22];
                        if (!Object.keys(this.tipsword).includes(content)) return [3, 2];
                        type = this.tipsword[content];
                        return [4, this.createUser(contact, id, content, type)];
                    case 1:
                        _a.sent();
                        return [3, 21];
                    case 2:
                        if (!/^菜单$/.test(content)) return [3, 4];
                        return [4, utils_1.Utils.say(contact, constant_1["default"].message.menu + "\n\u672C\u901A\u77E5 By:https://github.com/hxianseng/wxbot.git")];
                    case 3:
                        _a.sent();
                        return [3, 21];
                    case 4:
                        if (!/^查询流量$/.test(content)) return [3, 10];
                        return [4, contact.alias()];
                    case 5:
                        alias = _a.sent();
                        if (!!/联通_/.test(alias)) return [3, 7];
                        return [4, utils_1.Utils.say(contact, '用户没登录过, 请发送 联通登录')];
                    case 6:
                        _a.sent();
                        return [2];
                    case 7:
                        remark_arr = alias.split('#');
                        remark = '';
                        for (_i = 0, remark_arr_1 = remark_arr; _i < remark_arr_1.length; _i++) {
                            item = remark_arr_1[_i];
                            if (/联通_/.test(item)) {
                                remark = item;
                                break;
                            }
                        }
                        msg_1 = '';
                        return [4, utils_1.Utils.say(contact, '查询中...')];
                    case 8:
                        _a.sent();
                        return [4, dataMonitoring_1.DataMonitoring.queryTraffic(contact, msg_1, remark, 1)];
                    case 9:
                        _a.sent();
                        return [3, 21];
                    case 10:
                        if (!/^查询资产$/.test(content)) return [3, 21];
                        if (!!config_1["default"].ql_module) return [3, 12];
                        return [4, utils_1.Utils.say(contact, '[ql_module]JD相关模块已关闭, 联系管理员开启')];
                    case 11:
                        _a.sent();
                        return [2];
                    case 12: return [4, contact.alias()];
                    case 13:
                        remarks = _a.sent();
                        if (!(remarks == '')) return [3, 15];
                        return [4, contact.say('此微信号没有绑定京东id, 发送 菜单 查看详细指令')];
                    case 14:
                        _a.sent();
                        return [2];
                    case 15:
                        rem_1 = remarks.split('#');
                        cha = '';
                        _loop_1 = function (i, len) {
                            var jddata, beanCount, cookie, res;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (/联通_/.test(rem_1[i])) {
                                            return [2, "continue"];
                                        }
                                        if (!(rem_1[i] != '')) return [3, 4];
                                        jddata = ql_1["default"].jd_ck.concat(ql_1["default"].cfd_ck).filter(function (item) {
                                            return new RegExp(rem_1[i]).test(item.value);
                                        });
                                        beanCount = void 0;
                                        if (!(jddata.length > 0)) return [3, 3];
                                        if (!(jddata[0].status == 0)) return [3, 2];
                                        cookie = jddata[0].value;
                                        return [4, jd_api_1.jd_api.TotalBean(cookie)];
                                    case 1:
                                        res = _b.sent();
                                        if (res) {
                                            beanCount = res.data.user.jingBean;
                                        }
                                        _b.label = 2;
                                    case 2:
                                        cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem_1[i], "\u300D");
                                        cha += "\n\u72B6\u6001: ".concat(jddata[0].status == 0 ? '「在线」' : '「离线」');
                                        cha += "\n\u8C46\u5B50: ".concat(jddata[0].status == 0 ? beanCount : '「离线」');
                                        cha += "\n\u901A\u77E5: \u300C\u5DF2\u5F00\u542F\u300D";
                                        return [3, 4];
                                    case 3:
                                        cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem_1[i], "\u300D");
                                        cha += "\n\u72B6\u6001:\u300C\u4E0D\u5B58\u5728\u300D";
                                        _b.label = 4;
                                    case 4: return [2];
                                }
                            });
                        };
                        i = 0, len = rem_1.length;
                        _a.label = 16;
                    case 16:
                        if (!(i < len)) return [3, 19];
                        return [5, _loop_1(i, len)];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        i++;
                        return [3, 16];
                    case 19:
                        cha += '\n\nPs:「离线」或「不存在」请发送 京东登录 更新账号';
                        return [4, contact.say(cha)];
                    case 20:
                        _a.sent();
                        _a.label = 21;
                    case 21: return [3, 26];
                    case 22:
                        if (!(content == 'q')) return [3, 24];
                        return [4, this.removeUser(contact, id)];
                    case 23: return [2, _a.sent()];
                    case 24:
                        type = this.userBotDict[id].type;
                        return [4, this.updateUser(contact, id, content, type)];
                    case 25:
                        _a.sent();
                        _a.label = 26;
                    case 26: return [2];
                }
            });
        });
    };
    MsgReply.prototype.createUser = function (contact, id, content, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type == 1 || type == 3)) return [3, 3];
                        if (!!config_1["default"].traffic_query.flag) return [3, 2];
                        return [4, utils_1.Utils.say(contact, '联通流量查询已关闭, 联系管理员开启')];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2: return [3, 5];
                    case 3:
                        if (!(type == 2)) return [3, 5];
                        if (!!config_1["default"].ql_module) return [3, 5];
                        return [4, utils_1.Utils.say(contact, '[ql_module]JD相关模块已关闭, 联系管理员开启')];
                    case 4:
                        _a.sent();
                        return [2];
                    case 5:
                        this.userBotDict[id] = new _user();
                        this.userBotDict[id].userName = id;
                        this.userBotDict[id].type = type;
                        return [4, this.talk(contact, id, content, type)];
                    case 6:
                        _a.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this.userBotDict[id] != undefined)) return [3, 2];
                                        return [4, utils_1.Utils.say(contact, msg.msg9)];
                                    case 1:
                                        _a.sent();
                                        delete this.userBotDict[id];
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); }, 1000 * 180);
                        return [2];
                }
            });
        });
    };
    MsgReply.prototype.updateUser = function (contact, id, content, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.talk(contact, id, content, type)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MsgReply.prototype.talk = function (contact, id, content, type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, flag, content_arr, mobile, threshold, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(this.userBotDict[id].step == 0)) return [3, 9];
                        this.userBotDict[id].step += 1;
                        return [4, utils_1.Utils.say(contact, "[".concat(content, "]").concat(msg.msg2))];
                    case 1:
                        _e.sent();
                        _a = type;
                        switch (_a) {
                            case 1: return [3, 2];
                            case 2: return [3, 4];
                            case 3: return [3, 6];
                        }
                        return [3, 8];
                    case 2: return [4, utils_1.Utils.say(contact, msg.msg3)];
                    case 3:
                        _e.sent();
                        return [3, 8];
                    case 4: return [4, utils_1.Utils.say(contact, msg.msg4)];
                    case 5:
                        _e.sent();
                        return [3, 8];
                    case 6: return [4, utils_1.Utils.say(contact, '回复序号:\n\n1: 开启监控\n\n2: 关闭监控\n\n3: 阈值设置(兆)')];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8: return [3, 77];
                    case 9:
                        if (!(this.userBotDict[id].step == 1)) return [3, 32];
                        if (!(content in { 1: '', 2: '', 3: '' })) return [3, 29];
                        this.userBotDict[id].step += 1;
                        _b = type;
                        switch (_b) {
                            case 1: return [3, 10];
                            case 2: return [3, 15];
                            case 3: return [3, 20];
                        }
                        return [3, 28];
                    case 10:
                        if (!(parseInt(content) == 1)) return [3, 12];
                        this.userBotDict[id].type = 11;
                        return [4, utils_1.Utils.say(contact, msg.msg6)];
                    case 11:
                        _e.sent();
                        return [3, 14];
                    case 12:
                        if (!(parseInt(content) == 2)) return [3, 14];
                        this.userBotDict[id].type = 12;
                        return [4, utils_1.Utils.say(contact, msg.msg7)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14: return [3, 28];
                    case 15:
                        if (!(parseInt(content) == 1)) return [3, 17];
                        this.userBotDict[id].type = 21;
                        return [4, utils_1.Utils.say(contact, msg.msg6)];
                    case 16:
                        _e.sent();
                        return [3, 19];
                    case 17:
                        if (!(parseInt(content) == 2)) return [3, 19];
                        this.userBotDict[id].type = 22;
                        return [4, utils_1.Utils.say(contact, msg.msg8)];
                    case 18:
                        _e.sent();
                        _e.label = 19;
                    case 19: return [3, 28];
                    case 20:
                        if (!(parseInt(content) == 1)) return [3, 22];
                        this.userBotDict[id].type = 31;
                        return [4, utils_1.Utils.say(contact, msg.msg6)];
                    case 21:
                        _e.sent();
                        return [3, 27];
                    case 22:
                        if (!(parseInt(content) == 2)) return [3, 24];
                        this.userBotDict[id].type = 32;
                        return [4, utils_1.Utils.say(contact, msg.msg6)];
                    case 23:
                        _e.sent();
                        return [3, 27];
                    case 24:
                        if (!(parseInt(content) == 3)) return [3, 27];
                        this.userBotDict[id].type = 33;
                        return [4, utils_1.Utils.say(contact, '请发送: 手机号#阈值')];
                    case 25:
                        _e.sent();
                        return [4, utils_1.Utils.say(contact, '例如: 13188888888#10')];
                    case 26:
                        _e.sent();
                        _e.label = 27;
                    case 27: return [3, 28];
                    case 28: return [3, 31];
                    case 29: return [4, utils_1.Utils.say(contact, '指令错误,请回复 序号, 退出会话发送 q')];
                    case 30:
                        _e.sent();
                        _e.label = 31;
                    case 31: return [3, 77];
                    case 32:
                        if (!(this.userBotDict[id].step == 2)) return [3, 68];
                        _c = type;
                        switch (_c) {
                            case 11: return [3, 33];
                            case 12: return [3, 41];
                            case 21: return [3, 45];
                            case 22: return [3, 49];
                            case 31: return [3, 53];
                            case 32: return [3, 58];
                            case 33: return [3, 63];
                        }
                        return [3, 67];
                    case 33:
                        if (!!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 35];
                        return [4, utils_1.Utils.say(contact, msg.msg10)];
                    case 34:
                        _e.sent();
                        return [2];
                    case 35:
                        this.userBotDict[id].step += 1;
                        return [4, utils_1.Utils.say(contact, msg.msg11)];
                    case 36:
                        _e.sent();
                        return [4, this.getVerificationCode(contact, content)];
                    case 37:
                        flag = _e.sent();
                        if (!flag) return [3, 38];
                        this.userBotDict[id].queryList.push(content);
                        return [3, 40];
                    case 38: return [4, this.removeUser(contact, id)];
                    case 39:
                        _e.sent();
                        _e.label = 40;
                    case 40: return [3, 67];
                    case 41:
                        console.log('联通密码登录');
                        if (!!/^[1]([3-9])[0-9]{9}#\d{6}$/.test(content)) return [3, 43];
                        return [4, utils_1.Utils.say(contact, '格式有误,请核对后重新输入')];
                    case 42:
                        _e.sent();
                        _e.label = 43;
                    case 43: return [4, this.lt_login(contact, content, id, content)];
                    case 44:
                        _e.sent();
                        return [3, 67];
                    case 45:
                        console.log('京东短信登录');
                        if (!!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 47];
                        return [4, utils_1.Utils.say(contact, msg.msg10)];
                    case 46:
                        _e.sent();
                        return [2];
                    case 47:
                        this.userBotDict[id].step += 1;
                        return [4, this.jd_getSMS(contact, content, id)];
                    case 48:
                        _e.sent();
                        return [3, 67];
                    case 49:
                        console.log('京东ck登录');
                        if (!!(/pt_pin=.+?;/.test(content) && /pt_key=.+?;/.test(content))) return [3, 51];
                        return [4, utils_1.Utils.say(contact, '没配到需要的cookie')];
                    case 50:
                        _e.sent();
                        return [2];
                    case 51: return [4, this.jd_login_ck(contact, content, id)];
                    case 52:
                        _e.sent();
                        return [3, 67];
                    case 53:
                        if (!!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 55];
                        return [4, utils_1.Utils.say(contact, msg.msg10)];
                    case 54:
                        _e.sent();
                        return [2];
                    case 55: return [4, utils_1.Utils.say(contact, '请稍后...')];
                    case 56:
                        _e.sent();
                        return [4, this.monitoring_settings(contact, content, id, type)];
                    case 57:
                        _e.sent();
                        return [3, 67];
                    case 58:
                        if (!!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 60];
                        return [4, utils_1.Utils.say(contact, msg.msg10)];
                    case 59:
                        _e.sent();
                        return [2];
                    case 60: return [4, utils_1.Utils.say(contact, '请稍后...')];
                    case 61:
                        _e.sent();
                        return [4, this.monitoring_settings(contact, content, id, type)];
                    case 62:
                        _e.sent();
                        return [3, 67];
                    case 63:
                        if (!!/^[1]([3-9])[0-9]{9}#\d+$/.test(content)) return [3, 65];
                        return [4, utils_1.Utils.say(contact, '格式有误, 请核对后重新发送')];
                    case 64:
                        _e.sent();
                        return [2];
                    case 65: return [4, utils_1.Utils.say(contact, '请稍后...')];
                    case 66:
                        _e.sent();
                        content_arr = content.split('#');
                        mobile = content_arr[0];
                        threshold = content_arr[1];
                        this.threshold_settings(contact, id, mobile, threshold);
                        return [3, 67];
                    case 67: return [3, 77];
                    case 68:
                        if (!(this.userBotDict[id].step == 3)) return [3, 77];
                        _d = type;
                        switch (_d) {
                            case 11: return [3, 69];
                            case 21: return [3, 73];
                        }
                        return [3, 77];
                    case 69:
                        if (!!/^\d{4}$/.test(content)) return [3, 71];
                        return [4, utils_1.Utils.say(contact, msg.msg16)];
                    case 70:
                        _e.sent();
                        return [2];
                    case 71: return [4, this.lt_login(contact, content, id, '')];
                    case 72:
                        _e.sent();
                        return [3, 77];
                    case 73:
                        if (!!/^\d{6}$/.test(content)) return [3, 75];
                        return [4, utils_1.Utils.say(contact, msg.msg16)];
                    case 74:
                        _e.sent();
                        return [2];
                    case 75: return [4, this.jd_login(contact, content, id)];
                    case 76:
                        _e.sent();
                        return [3, 77];
                    case 77: return [2];
                }
            });
        });
    };
    MsgReply.prototype.removeUser = function (contact, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, utils_1.Utils.say(contact, msg.msg5)];
                    case 1:
                        _a.sent();
                        delete this.userBotDict[id];
                        return [2];
                }
            });
        });
    };
    MsgReply.prototype.getVerificationCode = function (contact, content) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, lt_1.ltapi.sendRadomNum(content)];
                    case 1:
                        res = _a.sent();
                        if (!res) return [3, 8];
                        if (!(res.data.rsp_code == '0000')) return [3, 3];
                        return [4, utils_1.Utils.say(contact, msg.msg12)];
                    case 2:
                        _a.sent();
                        return [2, true];
                    case 3:
                        if (!(res.data.rsp_code == '7096')) return [3, 5];
                        return [4, utils_1.Utils.say(contact, msg.msg13)];
                    case 4:
                        _a.sent();
                        return [2, false];
                    case 5: return [4, utils_1.Utils.say(contact, msg.msg14 + JSON.stringify(res.data))];
                    case 6:
                        _a.sent();
                        return [2, false];
                    case 7: return [3, 10];
                    case 8: return [4, utils_1.Utils.say(contact, msg.msg15)];
                    case 9:
                        _a.sent();
                        return [2, false];
                    case 10: return [2];
                }
            });
        });
    };
    MsgReply.prototype.lt_login = function (contact, content, id, passwd) {
        return __awaiter(this, void 0, void 0, function () {
            var res, mobile, _passwd, cookie, appId, content_arr, remark, flag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, utils_1.Utils.say(contact, '登录中...')];
                    case 1:
                        _a.sent();
                        _passwd = '';
                        if (!(passwd == '')) return [3, 3];
                        mobile = this.userBotDict[id].queryList[0];
                        return [4, lt_1.ltapi.radomLogin(mobile, content)];
                    case 2:
                        res = _a.sent();
                        return [3, 5];
                    case 3:
                        content_arr = passwd.split('#');
                        mobile = content_arr[0];
                        _passwd = content_arr[1];
                        return [4, lt_1.ltapi.radomLogin_pw(mobile, _passwd)];
                    case 4:
                        res = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!res) return [3, 18];
                        if (!(res.data.code == '0')) return [3, 12];
                        appId = res.data.appId;
                        cookie = res.headers['set-cookie'] || res.headers['Set-Cookie'];
                        if (Array.isArray(cookie)) {
                            cookie = cookie.join('; ');
                        }
                        if (!!cookie) return [3, 7];
                        return [4, utils_1.Utils.say(contact, "\u83B7\u53D6\u5230\u7684cookie\u4E3A\u7A7A,\u8BF7\u7A0D\u540E\u91CD\u8BD5")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4, utils_1.Utils.say(contact, '登录成功')];
                    case 8:
                        _a.sent();
                        remark = '联通_' + (0, md5_1["default"])(node_uuid_1["default"].v4()).slice(0, 5);
                        return [4, utils_1.Utils.set_comments(contact, remark, '')];
                    case 9:
                        flag = _a.sent();
                        flag != '' ? remark = flag : '';
                        this.userBotDict[id].userData.remark = remark;
                        this.userBotDict[id].userData.name = contact.name();
                        this.userBotDict[id].userData.mobile = mobile;
                        this.userBotDict[id].userData.passwd = _passwd;
                        this.userBotDict[id].userData.cookie = cookie;
                        this.userBotDict[id].userData.appId = appId;
                        return [4, utils_1.Utils.saveUser(this.userBotDict[id].userData)];
                    case 10:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 11:
                        _a.sent();
                        return [3, 17];
                    case 12:
                        if (!(res.data.code == '4')) return [3, 14];
                        return [4, utils_1.Utils.say(contact, '登录失败\n' + JSON.stringify(res.data))];
                    case 13:
                        _a.sent();
                        return [2];
                    case 14: return [4, utils_1.Utils.say(contact, '登录失败\n' + JSON.stringify(res.data))];
                    case 15:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 16:
                        _a.sent();
                        return [2];
                    case 17: return [3, 21];
                    case 18: return [4, utils_1.Utils.say(contact, '[radomLogin]api请求失败,请联系管理员查看日志')];
                    case 19:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 20:
                        _a.sent();
                        return [2];
                    case 21: return [2];
                }
            });
        });
    };
    MsgReply.prototype.jd_login = function (contact, content, id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, cookie, res, _a, res1, pt_pin, jdId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, utils_1.Utils.say(contact, '开始登录京东,请稍后...')];
                    case 1:
                        _b.sent();
                        ret = this.userBotDict[id].queryList[0];
                        ret['smscode'] = content;
                        cookie = '';
                        _a = config_1["default"].current_interface;
                        switch (_a) {
                            case 'nark': return [3, 2];
                        }
                        return [3, 4];
                    case 2: return [4, request_1.reapi.smsLogin_nark(ret.mobile, content)];
                    case 3:
                        res = _b.sent();
                        return [3, 6];
                    case 4: return [4, request_1.reapi.smsLogin(ret)];
                    case 5:
                        res = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!res) return [3, 18];
                        if (!(res.data.code == 200 || res.data.success)) return [3, 12];
                        cookie = res.data.ck ? res.data.ck : '';
                        if (!(cookie == '')) return [3, 8];
                        return [4, request_1.reapi.getEnvsById(res.data.data.qlid)];
                    case 7:
                        res1 = _b.sent();
                        cookie = res1.data.data.value;
                        _b.label = 8;
                    case 8: return [4, utils_1.Utils.say(contact, cookie)];
                    case 9:
                        _b.sent();
                        return [4, utils_1.Utils.say(contact, '登录成功')];
                    case 10:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 11:
                        _b.sent();
                        return [3, 15];
                    case 12: return [4, utils_1.Utils.say(contact, "登录失败\n" + JSON.stringify(res.data))];
                    case 13:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 14:
                        _b.sent();
                        return [2];
                    case 15: return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 16:
                        _b.sent();
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, utils_1.Utils.set_comments(contact, jdId, jdId)];
                    case 17:
                        _b.sent();
                        return [3, 21];
                    case 18: return [4, utils_1.Utils.say(contact, '登录失败,请重新发送验证码或联系管理员查看日志')];
                    case 19:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21: return [2];
                }
            });
        });
    };
    MsgReply.prototype.jd_getSMS = function (contact, content, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = config_1["default"].current_interface;
                        switch (_a) {
                            case 'nark': return [3, 1];
                        }
                        return [3, 4];
                    case 1: return [4, utils_1.Utils.say(contact, 'nark正在获取验证码,请稍后...')];
                    case 2:
                        _b.sent();
                        return [4, request_1.reapi.send_sms_nark(content)];
                    case 3:
                        res = _b.sent();
                        return [3, 7];
                    case 4: return [4, utils_1.Utils.say(contact, 'maiark正在获取验证码,请稍后...')];
                    case 5:
                        _b.sent();
                        return [4, request_1.reapi.send_sms(content)];
                    case 6:
                        res = _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!res) return [3, 13];
                        if (!(res.data.code == 0 || res.data.success)) return [3, 9];
                        return [4, utils_1.Utils.say(contact, "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001,\u8BF7\u56DE\u590D6\u4F4D\u6570\u9A8C\u8BC1\u7801")];
                    case 8:
                        _b.sent();
                        res.data['mobile'] = content;
                        this.userBotDict[id].queryList.push(res.data);
                        return [2, true];
                    case 9: return [4, utils_1.Utils.say(contact, '获取验证码失败\n' + JSON.stringify(res.data))];
                    case 10:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 11:
                        _b.sent();
                        return [2, false];
                    case 12: return [3, 16];
                    case 13: return [4, utils_1.Utils.say(contact, '请求验证码接口失败,请联系管理员查看日志')];
                    case 14:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 15:
                        _b.sent();
                        return [2, false];
                    case 16: return [2];
                }
            });
        });
    };
    MsgReply.prototype.jd_login_ck = function (contact, content, id) {
        return __awaiter(this, void 0, void 0, function () {
            var pt_pin, pt_key, cookie, jdId, flag, _id, _i, _a, item, data, res, data, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pt_pin = content.match(/pt_pin=.+?;/) || '';
                        pt_key = content.match(/pt_key=.+?;/) || '';
                        cookie = pt_key[0] + pt_pin[0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, utils_1.Utils.say(contact, "\u8BC6\u522B\u5230cookie:\n".concat(cookie))];
                    case 1:
                        _b.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 2:
                        _b.sent();
                        flag = false;
                        _id = '';
                        _i = 0, _a = ql_1["default"].jd_ck;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3, 9];
                        item = _a[_i];
                        if (!item.value.includes(jdId)) return [3, 8];
                        flag = true;
                        if (!(config_1["default"].QLurl.qlId == '_id')) return [3, 4];
                        _id = item._id;
                        return [3, 7];
                    case 4:
                        if (!(config_1["default"].QLurl.qlId == 'id')) return [3, 5];
                        _id = item.id;
                        return [3, 7];
                    case 5: return [4, utils_1.Utils.say(contact, '更新失败,配置文件的qlId值错误')];
                    case 6:
                        _b.sent();
                        return [2];
                    case 7: return [3, 9];
                    case 8:
                        _i++;
                        return [3, 3];
                    case 9:
                        if (!flag) return [3, 31];
                        return [4, utils_1.Utils.say(contact, '更新cookie,请稍后...')];
                    case 10:
                        _b.sent();
                        data = {
                            cookie: cookie,
                            jdId: jdId,
                            _id: _id
                        };
                        return [4, request_1.reapi.updateEnv(data)];
                    case 11:
                        res = _b.sent();
                        if (!res) return [3, 18];
                        if (!(res.data.code == 200)) return [3, 14];
                        return [4, utils_1.Utils.say(contact, 'cookie更新成功,cookie启用中...')];
                    case 12:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 13:
                        _b.sent();
                        return [3, 17];
                    case 14: return [4, utils_1.Utils.say(contact, 'cookie更新失败\n' + JSON.stringify(res.data))];
                    case 15:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 16:
                        _b.sent();
                        return [2];
                    case 17: return [3, 21];
                    case 18: return [4, utils_1.Utils.say(contact, '[updateEnv]接口请求失败,请管理员查看日志')];
                    case 19:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 20:
                        _b.sent();
                        return [2];
                    case 21: return [4, request_1.reapi.enableEnvs(_id)];
                    case 22:
                        res = _b.sent();
                        if (!res) return [3, 27];
                        if (!(res.data.code == 200)) return [3, 24];
                        return [4, utils_1.Utils.say(contact, 'cookie启用成功')];
                    case 23:
                        _b.sent();
                        return [3, 26];
                    case 24: return [4, utils_1.Utils.say(contact, 'cookie启用失败\n' + JSON.stringify(res.data))];
                    case 25:
                        _b.sent();
                        _b.label = 26;
                    case 26: return [3, 29];
                    case 27: return [4, utils_1.Utils.say(contact, '[enableEnvs]接口请求失败,请管理员查看日志')];
                    case 28:
                        _b.sent();
                        _b.label = 29;
                    case 29: return [4, utils_1.Utils.set_comments(contact, jdId, jdId)];
                    case 30:
                        _b.sent();
                        return [3, 42];
                    case 31: return [4, utils_1.Utils.say(contact, '添加cookie,请稍后...')];
                    case 32:
                        _b.sent();
                        data = [
                            {
                                name: 'JD_COOKIE',
                                value: cookie,
                                remarks: jdId
                            }
                        ];
                        return [4, request_1.reapi.addEnvs(data)];
                    case 33:
                        res = _b.sent();
                        if (!res) return [3, 37];
                        if (!(res.data.code == 200)) return [3, 36];
                        return [4, utils_1.Utils.say(contact, 'cookie添加成功')];
                    case 34:
                        _b.sent();
                        return [4, this.removeUser(contact, id)];
                    case 35:
                        _b.sent();
                        _b.label = 36;
                    case 36: return [3, 40];
                    case 37: return [4, this.removeUser(contact, id)];
                    case 38:
                        _b.sent();
                        return [4, utils_1.Utils.say(contact, '[addEnvs]接口请求失败,请管理员查看日志')];
                    case 39:
                        _b.sent();
                        return [2];
                    case 40: return [4, utils_1.Utils.set_comments(contact, jdId, jdId)];
                    case 41:
                        _b.sent();
                        _b.label = 42;
                    case 42: return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 43:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    MsgReply.prototype.monitoring_settings = function (contact, content, id, type) {
        return __awaiter(this, void 0, void 0, function () {
            var alias, remark_arr, remark, flag, _i, remark_arr_2, item, data, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, contact.alias()];
                    case 1:
                        alias = _a.sent();
                        if (!!/联通_/.test(alias)) return [3, 4];
                        return [4, utils_1.Utils.say(contact, '用户没登录过, 请发送 联通登录')];
                    case 2:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 3:
                        _a.sent();
                        return [2];
                    case 4:
                        remark_arr = alias.split('#');
                        remark = '', flag = true;
                        type == 31 ? flag = true : flag = false;
                        for (_i = 0, remark_arr_2 = remark_arr; _i < remark_arr_2.length; _i++) {
                            item = remark_arr_2[_i];
                            if (/联通_/.test(item)) {
                                remark = item;
                                break;
                            }
                        }
                        return [4, (0, dbUtil_1.getDb)("../constant/user.json", remark)];
                    case 5:
                        data = _a.sent();
                        if (!!data) return [3, 8];
                        constant_1["default"].read_flag = false;
                        return [4, utils_1.Utils.say(contact, '此微信号没有登录过联通')];
                    case 6:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 7:
                        _a.sent();
                        return [2];
                    case 8:
                        index = data.findIndex(function (x) { return x.mobile == content; });
                        if (!(index == -1)) return [3, 11];
                        constant_1["default"].read_flag = false;
                        return [4, utils_1.Utils.say(contact, '此微信号没有登录过该手机号')];
                    case 9:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 10:
                        _a.sent();
                        return [2];
                    case 11:
                        if (!flag) return [3, 14];
                        data[index].notice = 0;
                        return [4, utils_1.Utils.say(contact, '开启监控成功')];
                    case 12:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 13:
                        _a.sent();
                        return [3, 17];
                    case 14:
                        data[index].notice = 1;
                        return [4, utils_1.Utils.say(contact, '关闭监控成功')];
                    case 15:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17: return [4, (0, dbUtil_1.saveDb)(data, '../constant/user.json', remark)];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19: return [2];
                }
            });
        });
    };
    MsgReply.prototype.threshold_settings = function (contact, id, mobile, threshold) {
        return __awaiter(this, void 0, void 0, function () {
            var alias, remark_arr, remark, _i, remark_arr_3, item, data, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, contact.alias()];
                    case 1:
                        alias = _a.sent();
                        if (!!/联通_/.test(alias)) return [3, 4];
                        return [4, utils_1.Utils.say(contact, '用户没登录过, 请发送 联通登录')];
                    case 2:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 3:
                        _a.sent();
                        return [2];
                    case 4:
                        remark_arr = alias.split('#');
                        remark = '';
                        for (_i = 0, remark_arr_3 = remark_arr; _i < remark_arr_3.length; _i++) {
                            item = remark_arr_3[_i];
                            if (/联通_/.test(item)) {
                                remark = item;
                                break;
                            }
                        }
                        return [4, (0, dbUtil_1.getDb)("../constant/user.json", remark)];
                    case 5:
                        data = _a.sent();
                        if (!!data) return [3, 8];
                        constant_1["default"].read_flag = false;
                        return [4, utils_1.Utils.say(contact, '此微信号没有登录过联通')];
                    case 6:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 7:
                        _a.sent();
                        return [2];
                    case 8:
                        index = data.findIndex(function (x) { return x.mobile == mobile; });
                        if (!(index == -1)) return [3, 11];
                        constant_1["default"].read_flag = false;
                        return [4, utils_1.Utils.say(contact, '此微信号没有登录过该手机号')];
                    case 9:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 10:
                        _a.sent();
                        return [2];
                    case 11:
                        data[index].threshold = parseInt(threshold);
                        return [4, (0, dbUtil_1.saveDb)(data, '../constant/user.json', remark)];
                    case 12:
                        _a.sent();
                        return [4, utils_1.Utils.say(contact, '设置阈值成功')];
                    case 13:
                        _a.sent();
                        return [4, this.removeUser(contact, id)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2];
                }
            });
        });
    };
    return MsgReply;
}());
exports.MsgReply = MsgReply;
