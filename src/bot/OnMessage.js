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
exports.OnMessages = void 0;
var wechaty_1 = require("wechaty");
var request_1 = require("../api/request");
var config_1 = __importDefault(require("../conf/config"));
var constant_1 = __importDefault(require("../constant/constant"));
var ql_1 = __importDefault(require("../constant/ql"));
var Bot_1 = require("./Bot");
var qlUtils_1 = require("../util/qlUtils");
var OnMessages = (function () {
    function OnMessages() {
    }
    OnMessages.message = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, room, remarks, isText, rem, cha, i, len, jddata, mobile, name_1, index, res_1, _a, name_2, index, ret, cookie, res_2, _b, res1, pt_pin, jdId, _c, res;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (msg.self()) {
                            return [2];
                        }
                        contact = msg.talker();
                        content = msg.text().trim();
                        room = msg.room();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _d.sent();
                        isText = msg.type() === Bot_1.bot.Message.Type.Text;
                        wechaty_1.log.info("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                        if (!(!room && isText)) return [3, 52];
                        return [4, OnMessages.forwardLogGroup(msg)];
                    case 2:
                        _d.sent();
                        if (!/菜单/.test(content)) return [3, 4];
                        return [4, contact.say(constant_1["default"].message.menu)];
                    case 3:
                        _d.sent();
                        return [3, 52];
                    case 4:
                        if (!/^查询$/.test(content)) return [3, 8];
                        if (!!(/jd-/.test(remarks) || /jd_/.test(remarks))) return [3, 6];
                        return [4, contact.say('此微信号没有绑定京东')];
                    case 5:
                        _d.sent();
                        return [2];
                    case 6:
                        rem = remarks.split('#');
                        cha = '';
                        for (i = 0, len = rem.length; i < len; i++) {
                            if (rem[i] != '') {
                                jddata = ql_1["default"].jd_ck.concat(ql_1["default"].cfd_ck).filter(function (item) {
                                    if (new RegExp(rem[i]).test(item.value)) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                });
                                if (jddata.length > 0) {
                                    cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem[i], "\u300D");
                                    cha += "\n\u72B6\u6001: ".concat(jddata[0].status == 0 ? '「在线」' : '「离线」');
                                    cha += "\n\u8C46\u5B50: ".concat(jddata[0].status == 0 ? '「开发中」' : '「离线」');
                                    cha += "\n\u901A\u77E5: \u300C\u5DF2\u5F00\u542F\u300D";
                                }
                                else {
                                    cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem[i], "\u300D");
                                    cha += "\n\u72B6\u6001:\u300C\u4E0D\u5B58\u5728\u300D";
                                }
                            }
                        }
                        cha += '\n\nPs:「离线」或「不存在」请发送 短信登录 更新账号';
                        return [4, contact.say(cha)];
                    case 7:
                        _d.sent();
                        return [3, 52];
                    case 8:
                        if (!/^短信登录$/.test(content)) return [3, 10];
                        return [4, contact.say('请发送手机号开始登录...')];
                    case 9:
                        _d.sent();
                        return [3, 52];
                    case 10:
                        if (!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 27];
                        mobile = content;
                        name_1 = contact.name();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_1; });
                        if (!(index != -1)) return [3, 12];
                        return [4, contact.say('短时间内重复获取验证码,请过会重试!')];
                    case 11:
                        _d.sent();
                        return [2];
                    case 12:
                        _a = config_1["default"].current_interface;
                        switch (_a) {
                            case 'nark': return [3, 13];
                        }
                        return [3, 16];
                    case 13: return [4, contact.say('nark正在获取验证码,请稍后...')];
                    case 14:
                        _d.sent();
                        return [4, request_1.reapi.send_sms_nark(content)];
                    case 15:
                        res_1 = _d.sent();
                        return [3, 19];
                    case 16: return [4, contact.say('maiark正在获取验证码,请稍后...')];
                    case 17:
                        _d.sent();
                        return [4, request_1.reapi.send_sms(content)];
                    case 18:
                        res_1 = _d.sent();
                        _d.label = 19;
                    case 19:
                        if (!res_1) return [3, 24];
                        if (!(res_1.data.code == 0 || res_1.data.success)) return [3, 21];
                        return [4, contact.say("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001,\u8BF7\u57283\u5206\u949F\u5185\u56DE\u590D6\u4F4D\u6570\u9A8C\u8BC1\u7801")];
                    case 20:
                        _d.sent();
                        res_1.data['mobile'] = mobile;
                        res_1.data['name'] = name_1;
                        constant_1["default"].sms.push(res_1.data);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var index;
                            return __generator(this, function (_a) {
                                index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_1; });
                                if (index != -1) {
                                    constant_1["default"].sms.splice(index, 1);
                                }
                                return [2];
                            });
                        }); }, 1000 * 180);
                        return [3, 23];
                    case 21: return [4, contact.say('获取验证码失败\n' + JSON.stringify(res_1.data))];
                    case 22:
                        _d.sent();
                        console.log(res_1);
                        return [2];
                    case 23: return [3, 26];
                    case 24: return [4, contact.say('请求验证码接口失败,请联系管理员查看日志')];
                    case 25:
                        _d.sent();
                        return [2];
                    case 26: return [3, 52];
                    case 27:
                        if (!/^\d{6}$/.test(content)) return [3, 48];
                        return [4, contact.say('开始登录京东,请稍后...')];
                    case 28:
                        _d.sent();
                        name_2 = contact.name();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_2; });
                        if (!(index == -1)) return [3, 30];
                        return [4, contact.say('验证码失效,请重新发送手机号开始登录')];
                    case 29:
                        _d.sent();
                        return [2];
                    case 30:
                        ret = constant_1["default"].sms.find(function (x) { return x.name == name_2; });
                        ret['smscode'] = content;
                        cookie = '';
                        _b = config_1["default"].current_interface;
                        switch (_b) {
                            case 'nark': return [3, 31];
                        }
                        return [3, 33];
                    case 31: return [4, request_1.reapi.smsLogin_nark(ret.mobile, content)];
                    case 32:
                        res_2 = _d.sent();
                        return [3, 35];
                    case 33: return [4, request_1.reapi.smsLogin(ret)];
                    case 34:
                        res_2 = _d.sent();
                        _d.label = 35;
                    case 35:
                        if (!res_2) return [3, 45];
                        if (!(res_2.data.code == 200 || res_2.data.success)) return [3, 40];
                        cookie = res_2.data.ck ? res_2.data.ck : '';
                        if (!(cookie == '')) return [3, 37];
                        return [4, request_1.reapi.getEnvsById(res_2.data.data.qlid)];
                    case 36:
                        res1 = _d.sent();
                        cookie = res1.data.data.value;
                        _d.label = 37;
                    case 37: return [4, contact.say(cookie)];
                    case 38:
                        _d.sent();
                        return [4, contact.say('登录成功')];
                    case 39:
                        _d.sent();
                        return [3, 42];
                    case 40: return [4, contact.say("登录失败\n" + JSON.stringify(res_2.data))];
                    case 41:
                        _d.sent();
                        return [2];
                    case 42: return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 43:
                        _d.sent();
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, OnMessages.bindRemarks(remarks, contact, jdId)];
                    case 44:
                        _d.sent();
                        return [3, 47];
                    case 45: return [4, contact.say('登录失败,请重新发送验证码或联系管理员查看日志')];
                    case 46:
                        _d.sent();
                        _d.label = 47;
                    case 47: return [3, 52];
                    case 48:
                        if (!/联通流量监控/.test(content)) return [3, 51];
                        return [4, contact.say('请发送如下开始:')];
                    case 49:
                        _d.sent();
                        return [4, contact.say('联通#手机号')];
                    case 50:
                        _d.sent();
                        return [3, 52];
                    case 51:
                        if (/^联通#[1]([3-9])[0-9]{9}$/.test(content)) {
                        }
                        else if (/^联通#\w{4}$/.test(content)) {
                        }
                        else if (/^联通#\d{6}$/.test(content)) {
                        }
                        _d.label = 52;
                    case 52:
                        _c = room;
                        if (!_c) return [3, 54];
                        return [4, room.topic()];
                    case 53:
                        _c = (_d.sent()) == config_1["default"].logGroup;
                        _d.label = 54;
                    case 54:
                        if (!_c) return [3, 61];
                        if (!/^菜单$/.test(content)) return [3, 56];
                        return [4, room.say(constant_1["default"].message.menu2)];
                    case 55:
                        _d.sent();
                        return [3, 61];
                    case 56:
                        if (!/^初始化青龙$/.test(content)) return [3, 61];
                        wechaty_1.log.info('初始化青龙===========开始');
                        return [4, request_1.reapi.getQlToken()];
                    case 57:
                        res = _d.sent();
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
                    case 58:
                        _d.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 59:
                        _d.sent();
                        return [4, room.say('初始化结束')];
                    case 60:
                        _d.sent();
                        _d.label = 61;
                    case 61: return [2];
                }
            });
        });
    };
    OnMessages.bindRemarks = function (remarks, contact, jdId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(/^jd-/.test(remarks) || /^jd_/.test(remarks))) return [3, 4];
                        if (!new RegExp(jdId).test(remarks)) return [3, 2];
                        return [4, contact.say(constant_1["default"].message.msg1 + jdId + ',' + constant_1["default"].message.msg3)];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2:
                        contact.alias(remarks + '#' + jdId);
                        return [4, contact.say(constant_1["default"].message.msg2 + remarks + '#' + jdId)];
                    case 3:
                        _a.sent();
                        return [2];
                    case 4:
                        contact.alias(jdId);
                        return [4, contact.say(constant_1["default"].message.msg2 + jdId)];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OnMessages.forwardLogGroup = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, remarks, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contact = msg.talker();
                        content = msg.text().trim();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _a.sent();
                        return [4, Bot_1.bot.Room.find({ topic: config_1["default"].logGroup })];
                    case 2:
                        room = _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say("\u3010\u8054\u7CFB\u4EBA\u6D88\u606F\u3011\n\u6765\u81EA:".concat(contact.name()).concat(remarks == '' ? '' : "(".concat(remarks, ")"), "\n\u5185\u5BB9:").concat(content)))];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return OnMessages;
}());
exports.OnMessages = OnMessages;
