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
            var contact, content, room, remarks, isText, rem, cha, i, len, jddata, mobile, name_1, index, res, name_2, index, ret, cookie, res, data, pt_pin, jdId, ck, res, _a, pt_pin, jdId, _b, res;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (msg.self()) {
                            return [2];
                        }
                        contact = msg.talker();
                        content = msg.text().trim();
                        room = msg.room();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _c.sent();
                        isText = msg.type() === Bot_1.bot.Message.Type.Text;
                        wechaty_1.log.info("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                        if (!(!room && isText)) return [3, 33];
                        OnMessages.forwardLogGroup(msg);
                        if (!/菜单/.test(content)) return [3, 3];
                        return [4, contact.say(constant_1["default"].message.menu)];
                    case 2:
                        _c.sent();
                        return [3, 33];
                    case 3:
                        if (!/^查询$/.test(content)) return [3, 7];
                        if (!!(/jd-/.test(remarks) || /jd_/.test(remarks))) return [3, 5];
                        return [4, contact.say('此微信号没有绑定京东')];
                    case 4:
                        _c.sent();
                        return [2];
                    case 5:
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
                    case 6:
                        _c.sent();
                        return [3, 33];
                    case 7:
                        if (!/^短信登录$/.test(content)) return [3, 9];
                        return [4, contact.say('请发送手机号开始登录...')];
                    case 8:
                        _c.sent();
                        return [3, 33];
                    case 9:
                        if (!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 14];
                        mobile = content;
                        name_1 = contact.name();
                        return [4, contact.say('正在获取验证码,请稍后...')];
                    case 10:
                        _c.sent();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_1; });
                        if (!(index != -1)) return [3, 12];
                        return [4, contact.say('短时间内重复获取验证码,请过会重试!')];
                    case 11:
                        _c.sent();
                        return [2];
                    case 12: return [4, request_1.reapi.send_sms(content)];
                    case 13:
                        res = _c.sent();
                        if (res.data.code == 0) {
                            contact.say("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001,\u8BF7\u57283\u5206\u949F\u5185\u56DE\u590D6\u4F4D\u6570\u9A8C\u8BC1\u7801");
                            res.data['mobile'] = mobile;
                            res.data['name'] = name_1;
                            constant_1["default"].sms.push(res.data);
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
                        }
                        else {
                            contact.say('获取验证码失败,请联系管理员');
                            return [2];
                        }
                        return [3, 33];
                    case 14:
                        if (!/^\d{6}$/.test(content)) return [3, 19];
                        return [4, contact.say('开始登录京东,请稍后...')];
                    case 15:
                        _c.sent();
                        name_2 = contact.name();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_2; });
                        if (!(index == -1)) return [3, 17];
                        return [4, contact.say('验证码失效,请重新发送手机号开始登录')];
                    case 16:
                        _c.sent();
                        return [2];
                    case 17:
                        ret = constant_1["default"].sms.find(function (x) { return x.name == name_2; });
                        ret['smscode'] = content;
                        cookie = '';
                        return [4, request_1.reapi.smsLogin(ret)];
                    case 18:
                        res = _c.sent();
                        data = res.data;
                        cookie = data.ck;
                        if (data.code == 200) {
                            contact.say(data.ck);
                            contact.say('登录成功');
                        }
                        else {
                            contact.say(data.msg);
                            return [2];
                        }
                        qlUtils_1.qlUtil.getJDCK();
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        OnMessages.bindRemarks(remarks, contact, jdId);
                        return [3, 33];
                    case 19:
                        if (!/^代抢财富岛$/.test(content)) return [3, 22];
                        return [4, contact.say('请发送如下开始抢财富岛红包(轮到会有通知):')];
                    case 20:
                        _c.sent();
                        return [4, contact.say('财富岛#pt_key=*****;pt_pin=*****;cid=1;')];
                    case 21:
                        _c.sent();
                        return [3, 33];
                    case 22:
                        if (!/^财富岛#.+?cid=1;$/.test(content)) return [3, 33];
                        return [4, contact.say('开始添加财富岛CK...')];
                    case 23:
                        _c.sent();
                        return [4, qlUtils_1.qlUtil.getCFDCK()];
                    case 24:
                        _c.sent();
                        ck = content.replace('财富岛#', '');
                        if (!(ql_1["default"].cfd_ck.length >= 5)) return [3, 26];
                        return [4, contact.say('财富岛CK已满5个，请稍后再试...')];
                    case 25:
                        _c.sent();
                        return [2];
                    case 26: return [4, request_1.reapi.addEnvs([{
                                name: "CFD_COOKIE",
                                value: ck
                            }])];
                    case 27:
                        res = _c.sent();
                        if (!(res.data.code == 200)) return [3, 29];
                        return [4, contact.say('添加成功!')];
                    case 28:
                        _a = _c.sent();
                        return [3, 31];
                    case 29: return [4, contact.say('添加失败!')];
                    case 30:
                        _a = _c.sent();
                        _c.label = 31;
                    case 31:
                        _a;
                        return [4, qlUtils_1.qlUtil.getCFDCK()];
                    case 32:
                        _c.sent();
                        pt_pin = ck.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        OnMessages.bindRemarks(remarks, contact, jdId);
                        _c.label = 33;
                    case 33:
                        _b = room;
                        if (!_b) return [3, 35];
                        return [4, room.topic()];
                    case 34:
                        _b = (_c.sent()) == config_1["default"].logGroup;
                        _c.label = 35;
                    case 35:
                        if (!_b) return [3, 42];
                        if (!/^菜单$/.test(content)) return [3, 37];
                        return [4, room.say(constant_1["default"].message.menu2)];
                    case 36:
                        _c.sent();
                        return [3, 42];
                    case 37:
                        if (!/^初始化青龙$/.test(content)) return [3, 42];
                        wechaty_1.log.info('初始化青龙===========开始');
                        return [4, request_1.reapi.getQlToken()];
                    case 38:
                        res = _c.sent();
                        if (res == null) {
                            wechaty_1.log.info("api\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\uFF01");
                            return [2];
                        }
                        else {
                            wechaty_1.log.info('初始化青龙===========成功');
                            ql_1["default"].qlToken = res.data.data.token;
                            ql_1["default"].ql_token_type = res.data.data.token_type;
                        }
                        wechaty_1.log.info('初始化青龙===========结束');
                        return [4, qlUtils_1.qlUtil.qlNotify()];
                    case 39:
                        _c.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 40:
                        _c.sent();
                        return [4, room.say('初始化结束')];
                    case 41:
                        _c.sent();
                        _c.label = 42;
                    case 42: return [2];
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
