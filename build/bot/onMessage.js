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
var constant_1 = __importDefault(require("../constant"));
var util_1 = require("../utils/util");
var qingLongApi_1 = require("../utils/qingLongApi");
var axios_1 = __importDefault(require("axios"));
var request_1 = __importDefault(require("request"));
var onMessage = (function () {
    function onMessage() {
    }
    onMessage.message = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, room, remarks, isText, str, jdId, str, jdId, remarkArray, flag, i_1, newRemark, i, pt_pin, pt_key, jdId_1, result, cookie, cookies, flag, _id, status_1, i_2, data, result, cookies, remarkArray, cookieArr, i_3, j, cookie, remark, _a, _b, _i, i_4, todayIncomeBean, incomeBean, expenseBean, beanCount, expirejingdou, JDEggcnt, JDtotalcash, JdzzNum, JdMsScore, redMessgae, cookie, result_1, pt_pin, jdId_2, ReturnMessage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contact = msg.talker();
                        content = msg.text().trim();
                        room = msg.room();
                        remarks = '';
                        return [4, contact.alias().then(function (data) {
                                remarks = data;
                            })];
                    case 1:
                        _c.sent();
                        isText = msg.type() === wechaty_1.Message.Type.Text;
                        if (msg.self()) {
                            return [2];
                        }
                        if (!(!room && isText)) return [3, 25];
                        console.log("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                        if (!/菜单/.test(content)) return [3, 2];
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.menu + '\n本通知 By:https://github.com/hxianseng/push-wechaty-bot.git');
                        return [2];
                    case 2:
                        if (!/查看京东id/.test(content)) return [3, 3];
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.seeId);
                        return [2];
                    case 3:
                        if (!(/^绑定:jd-/.test(content) || /^绑定:jd_/.test(content))) return [3, 4];
                        util_1.util.delay();
                        str = content.split(':');
                        jdId = str[1];
                        onMessage.addRemark(remarks, jdId, contact);
                        return [3, 25];
                    case 4:
                        if (!/^查看绑定/.test(content)) return [3, 5];
                        if (remarks == null) {
                            contact.say(constant_1["default"].message.msg1);
                            return [2];
                        }
                        contact.say(constant_1["default"].message.msg4 + remarks);
                        return [3, 25];
                    case 5:
                        if (!(/^解绑:jd-/.test(content) || /^解绑:jd_/.test(content))) return [3, 11];
                        util_1.util.delay();
                        str = content.split(':');
                        jdId = str[1];
                        if (remarks == null) {
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
                        if (!!flag) return [3, 6];
                        contact.say(constant_1["default"].message.msg5);
                        return [3, 10];
                    case 6:
                        if (!(remarkArray.length == 1)) return [3, 8];
                        return [4, contact.alias(null)];
                    case 7:
                        _c.sent();
                        contact.say(constant_1["default"].message.msg2);
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
                        _c.sent();
                        contact.say(constant_1["default"].message.msg2);
                        _c.label = 10;
                    case 10: return [3, 25];
                    case 11:
                        if (!(/pt_pin=.+?;/.test(content) && /pt_key=.+?;/.test(content))) return [3, 17];
                        pt_pin = content.match(/pt_pin=.+?;/) || [0];
                        pt_key = content.match(/pt_key=.+?;/) || [0];
                        if (pt_pin[0] == 0 || pt_key[0] == 0) {
                            contact.say(constant_1["default"].message.msg7);
                            return [2];
                        }
                        jdId_1 = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, qingLongApi_1.qingLongApi.searchValue()];
                    case 12:
                        result = _c.sent();
                        cookie = pt_key[0] + pt_pin[0];
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
                        contact.say(constant_1["default"].message.msg15);
                        return [4, qingLongApi_1.qingLongApi.addCookie(cookie, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(constant_1["default"].message.msg8);
                                    util_1.util.delay();
                                    onMessage.addRemark(remarks, jdId_1, contact);
                                    return;
                                }
                                else {
                                    contact.say(constant_1["default"].message.msg9);
                                    return;
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 13:
                        _c.sent();
                        return [3, 16];
                    case 14:
                        contact.say(constant_1["default"].message.msg16);
                        data = {
                            name: 'JD_COOKIE',
                            value: cookie,
                            remarks: '',
                            _id: _id
                        };
                        return [4, qingLongApi_1.qingLongApi.updateCookie(data, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(constant_1["default"].message.msg10);
                                    onMessage.addRemark(remarks, jdId_1, contact);
                                }
                                else {
                                    contact.say(constant_1["default"].message.msg11);
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 15:
                        _c.sent();
                        if (status_1 == 0) {
                            contact.say(constant_1["default"].message.msg12);
                        }
                        else {
                            contact.say(constant_1["default"].message.msg13);
                            qingLongApi_1.qingLongApi.enableCookie(_id, result.token).then(function (res) {
                                if (res.data.code == 200) {
                                    contact.say(constant_1["default"].message.msg12);
                                }
                                else {
                                    contact.say(constant_1["default"].message.msg14);
                                }
                            })["catch"](function (err) {
                                console.log(err);
                            });
                        }
                        _c.label = 16;
                    case 16: return [3, 25];
                    case 17:
                        if (!/^查询资产$/.test(content)) return [3, 24];
                        util_1.util.delay();
                        contact.say(constant_1["default"].message.msg17);
                        return [4, qingLongApi_1.qingLongApi.searchValue()];
                    case 18:
                        result = _c.sent();
                        cookies = result.data;
                        if (remarks == null)
                            return [2, contact.say(constant_1["default"].message.msg1)];
                        remarkArray = remarks.split(',');
                        cookieArr = [];
                        for (i_3 in cookies) {
                            for (j in remarkArray) {
                                cookie = cookies[i_3].value;
                                remark = remarkArray[j];
                                if (new RegExp(remark).test(cookie)) {
                                    cookieArr.push(cookie);
                                }
                            }
                        }
                        if (cookieArr.length == 0)
                            return [2, contact.say(constant_1["default"].message.msg18)];
                        _a = [];
                        for (_b in cookieArr)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 19;
                    case 19:
                        if (!(_i < _a.length)) return [3, 23];
                        i_4 = _a[_i];
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
                        cookie = cookieArr[i_4];
                        return [4, onMessage.TotalBean(cookie)];
                    case 20:
                        beanCount = _c.sent();
                        return [4, onMessage.bean(cookie)];
                    case 21:
                        result_1 = _c.sent();
                        todayIncomeBean = result_1.todayIncomeBean;
                        incomeBean = result_1.incomeBean;
                        expenseBean = result_1.expenseBean;
                        expirejingdou = result_1.expirejingdou;
                        redMessgae = result_1.redMessgae;
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId_2 = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        ReturnMessage = "\u4EAC\u4E1CId\uFF1A".concat(jdId_2, "\n");
                        ReturnMessage += "\u4ECA\u65E5\u6536\u5165\uFF1A".concat(todayIncomeBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                        ReturnMessage += "\u6628\u65E5\u6536\u5165\uFF1A".concat(incomeBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                        ReturnMessage += "\u6628\u65E5\u652F\u51FA\uFF1A".concat(expenseBean, "\u4EAC\u8C46 \uD83D\uDC36\n");
                        ReturnMessage += "\u5F53\u524D\u4EAC\u8C46\uFF1A".concat(beanCount, "(\u4ECA\u65E5\u5C06\u8FC7\u671F").concat(expirejingdou, ")\u4EAC\u8C46\uD83D\uDC36\n");
                        ReturnMessage += "\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\u7EA2\u5305\u660E\u7EC6\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7\uD83E\uDDE7";
                        ReturnMessage += redMessgae;
                        ReturnMessage += '\n本通知 By:https://github.com/hxianseng/push-wechaty-bot.git';
                        contact.say(ReturnMessage);
                        util_1.util.delay();
                        _c.label = 22;
                    case 22:
                        _i++;
                        return [3, 19];
                    case 23: return [3, 25];
                    case 24:
                        if (/^ding$/.test(content)) {
                            contact.say('dong');
                            return [2];
                        }
                        else {
                            util_1.util.delay();
                            contact.say(constant_1["default"].message.msg6);
                        }
                        _c.label = 25;
                    case 25: return [2];
                }
            });
        });
    };
    onMessage.addRemark = function (remarks, jdId, contact) {
        if (/^jd-/.test(remarks) || /^jd_/.test(remarks)) {
            var remarkArray = remarks.split(',');
            for (var i in remarkArray) {
                if (jdId == remarkArray[i]) {
                    contact.say(constant_1["default"].message.msg3 + jdId);
                    return;
                }
            }
            contact.alias(remarks + ',' + jdId);
            contact.say(constant_1["default"].message.bindId + remarks + ',' + jdId);
            return;
        }
        else {
            contact.alias(jdId);
            contact.say(constant_1["default"].message.bindId + jdId);
            return;
        }
    };
    onMessage.TotalBean = function (cookie) {
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
    };
    onMessage.bean = function (cookie) {
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
    };
    return onMessage;
}());
exports.onMessage = onMessage;
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
