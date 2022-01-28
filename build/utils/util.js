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
exports.util = void 0;
var wechaty_1 = require("wechaty");
var dbUtil_1 = require("../bot/dbUtil");
var config_1 = __importDefault(require("../config"));
var sendMsg_1 = require("./sendMsg");
var qingLongApi_1 = require("./qingLongApi");
var util = (function () {
    function util() {
    }
    util.delay = function () {
        return new Promise(function (resolve) {
            return setTimeout(resolve, Math.round(Math.random() * 300 + 300));
        });
    };
    util.pushChoice = function (msg) {
        var choice = config_1["default"].pushMessage.choice;
        if (choice == 0 || choice == null) {
            console.log("choice=0,\u4E0D\u63A8\u9001\u7CFB\u7EDF\u6D88\u606F");
            return;
        }
        else {
            var pushList = config_1["default"].pushMessage.pushList;
            for (var i in pushList) {
                if (choice == pushList[i].id && choice == 1) {
                    var params = Object.assign({
                        pushkey: pushList[i].pushKey,
                        text: msg
                    });
                    var sendMsg = new sendMsg_1.SendMsg();
                    sendMsg.sendServer(pushList[i].url, params);
                    break;
                }
                if (choice == pushList[i].id && choice == 2) {
                    var params = Object.assign({
                        token: pushList[i].pushKey,
                        content: msg
                    });
                    var sendMsg = new sendMsg_1.SendMsg();
                    sendMsg.sendServer(pushList[i].url, params);
                    break;
                }
            }
        }
    };
    util.autoUpdateQingLong = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AutoUpdateQingLong, js_library, js_fileArr, db, containerDetails, _a, _b, _i, i, token, QLurl, QLName, _loop_1, _c, _d, _e, j, state_1, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 11, , 12]);
                        AutoUpdateQingLong = config_1["default"].AutoUpdateQingLong;
                        if (!AutoUpdateQingLong.falg) return [3, 9];
                        wechaty_1.log.info('#对接青龙一对一通知-->开始');
                        js_library = AutoUpdateQingLong.js_library;
                        js_fileArr = AutoUpdateQingLong.js_file;
                        return [4, (0, dbUtil_1.getDb)('./db.json')];
                    case 1:
                        db = _f.sent();
                        containerDetails = db.containerDetails;
                        _a = [];
                        for (_b in containerDetails)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 8];
                        i = _a[_i];
                        token = containerDetails[i].token;
                        QLurl = containerDetails[i].container.QLurl;
                        QLName = containerDetails[i].container.QLName;
                        wechaty_1.log.info("##\u4FEE\u6539\u5BB9\u5668:".concat(QLName, "-->\u5F00\u59CB"));
                        _loop_1 = function (j) {
                            var fileName, upArr, resp, t, url, jsContent, upContent, m, point, up_or_down, content, remark, len, pointLen, index, head, foot, data;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        fileName = js_fileArr[j].fileName;
                                        upArr = js_fileArr[j].upArr;
                                        t = new Date().getTime();
                                        url = "".concat(QLurl, "/open/scripts/").concat(fileName, "?path=").concat(js_library, "&t=").concat(t);
                                        return [4, qingLongApi_1.qingLongApi.getScript(url, token).then(function (res) {
                                                if (res.status == 200) {
                                                    resp = res.data;
                                                }
                                            })];
                                    case 1:
                                        _g.sent();
                                        if (resp == undefined) {
                                            wechaty_1.log.error("\u9752\u9F99 /open/scripts\u8BF7\u6C42\u5931\u8D25");
                                            return [2, { value: void 0 }];
                                        }
                                        jsContent = resp.data;
                                        upContent = jsContent;
                                        for (m in upArr) {
                                            point = upArr[m].point;
                                            up_or_down = upArr[m].up_or_down;
                                            content = upArr[m].content;
                                            remark = upArr[m].remark;
                                            wechaty_1.log.info("\u4FEE\u6539\u6587\u4EF6:".concat(fileName, " \u5907\u6CE8:").concat(remark, " \u5207\u5165\u70B9:").concat(point, " \u6DFB\u52A0\u65B9\u5411:").concat(up_or_down == 'up' ? '向上一行添加' : '向下一行添加'));
                                            if (upContent.includes(content)) {
                                                wechaty_1.log.info("\u4FEE\u6539\u6587\u4EF6:".concat(fileName, " \u5907\u6CE8:").concat(remark, " \u5DF2\u4FEE\u6539,\u4E0D\u91CD\u590D\u4FEE\u6539"));
                                                continue;
                                            }
                                            else {
                                                len = upContent.length;
                                                pointLen = point.length;
                                                index = void 0;
                                                if (up_or_down == 'up') {
                                                    content += '\n';
                                                    index = upContent.indexOf(point);
                                                }
                                                else {
                                                    content = '\n' + content;
                                                    index = upContent.indexOf(point) + pointLen;
                                                }
                                                head = upContent.substring(0, index);
                                                foot = upContent.substring(index, len);
                                                upContent = head + content + foot;
                                            }
                                        }
                                        data = {
                                            path: js_library,
                                            filename: fileName,
                                            content: upContent
                                        };
                                        t = new Date().getTime();
                                        url = "".concat(QLurl, "/open/scripts?t=").concat(t);
                                        return [4, qingLongApi_1.qingLongApi.upScript(url, token, data).then(function (res) {
                                                if (res.data.code == 200) {
                                                    wechaty_1.log.info("\u4FEE\u6539\u6587\u4EF6:".concat(fileName, " \u5BF9\u63A5\u6210\u529F"));
                                                }
                                                else {
                                                    wechaty_1.log.info("\u4FEE\u6539\u6587\u4EF6:".concat(fileName, " \u5BF9\u63A5\u5931\u8D25 \u65E5\u5FD7:"));
                                                    console.log(res);
                                                }
                                            })];
                                    case 2:
                                        _g.sent();
                                        return [2];
                                }
                            });
                        };
                        _c = [];
                        for (_d in js_fileArr)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 3;
                    case 3:
                        if (!(_e < _c.length)) return [3, 6];
                        j = _c[_e];
                        return [5, _loop_1(j)];
                    case 4:
                        state_1 = _f.sent();
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        _f.label = 5;
                    case 5:
                        _e++;
                        return [3, 3];
                    case 6:
                        wechaty_1.log.info("##\u4FEE\u6539\u5BB9\u5668:".concat(QLName, "-->\u7ED3\u675F"));
                        _f.label = 7;
                    case 7:
                        _i++;
                        return [3, 2];
                    case 8:
                        wechaty_1.log.info('#对接青龙一对一通知-->结束');
                        return [3, 10];
                    case 9:
                        wechaty_1.log.info('自动对接青龙已关闭,如需开启请设置config.js文件的AutoUpdateQingLong.falg为true');
                        _f.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        e_1 = _f.sent();
                        console.log(e_1);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    return util;
}());
exports.util = util;
