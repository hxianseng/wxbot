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
exports.beanChange = exports.message = void 0;
var constant_1 = __importDefault(require("../constant"));
var util_1 = require("../utils/util");
var qingLongApi_1 = require("../utils/qingLongApi");
var axios_1 = __importDefault(require("axios"));
var request_1 = __importDefault(require("request"));
var _1 = require(".");
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../config"));
var dbUtil_1 = require("./dbUtil");
var data_schedule_1 = require("../utils/data-schedule");
function message(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var contact, content, room, remarks, isText, str, jdId, str, jdId, remarkArray, flag, i_1, newRemark, i, pt_pin, pt_key, jdId_1, result, cookie, status_1, data, id, resp, confList, qlkey, body, e_1, name_1, filePath, db, index, ret, body, resp_1, qlid, qlkey, url, res_1, ck, url_1, data;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (msg.self()) {
                        return [2];
                    }
                    contact = msg.talker();
                    content = msg.text().trim();
                    room = msg.room();
                    return [4, contact.alias()];
                case 1:
                    remarks = _a.sent();
                    isText = msg.type() === _1.bot.Message.Type.Text;
                    wechaty_1.log.info("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                    if (!(!room && isText)) return [3, 54];
                    if (!/菜单/.test(content)) return [3, 3];
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.menu + '\n本通知 By:https://github.com/hxianseng/push-wechaty-bot.git')];
                case 2:
                    _a.sent();
                    return [2];
                case 3:
                    if (!/查看京东id/.test(content)) return [3, 5];
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.seeId)];
                case 4:
                    _a.sent();
                    return [2];
                case 5:
                    if (!(/^绑定:jd-/.test(content) || /^绑定:jd_/.test(content))) return [3, 6];
                    util_1.util.delay();
                    str = content.split(':');
                    jdId = str[1];
                    addRemark(remarks, jdId, contact);
                    return [3, 54];
                case 6:
                    if (!/^查看绑定/.test(content)) return [3, 7];
                    if (remarks == null) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg1);
                        return [2];
                    }
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg4 + remarks);
                    return [3, 54];
                case 7:
                    if (!(/^解绑:jd-/.test(content) || /^解绑:jd_/.test(content))) return [3, 13];
                    util_1.util.delay();
                    str = content.split(':');
                    jdId = str[1];
                    if (remarks == null) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg1);
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
                    if (!!flag) return [3, 8];
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg5);
                    return [3, 12];
                case 8:
                    if (!(remarkArray.length == 1)) return [3, 10];
                    return [4, contact.alias(null)];
                case 9:
                    _a.sent();
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg2);
                    return [3, 12];
                case 10:
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
                case 11:
                    _a.sent();
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg2);
                    _a.label = 12;
                case 12: return [3, 54];
                case 13:
                    if (!(/pt_pin=.+?;/.test(content) && /pt_key=.+?;/.test(content))) return [3, 19];
                    pt_pin = content.match(/pt_pin=.+?;/) || [0];
                    pt_key = content.match(/pt_key=.+?;/) || [0];
                    if (pt_pin[0] == 0 || pt_key[0] == 0) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg7);
                        return [2];
                    }
                    jdId_1 = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                    return [4, findCookieById(jdId_1)];
                case 14:
                    result = _a.sent();
                    cookie = pt_key[0] + pt_pin[0];
                    if (!!result.flag) return [3, 15];
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg15);
                    choiceContainer(cookie, contact, remarks, jdId_1);
                    return [3, 18];
                case 15:
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.msg16)];
                case 16:
                    _a.sent();
                    result.cookie.value = cookie;
                    result.cookie.remarks = jdId_1;
                    status_1 = result.cookie.status;
                    data = result.cookie;
                    data['remarks'] = jdId_1;
                    delete data.created;
                    delete data.status;
                    delete data.timestamp;
                    delete data.position;
                    return [4, qingLongApi_1.qingLongApi.updateCookie(data, result.token, result.container.QLurl).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(res.data.code == 200)) return [3, 3];
                                        util_1.util.delay();
                                        return [4, contact.say(constant_1["default"].message.msg10)];
                                    case 1:
                                        _a.sent();
                                        return [4, addRemark(remarks, jdId_1, contact)];
                                    case 2:
                                        _a.sent();
                                        return [3, 5];
                                    case 3:
                                        util_1.util.delay();
                                        return [4, contact.say(constant_1["default"].message.msg11)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2];
                                }
                            });
                        }); })["catch"](function (err) {
                            console.log(err);
                        })];
                case 17:
                    _a.sent();
                    if (status_1 == 0) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg12);
                    }
                    else {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg13);
                        id = result.cookie._id ? result.cookie._id : result.cookie.id;
                        qingLongApi_1.qingLongApi.enableCookie(result.container.QLurl, id, result.token).then(function (res) {
                            if (res.data.code == 200) {
                                util_1.util.delay();
                                contact.say(constant_1["default"].message.msg12);
                            }
                            else {
                                util_1.util.delay();
                                contact.say(constant_1["default"].message.msg14);
                            }
                        })["catch"](function (err) {
                            console.log(err);
                        });
                    }
                    _a.label = 18;
                case 18: return [3, 54];
                case 19:
                    if (!/^查询$/.test(content)) return [3, 20];
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg17);
                    beanChange(remarks, contact, '【查询】');
                    return [3, 54];
                case 20:
                    if (!/^ding$/.test(content)) return [3, 21];
                    contact.say('dong');
                    return [2];
                case 21:
                    if (!/短信登录/.test(content)) return [3, 26];
                    if (!config_1["default"].Nolan.flag) return [3, 23];
                    util_1.util.delay();
                    return [4, contact.say('开始短信登录,请60s内发送手机号')];
                case 22:
                    _a.sent();
                    return [3, 25];
                case 23: return [4, contact.say('请设置config.js --> Nolan --> flag为true开启短信登录')];
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25: return [3, 54];
                case 26:
                    if (!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 32];
                    util_1.util.delay();
                    return [4, contact.say('正在获取验证码,请稍后...')];
                case 27:
                    _a.sent();
                    _a.label = 28;
                case 28:
                    _a.trys.push([28, 30, , 31]);
                    return [4, qingLongApi_1.qingLongApi.getConfigNolan(config_1["default"].Nolan.url + '/api/Config')];
                case 29:
                    resp = _a.sent();
                    confList = resp.data.list;
                    qlkey = confList[0].qLkey;
                    body = {
                        Phone: content,
                        qlkey: qlkey
                    };
                    sendSMS(body, content, contact);
                    return [3, 31];
                case 30:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3, 31];
                case 31: return [3, 54];
                case 32:
                    if (!/^\d{6}$/.test(content)) return [3, 53];
                    return [4, util_1.util.delay()];
                case 33:
                    _a.sent();
                    return [4, contact.say('开始登录京东,请稍后...')];
                case 34:
                    _a.sent();
                    name_1 = contact.name();
                    filePath = '../constant/sms.json';
                    return [4, (0, dbUtil_1.getDb)(filePath)];
                case 35:
                    db = _a.sent();
                    index = db.sms.findIndex(function (x) { return x.remark == name_1; });
                    if (!(index == -1)) return [3, 37];
                    return [4, contact.say('验证码失效,请重新发送手机号开始登录')];
                case 36:
                    _a.sent();
                    return [2];
                case 37:
                    ret = db.sms.find(function (x) { return x.remark == name_1; });
                    body = {
                        Code: content,
                        Phone: ret.Phone,
                        QQ: "",
                        qlkey: ret.qlkey
                    };
                    return [4, qingLongApi_1.qingLongApi.verifyCodeNolan(config_1["default"].Nolan.url + '/api/VerifyCode', body).then(function (res) {
                            if (res.status == 200) {
                                resp_1 = res.data;
                            }
                        })["catch"](function (e) {
                            console.log(e);
                        })];
                case 38:
                    _a.sent();
                    if (!(resp_1 == undefined)) return [3, 40];
                    return [4, contact.say('Nolan /api/VerifyCode接口请求失败')];
                case 39:
                    _a.sent();
                    return [2];
                case 40:
                    console.log(resp_1);
                    if (!resp_1.success) return [3, 48];
                    return [4, contact.say('登录成功')];
                case 41:
                    _a.sent();
                    db.sms.splice(index, 1);
                    return [4, (0, dbUtil_1.saveDb)(db, filePath)];
                case 42:
                    _a.sent();
                    qlid = resp_1.data.qlid;
                    qlkey = resp_1.data.qlkey;
                    url = config_1["default"].Nolan.url + "/api/User?qlid=".concat(qlid, "&qlkey=").concat(qlkey);
                    return [4, qingLongApi_1.qingLongApi.getUser(url).then(function (resp) {
                            if (resp.status == 200) {
                                res_1 = resp.data;
                            }
                        })["catch"](function (e) {
                            console.log(e);
                        })];
                case 43:
                    _a.sent();
                    if (!(res_1 == undefined)) return [3, 45];
                    return [4, contact.say('Nolan /api/User接口请求失败')];
                case 44:
                    _a.sent();
                    return [2];
                case 45:
                    if (!res_1.success) return [3, 47];
                    ck = res_1.data.ck;
                    url_1 = config_1["default"].Nolan.url + "/api/del";
                    data = {
                        qlid: qlid,
                        qlkey: qlkey
                    };
                    return [4, qingLongApi_1.qingLongApi.delUser(url_1, data).then(function (res) {
                        })];
                case 46:
                    _a.sent();
                    upCookie(ck, contact, remarks);
                    _a.label = 47;
                case 47: return [3, 52];
                case 48:
                    if (!(resp_1.message == '验证码输入错误')) return [3, 50];
                    return [4, contact.say(resp_1.message + ',请重新输入')];
                case 49:
                    _a.sent();
                    return [3, 52];
                case 50: return [4, contact.say(resp_1.message)];
                case 51:
                    _a.sent();
                    _a.label = 52;
                case 52: return [3, 54];
                case 53:
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg6);
                    _a.label = 54;
                case 54: return [2];
            }
        });
    });
}
exports.message = message;
function addRemark(remarks, jdId, contact) {
    return __awaiter(this, void 0, void 0, function () {
        var remarkArray, _a, _b, _i, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(/^jd-/.test(remarks) || /^jd_/.test(remarks))) return [3, 6];
                    remarkArray = remarks.split(',');
                    _a = [];
                    for (_b in remarkArray)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    i = _a[_i];
                    if (!(jdId == remarkArray[i])) return [3, 3];
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.msg3 + jdId)];
                case 2:
                    _c.sent();
                    return [2];
                case 3:
                    _i++;
                    return [3, 1];
                case 4:
                    contact.alias(remarks + ',' + jdId);
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.bindId + remarks + ',' + jdId)];
                case 5:
                    _c.sent();
                    return [2];
                case 6:
                    contact.alias(jdId);
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.bindId + jdId)];
                case 7:
                    _c.sent();
                    return [2];
            }
        });
    });
}
function TotalBean(cookie) {
    return __awaiter(this, void 0, void 0, function () {
        var beanCount, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    beanCount = 0;
                    options = {
                        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
                        headers: {
                            Host: "me-api.jd.com",
                            Accept: "*/*",
                            Connection: "keep-alive",
                            Cookie: cookie,
                            "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                            "Accept-Language": "zh-cn",
                            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                            "Accept-Encoding": "gzip, deflate, br"
                        }
                    };
                    return [4, axios_1["default"].get(options.url, {
                            headers: options.headers
                        }).then(function (res) {
                            if (res) {
                                if (res) {
                                    var data = res.data;
                                    if (data['retcode'] === "1001") {
                                        console.log('cookie过期');
                                        return;
                                    }
                                    if (data['retcode'] === '0' && data.data && data.data['assetInfo']) {
                                        beanCount = data.data && data.data['assetInfo']['beanNum'];
                                    }
                                }
                                else {
                                    console.log('京东服务器返回空数据');
                                }
                            }
                        })["catch"](function (err) {
                            console.log('TotalBean()请求失败');
                        })];
                case 1:
                    _a.sent();
                    return [2, beanCount];
            }
        });
    });
}
function bean(cookie) {
    return __awaiter(this, void 0, void 0, function () {
        var tm, tm1, page, t, yesterdayArr, todayArr, result, response, detailList, _i, detailList_1, item, date, _a, yesterdayArr_1, item, _b, todayArr_1, item, _c, redMessage;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    tm = new Date(new Date().toLocaleDateString()).getTime() - (24 * 60 * 60 * 1000);
                    tm1 = new Date(new Date().toLocaleDateString()).getTime();
                    page = 1, t = 0, yesterdayArr = [], todayArr = [];
                    result = {
                        incomeBean: 0,
                        expenseBean: 0,
                        todayIncomeBean: 0,
                        expirejingdou: 0,
                        redMessgae: ''
                    };
                    _d.label = 1;
                case 1: return [4, getJingBeanBalanceDetail(page, cookie)];
                case 2:
                    response = _d.sent();
                    if (response && response.code === "0") {
                        page++;
                        detailList = response.detailList;
                        if (detailList && detailList.length > 0) {
                            for (_i = 0, detailList_1 = detailList; _i < detailList_1.length; _i++) {
                                item = detailList_1[_i];
                                date = item.date.replace(/-/g, '/') + "+08:00";
                                if (new Date(date).getTime() >= tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
                                    todayArr.push(item);
                                }
                                else if (tm <= new Date(date).getTime() && new Date(date).getTime() < tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
                                    yesterdayArr.push(item);
                                }
                                else if (tm > new Date(date).getTime()) {
                                    t = 1;
                                    break;
                                }
                            }
                        }
                        else {
                            t = 1;
                        }
                    }
                    else if (response && response.code === "3") {
                        console.log("cookie\u5DF2\u8FC7\u671F\uFF0C\u6216\u8005\u586B\u5199\u4E0D\u89C4\u8303\uFF0C\u8DF3\u51FA");
                        t = 1;
                    }
                    else {
                        console.log("\u672A\u77E5\u60C5\u51B5\uFF1A".concat(JSON.stringify(response)));
                        console.log("\u672A\u77E5\u60C5\u51B5\uFF0C\u8DF3\u51FA");
                        t = 1;
                    }
                    _d.label = 3;
                case 3:
                    if (t === 0) return [3, 1];
                    _d.label = 4;
                case 4:
                    for (_a = 0, yesterdayArr_1 = yesterdayArr; _a < yesterdayArr_1.length; _a++) {
                        item = yesterdayArr_1[_a];
                        if (Number(item.amount) > 0) {
                            result.incomeBean += Number(item.amount);
                        }
                        else if (Number(item.amount) < 0) {
                            result.expenseBean += Number(item.amount);
                        }
                    }
                    for (_b = 0, todayArr_1 = todayArr; _b < todayArr_1.length; _b++) {
                        item = todayArr_1[_b];
                        if (Number(item.amount) > 0) {
                            result.todayIncomeBean += Number(item.amount);
                        }
                    }
                    _c = result;
                    return [4, queryexpirejingdou(cookie)];
                case 5:
                    _c.expirejingdou = _d.sent();
                    return [4, redPacket(cookie)];
                case 6:
                    redMessage = _d.sent();
                    result.redMessgae = redMessage;
                    return [2, result];
            }
        });
    });
}
function getJingBeanBalanceDetail(page, cookie) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                "url": "https://api.m.jd.com/client.action?functionId=getJingBeanBalanceDetail",
                "body": "body=".concat(escape(JSON.stringify({ "pageSize": "20", "page": page.toString() })), "&appid=ld"),
                "headers": {
                    'User-Agent': "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                    'Host': 'api.m.jd.com',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie
                }
            };
            request_1["default"].post(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("".concat(JSON.stringify(err)));
                        console.log("API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if (data) {
                            data = JSON.parse(data);
                        }
                        else {
                            console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E");
                        }
                    }
                }
                catch (e) {
                    console.log(e, resp);
                }
                finally {
                    resolve(data);
                }
            });
            return [2];
        });
    }); });
}
function queryexpirejingdou(cookie) {
    return __awaiter(this, void 0, void 0, function () {
        var options, expirejingdou;
        return __generator(this, function (_a) {
            options = {
                "url": "https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=".concat(Date.now(), "&g_login_type=1&sceneval=2"),
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "deflate, br",
                    "Accept-Language": "zh-cn",
                    "Connection": "keep-alive",
                    "Cookie": cookie,
                    "Host": "wq.jd.com",
                    "Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
                }
            };
            expirejingdou = 0;
            request_1["default"].get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("".concat(JSON.stringify(err)));
                        console.log("API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if (data) {
                            data = JSON.parse(data.slice(23, -13));
                            if (data.ret === 0) {
                                data['expirejingdou'].map(function (item) {
                                });
                                expirejingdou = data['expirejingdou'][0]['expireamount'];
                            }
                        }
                        else {
                            console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E");
                        }
                    }
                }
                catch (e) {
                    console.log(e, resp);
                }
            });
            return [2, expirejingdou];
        });
    });
}
function redPacket(cookie) {
    var _this = this;
    var message = '';
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                "url": "https://m.jingxi.com/user/info/QueryUserRedEnvelopesV2?type=1&orgFlag=JD_PinGou_New&page=1&cashRedType=1&redBalanceFlag=1&channel=1&_=".concat(+new Date(), "&sceneval=2&g_login_type=1&g_ty=ls"),
                "headers": {
                    'Host': 'm.jingxi.com',
                    'Accept': '*/*',
                    'Connection': 'keep-alive',
                    'Accept-Language': 'zh-cn',
                    'Referer': 'https://st.jingxi.com/my/redpacket.shtml?newPg=App&jxsid=16156262265849285961',
                    'Accept-Encoding': 'deflate, br',
                    "Cookie": cookie,
                    'User-Agent': "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
                }
            };
            request_1["default"].get(options, function (err, resp, data) {
                try {
                    if (err) {
                        console.log("".concat(JSON.stringify(err)));
                        console.log("API\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u8DEF\u91CD\u8BD5");
                    }
                    else {
                        if (data) {
                            data = JSON.parse(data).data;
                            var balance = 0, expiredBalance = 0, jxRed = 0, jsRed = 0, jdRed = 0, jdhRed = 0, jxRedExpire = 0, jsRedExpire = 0, jdRedExpire = 0, jdhRedExpire = 0;
                            var t = new Date();
                            t.setDate(t.getDate() + 1);
                            t.setHours(0, 0, 0, 0);
                            t = Math.floor((t - 1) / 1000);
                            for (var _i = 0, _a = data.useRedInfo.redList || []; _i < _a.length; _i++) {
                                var vo = _a[_i];
                                if (vo.orgLimitStr && vo.orgLimitStr.includes("京喜")) {
                                    jxRed += parseFloat(vo.balance);
                                    if (vo['endTime'] === t) {
                                        jxRedExpire += parseFloat(vo.balance);
                                    }
                                }
                                else if (vo.activityName.includes("极速版")) {
                                    jsRed += parseFloat(vo.balance);
                                    if (vo['endTime'] === t) {
                                        jsRedExpire += parseFloat(vo.balance);
                                    }
                                }
                                else if (vo.orgLimitStr && vo.orgLimitStr.includes("京东健康")) {
                                    jdhRed += parseFloat(vo.balance);
                                    if (vo['endTime'] === t) {
                                        jdhRedExpire += parseFloat(vo.balance);
                                    }
                                }
                                else {
                                    jdRed += parseFloat(vo.balance);
                                    if (vo['endTime'] === t) {
                                        jdRedExpire += parseFloat(vo.balance);
                                    }
                                }
                            }
                            jxRed = parseInt(jxRed.toFixed(2));
                            jsRed = parseInt(jsRed.toFixed(2));
                            jdRed = parseInt(jdRed.toFixed(2));
                            jdhRed = parseInt(jdhRed.toFixed(2));
                            balance = data.balance;
                            expiredBalance = parseInt((jxRedExpire + jsRedExpire + jdRedExpire).toFixed(2));
                            message += "\n\u5F53\u524D\u603B\u7EA2\u5305\uFF1A".concat(balance, "(\u4ECA\u65E5\u603B\u8FC7\u671F").concat(expiredBalance, ")\u5143 \uD83E\uDDE7\n\u4EAC\u559C\u7EA2\u5305\uFF1A").concat(jxRed, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(jxRedExpire.toFixed(2), ")\u5143 \uD83E\uDDE7\n\u6781\u901F\u7EA2\u5305\uFF1A").concat(jsRed, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(jsRedExpire.toFixed(2), ")\u5143 \uD83E\uDDE7\n\u4EAC\u4E1C\u7EA2\u5305\uFF1A").concat(jdRed, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(jdRedExpire.toFixed(2), ")\u5143 \uD83E\uDDE7\n\u5065\u5EB7\u7EA2\u5305\uFF1A").concat(jdhRed, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(jdhRedExpire.toFixed(2), ")\u5143 \uD83E\uDDE7");
                        }
                        else {
                            console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8FD4\u56DE\u7A7A\u6570\u636E");
                        }
                    }
                }
                catch (e) {
                    console.log(e, resp);
                }
                finally {
                    resolve(message);
                }
            });
            return [2];
        });
    }); });
}
function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    }
    catch (e) {
        console.log(e);
        console.log("\u4EAC\u4E1C\u670D\u52A1\u5668\u8BBF\u95EE\u6570\u636E\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u81EA\u8EAB\u8BBE\u5907\u7F51\u7EDC\u60C5\u51B5");
        return false;
    }
}
function timeFormat(time) {
    var date;
    if (time) {
        date = new Date(time);
    }
    else {
        date = new Date();
    }
    return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}
function findCookieById(jdId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, db, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, (0, data_schedule_1.updata)()];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3, 3];
                case 3: return [4, (0, dbUtil_1.getDb)('./db.json')];
                case 4:
                    db = _a.sent();
                    res = db.cookieDetails.find(function (container) { return container.jdId == jdId; });
                    data = {
                        'flag': false
                    };
                    if (res) {
                        wechaty_1.log.info("db.json\u627E\u5230:".concat(jdId));
                        data.flag = true;
                        data['token'] = res.token;
                        data['container'] = res.container;
                        data['cookie'] = res.cookie;
                        return [2, data];
                    }
                    return [2, data];
            }
        });
    });
}
function choiceContainer(cookie, contact, remarks, jdId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, containerArr, ret, token, QLurl, QLName, i, ckNum, ckMaxNum, _a, _b, _i, i, token, QLurl, QLName, ckNum, ckMaxNum;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, (0, dbUtil_1.getDb)('./db.json')];
                case 1:
                    db = _c.sent();
                    containerArr = db.containerDetails;
                    if (!(config_1["default"].container.addMode == 2)) return [3, 4];
                    ret = 1;
                    token = void 0;
                    QLurl = void 0;
                    QLName = void 0;
                    for (i in containerArr) {
                        ckNum = containerArr[i].ckNum;
                        ckMaxNum = containerArr[i].ckMaxNum;
                        if (ckNum / ckMaxNum < ret) {
                            ret = ckNum / ckMaxNum;
                            token = containerArr[i].token;
                            QLurl = containerArr[i].container.QLurl;
                            QLName = containerArr[i].container.QLName;
                        }
                    }
                    if (!(ret == 1)) return [3, 3];
                    return [4, contact.say('添加失败,容器的cookie数量都达到最大值')];
                case 2:
                    _c.sent();
                    return [2];
                case 3:
                    addCookie(cookie, contact, remarks, jdId, token, QLurl, QLName);
                    return [3, 9];
                case 4:
                    _a = [];
                    for (_b in containerArr)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3, 9];
                    i = _a[_i];
                    token = containerArr[i].token;
                    QLurl = containerArr[i].container.QLurl;
                    QLName = containerArr[i].container.QLName;
                    ckNum = containerArr[i].ckNum;
                    ckMaxNum = containerArr[i].ckMaxNum;
                    if (!(ckNum < ckMaxNum)) return [3, 6];
                    addCookie(cookie, contact, remarks, jdId, token, QLurl, QLName);
                    return [3, 9];
                case 6: return [4, contact.say("\u3010".concat(QLName, "\u3011\u5BB9\u5668\u7684cookie\u6570\u91CF\u8FBE\u5230\u6700\u5927\u503C,\u6DFB\u52A0\u5230\u4E0B\u4E00\u4E2A\u5BB9\u5668,\u5982\u679C\u4F60\u53EA\u6709\u4E00\u4E2A\u5BB9\u5668\u90A3\u5C06\u6DFB\u52A0\u5931\u8D25!"))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _i++;
                    return [3, 5];
                case 9: return [2];
            }
        });
    });
}
function addCookie(cookie, contact, remarks, jdId, token, QLurl, QLName) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, qingLongApi_1.qingLongApi.addCookie(cookie, token, QLurl).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(res.data.code == 200)) return [3, 2];
                                    util_1.util.delay();
                                    return [4, contact.say("\u5BB9\u5668\u3010".concat(QLName, "\u3011").concat(constant_1["default"].message.msg8))];
                                case 1:
                                    _a.sent();
                                    util_1.util.delay();
                                    addRemark(remarks, jdId, contact);
                                    return [3, 4];
                                case 2:
                                    util_1.util.delay();
                                    return [4, contact.say(constant_1["default"].message.msg9)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    }); })["catch"](function (err) {
                        console.log(err);
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function beanChange(remarks, contact, str) {
    return __awaiter(this, void 0, void 0, function () {
        var remarkArray, cookies, db, e_2, cookieArr, i, j, jdId, remark, _a, _b, _i, i, todayIncomeBean, incomeBean, expenseBean, beanCount, expirejingdou, JDEggcnt, JDtotalcash, JdzzNum, JdMsScore, redMessgae, cookie, result, pt_pin, jdId, ReturnMessage;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (remarks == null)
                        return [2, contact.say(constant_1["default"].message.msg1)];
                    remarkArray = remarks.split(',');
                    cookies = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4, (0, data_schedule_1.updata)()];
                case 2:
                    _c.sent();
                    return [4, (0, dbUtil_1.getDb)('./db.json')];
                case 3:
                    db = _c.sent();
                    cookies = db.cookieDetails;
                    return [3, 5];
                case 4:
                    e_2 = _c.sent();
                    console.log(e_2);
                    return [3, 5];
                case 5:
                    cookieArr = [];
                    for (i in cookies) {
                        for (j in remarkArray) {
                            jdId = cookies[i].jdId;
                            remark = remarkArray[j];
                            if (jdId == remark) {
                                if (cookies[i].cookie.status != 0)
                                    continue;
                                cookieArr.push(cookies[i].cookie.value);
                            }
                        }
                    }
                    if (cookieArr.length == 0)
                        return [2, contact.say(constant_1["default"].message.msg18)];
                    _a = [];
                    for (_b in cookieArr)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 6;
                case 6:
                    if (!(_i < _a.length)) return [3, 10];
                    i = _a[_i];
                    todayIncomeBean = 0;
                    incomeBean = 0;
                    expenseBean = 0;
                    beanCount = 0;
                    expirejingdou = 0;
                    JDEggcnt = 0;
                    JDtotalcash = void 0;
                    JdzzNum = 0;
                    JdMsScore = 0;
                    redMessgae = '';
                    cookie = cookieArr[i];
                    return [4, TotalBean(cookie)];
                case 7:
                    beanCount = _c.sent();
                    return [4, bean(cookie)];
                case 8:
                    result = _c.sent();
                    todayIncomeBean = result.todayIncomeBean;
                    incomeBean = result.incomeBean;
                    expenseBean = result.expenseBean;
                    expirejingdou = result.expirejingdou;
                    redMessgae = result.redMessgae;
                    pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                    jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                    ReturnMessage = "".concat(str, "\n\n\u4EAC\u4E1CId\uFF1A").concat(jdId, "\n");
                    ReturnMessage += "\u4ECA\u65E5\u6536\u5165\uFF1A".concat(todayIncomeBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                    ReturnMessage += "\u6628\u65E5\u6536\u5165\uFF1A".concat(incomeBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                    ReturnMessage += "\u6628\u65E5\u652F\u51FA\uFF1A".concat(expenseBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                    ReturnMessage += "\u5F53\u524D\u4EAC\u8C46\uFF1A".concat(beanCount, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(expirejingdou, ")\u4EAC\u8C46\uD83D\uDC36\n");
                    ReturnMessage += "\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\u7EA2\u5305\u660E\u7EC6\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7";
                    ReturnMessage += redMessgae;
                    ReturnMessage += '\n本通知 By:https://github.com/hxianseng/push-wechaty-bot.git';
                    util_1.util.delay();
                    contact.say(ReturnMessage);
                    _c.label = 9;
                case 9:
                    _i++;
                    return [3, 6];
                case 10: return [2];
            }
        });
    });
}
exports.beanChange = beanChange;
function sendSMS(body, Phone, contact) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, dat, flag, _loop_1, i, state_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, qingLongApi_1.qingLongApi.sendSMSNolan(config_1["default"].Nolan.url + '/api/SendSMS', body).then(function (res) {
                        if (res.status == 200) {
                            resp = res.data;
                        }
                    })["catch"](function (e) {
                        console.log(e);
                    })];
                case 1:
                    _a.sent();
                    if (!(resp == undefined)) return [3, 3];
                    return [4, contact.say("nolan /api/SendSMS\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6")];
                case 2:
                    _a.sent();
                    return [2];
                case 3:
                    wechaty_1.log.info(resp.message);
                    if (!((resp === null || resp === void 0 ? void 0 : resp.message) == '出现安全验证,')) return [3, 7];
                    dat = {
                        Phone: Phone
                    };
                    flag = true;
                    _loop_1 = function (i) {
                        var resp_2, name_2, data, filePath_1, db_1, e_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, contact.say("\u51FA\u73B0\u5B89\u5168\u9A8C\u8BC1,\u7B2C".concat(i, "\u6B21\u5C1D\u8BD5\u7834\u89E3"))];
                                case 1:
                                    _b.sent();
                                    return [4, qingLongApi_1.qingLongApi.autoCaptchaNolan(config_1["default"].Nolan.url + '/api/AutoCaptcha', dat)];
                                case 2:
                                    resp_2 = _b.sent();
                                    console.log(resp_2);
                                    if (!resp_2.success) return [3, 9];
                                    return [4, contact.say("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001,\u8BF7\u57283\u5206\u949F\u5185\u56DE\u590D6\u4F4D\u6570\u9A8C\u8BC1\u7801")];
                                case 3:
                                    _b.sent();
                                    name_2 = contact.name();
                                    data = {
                                        Phone: Phone,
                                        remark: name_2,
                                        QQ: '',
                                        qlkey: body.qlkey
                                    };
                                    _b.label = 4;
                                case 4:
                                    _b.trys.push([4, 7, , 8]);
                                    filePath_1 = '../constant/sms.json';
                                    return [4, (0, dbUtil_1.getDb)(filePath_1)];
                                case 5:
                                    db_1 = _b.sent();
                                    console.log(db_1);
                                    db_1.sms.push(data);
                                    return [4, (0, dbUtil_1.saveDb)(db_1, filePath_1)];
                                case 6:
                                    _b.sent();
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var index;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    wechaty_1.log.info("\u5F00\u59CB\u6E05\u9664".concat(name_2, "\u7684\u9A8C\u8BC1\u7801\u6570\u636E\uFF0C\u5982\u679C\u8FD8\u6CA1\u5B8C\u6210\u767B\u5F55\u8BF7\u91CD\u65B0\u56DE\u590D\u624B\u673A\u53F7\u91CD\u65B0\u767B\u5F55"));
                                                    return [4, (0, dbUtil_1.getDb)(filePath_1)];
                                                case 1:
                                                    db_1 = _a.sent();
                                                    index = db_1.sms.findIndex(function (x) { return x.remark == name_2; });
                                                    if (!(index != -1)) return [3, 3];
                                                    db_1.sms.splice(index, 1);
                                                    return [4, (0, dbUtil_1.saveDb)(db_1, filePath_1)];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3: return [2];
                                            }
                                        });
                                    }); }, 1000 * 180);
                                    return [3, 8];
                                case 7:
                                    e_3 = _b.sent();
                                    console.log(e_3);
                                    return [3, 8];
                                case 8:
                                    flag = false;
                                    return [2, "break"];
                                case 9:
                                    if (!/请24小时后再试/.test(resp_2.message)) return [3, 11];
                                    return [4, contact.say(resp_2.message)];
                                case 10:
                                    _b.sent();
                                    return [2, "break"];
                                case 11: return [4, contact.say(resp_2.message)];
                                case 12:
                                    _b.sent();
                                    if (!(i == 5)) return [3, 14];
                                    return [4, contact.say("\u5B89\u5168\u9A8C\u8BC1\u7834\u89E3\u5931\u8D25,\u8BF7\u91CD\u65B0\u53D1\u9001\u624B\u673A\u53F7\u5F00\u59CB\u77ED\u4FE1\u767B\u5F55")];
                                case 13:
                                    _b.sent();
                                    _b.label = 14;
                                case 14: return [2];
                            }
                        });
                    };
                    i = 1;
                    _a.label = 4;
                case 4:
                    if (!(i <= 5)) return [3, 7];
                    return [5, _loop_1(i)];
                case 5:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3, 7];
                    _a.label = 6;
                case 6:
                    i++;
                    return [3, 4];
                case 7: return [2];
            }
        });
    });
}
function findCookieById1(jdId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2, db, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, (0, data_schedule_1.updata)()];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3, 3];
                case 3: return [4, (0, dbUtil_1.getDb)('./db.json')];
                case 4:
                    db = _a.sent();
                    res = db.cookieDetails.find(function (container) { return container.jdId == jdId; });
                    data = {
                        'flag': false
                    };
                    if (res) {
                        wechaty_1.log.info("db.json\u627E\u5230:".concat(jdId));
                        data.flag = true;
                        data['token'] = res.token;
                        data['container'] = res.container;
                        data['cookie'] = res.cookie;
                        return [2, data];
                    }
                    return [2, data];
            }
        });
    });
}
function upCookie(content, contact, remarks) {
    return __awaiter(this, void 0, void 0, function () {
        var pt_pin, pt_key, jdId, result, cookie, status_2, data, id;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pt_pin = content.match(/pt_pin=.+?;/) || [0];
                    pt_key = content.match(/pt_key=.+?;/) || [0];
                    if (pt_pin[0] == 0 || pt_key[0] == 0) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg7);
                        return [2];
                    }
                    jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                    return [4, findCookieById1(jdId)];
                case 1:
                    result = _a.sent();
                    cookie = pt_key[0] + pt_pin[0];
                    if (!!result.flag) return [3, 2];
                    util_1.util.delay();
                    contact.say(constant_1["default"].message.msg15);
                    choiceContainer(cookie, contact, remarks, jdId);
                    return [3, 5];
                case 2:
                    util_1.util.delay();
                    return [4, contact.say(constant_1["default"].message.msg16)];
                case 3:
                    _a.sent();
                    result.cookie.value = cookie;
                    result.cookie.remarks = jdId;
                    status_2 = result.cookie.status;
                    data = result.cookie;
                    data['remarks'] = jdId;
                    delete data.created;
                    delete data.status;
                    delete data.timestamp;
                    delete data.position;
                    return [4, qingLongApi_1.qingLongApi.updateCookie(data, result.token, result.container.QLurl).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(res.data.code == 200)) return [3, 3];
                                        util_1.util.delay();
                                        return [4, contact.say(constant_1["default"].message.msg10)];
                                    case 1:
                                        _a.sent();
                                        return [4, addRemark(remarks, jdId, contact)];
                                    case 2:
                                        _a.sent();
                                        return [3, 5];
                                    case 3:
                                        util_1.util.delay();
                                        return [4, contact.say(constant_1["default"].message.msg11)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2];
                                }
                            });
                        }); })["catch"](function (err) {
                            console.log(err);
                        })];
                case 4:
                    _a.sent();
                    if (status_2 == 0) {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg12);
                    }
                    else {
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg13);
                        id = result.cookie._id ? result.cookie._id : result.cookie.id;
                        qingLongApi_1.qingLongApi.enableCookie(result.container.QLurl, id, result.token).then(function (res) {
                            if (res.data.code == 200) {
                                util_1.util.delay();
                                contact.say(constant_1["default"].message.msg12);
                            }
                            else {
                                util_1.util.delay();
                                contact.say(constant_1["default"].message.msg14);
                            }
                        })["catch"](function (err) {
                            console.log(err);
                        });
                    }
                    _a.label = 5;
                case 5: return [2];
            }
        });
    });
}
