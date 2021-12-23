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
exports.onMessage = void 0;
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../config"));
var util_1 = require("../utils/util");
var qingLongApi_1 = require("../utils/qingLongApi");
var onMessage = (function () {
    function onMessage() {
    }
    onMessage.message = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, room, remarks, isText, str, jdId, str, jdId, remarkArray, flag, i_1, newRemark, i, pt_pin, pt_key, jdId_1, result, cookie, cookies, flag, _id, status_1, i_2, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contact = msg.talker();
                        content = msg.text().trim();
                        room = msg.room();
                        remarks = '';
                        return [4, contact.alias().then(function (data) {
                                remarks = data;
                            })];
                    case 1:
                        _a.sent();
                        isText = msg.type() === wechaty_1.Message.Type.Text;
                        if (msg.self()) {
                            return [2];
                        }
                        if (!(!room && isText)) return [3, 18];
                        console.log("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                        if (!/菜单/.test(content)) return [3, 2];
                        util_1.util.delay();
                        contact.say(config_1["default"].message.menu);
                        return [2];
                    case 2:
                        if (!/查看京东id/.test(content)) return [3, 3];
                        util_1.util.delay();
                        contact.say(config_1["default"].message.seeId);
                        return [2];
                    case 3:
                        if (!/^绑定:jd-/.test(content)) return [3, 4];
                        util_1.util.delay();
                        str = content.split(':');
                        jdId = str[1];
                        onMessage.addRemark(remarks, jdId, contact);
                        return [3, 18];
                    case 4:
                        if (!/^查看绑定/.test(content)) return [3, 5];
                        if (remarks == null) {
                            contact.say(config_1["default"].message.msg1);
                            return [2];
                        }
                        contact.say(config_1["default"].message.msg4 + remarks);
                        return [3, 18];
                    case 5:
                        if (!/^解绑:jd-/.test(content)) return [3, 11];
                        util_1.util.delay();
                        str = content.split(':');
                        jdId = str[1];
                        if (remarks == null) {
                            contact.say(config_1["default"].message.msg1);
                            return [2];
                        }
                        remarkArray = remarks.split(',');
                        flag = false;
                        for (i_1 in remarkArray) {
                            if (remarkArray[i_1] == jdId) {
                                flag = true;
                                break;
                            }
                        }
                        if (!!flag) return [3, 6];
                        contact.say(config_1["default"].message.msg5);
                        return [3, 10];
                    case 6:
                        if (!(remarkArray.length == 1)) return [3, 8];
                        return [4, contact.alias(null)];
                    case 7:
                        _a.sent();
                        contact.say(config_1["default"].message.msg2);
                        return [3, 10];
                    case 8:
                        newRemark = '';
                        for (i = 0; i < remarkArray.length; i++) {
                            if (remarkArray[i] == jdId) {
                                remarkArray.splice(i--, 1);
                                continue;
                            }
                            if (newRemark == '') {
                                newRemark = remarkArray[i];
                                continue;
                            }
                            newRemark = newRemark + ',' + remarkArray[i];
                        }
                        return [4, contact.alias(newRemark)];
                    case 9:
                        _a.sent();
                        contact.say(config_1["default"].message.msg2);
                        _a.label = 10;
                    case 10: return [3, 18];
                    case 11:
                        if (!(/pt_pin=.+?;/.test(content) && /pt_key=.+?;/.test(content))) return [3, 17];
                        pt_pin = content.match(/pt_pin=.+?;/) || [0];
                        pt_key = content.match(/pt_key=.+?;/) || [0];
                        if (pt_pin[0] == 0 || pt_key[0] == 0) {
                            contact.say(config_1["default"].message.msg7);
                            return [2];
                        }
                        jdId_1 = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, qingLongApi_1.qingLongApi.searchValue()];
                    case 12:
                        result = _a.sent();
                        cookie = pt_key[0] + pt_pin[0];
                        console.log('pt_pin:' + pt_pin[0] + 'pt_key:' + pt_key[0] + 'jdId:' + jdId_1);
                        cookies = result.data;
                        flag = false;
                        _id = '';
                        status_1 = 0;
                        for (i_2 in cookies) {
                            console.log(cookies[i_2].value);
                            console.log(new RegExp(pt_pin[0]).test(cookies[i_2].value));
                            if (new RegExp(pt_pin[0]).test(cookies[i_2].value)) {
                                flag = true;
                                _id = cookies[i_2]._id;
                                status_1 = cookies[i_2].status;
                                break;
                            }
                        }
                        if (!!flag) return [3, 14];
                        contact.say(config_1["default"].message.msg15);
                        return [4, qingLongApi_1.qingLongApi.addCookie(cookie, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(config_1["default"].message.msg8);
                                    util_1.util.delay();
                                    onMessage.addRemark(remarks, jdId_1, contact);
                                    return;
                                }
                                else {
                                    contact.say(config_1["default"].message.msg9);
                                    return;
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 13:
                        _a.sent();
                        return [3, 16];
                    case 14:
                        contact.say(config_1["default"].message.msg16);
                        data = {
                            name: 'JD_COOKIE',
                            value: cookie,
                            remarks: '',
                            _id: _id
                        };
                        return [4, qingLongApi_1.qingLongApi.updateCookie(data, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(config_1["default"].message.msg10);
                                    onMessage.addRemark(remarks, jdId_1, contact);
                                }
                                else {
                                    contact.say(config_1["default"].message.msg11);
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 15:
                        _a.sent();
                        if (status_1 == 0) {
                            contact.say(config_1["default"].message.msg12);
                        }
                        else {
                            contact.say(config_1["default"].message.msg13);
                            qingLongApi_1.qingLongApi.enableCookie(_id, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(config_1["default"].message.msg12);
                                }
                                else {
                                    contact.say(config_1["default"].message.msg14);
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            });
                        }
                        _a.label = 16;
                    case 16: return [3, 18];
                    case 17:
                        if (/^ding$/.test(content)) {
                            contact.say('dong');
                            return [2];
                        }
                        else {
                            util_1.util.delay();
                            contact.say(config_1["default"].message.msg6);
                        }
                        _a.label = 18;
                    case 18: return [2];
                }
            });
        });
    };
    onMessage.addRemark = function (remarks, jdId, contact) {
        if (/^jd-/.test(remarks)) {
            var remarkArray = remarks.split(',');
            for (var i in remarkArray) {
                if (jdId == remarkArray[i]) {
                    contact.say(config_1["default"].message.msg3 + jdId);
                    return;
                }
            }
            contact.alias(remarks + ',' + jdId);
            contact.say(config_1["default"].message.bindId + remarks + ',' + jdId);
            return;
        }
        else {
            contact.alias(jdId);
            contact.say(config_1["default"].message.bindId + jdId);
            return;
        }
    };
    return onMessage;
}());
exports.onMessage = onMessage;
