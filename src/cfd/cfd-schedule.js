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
exports.cfd_hb = void 0;
var node_schedule_1 = __importDefault(require("node-schedule"));
var utils_1 = require("./utils");
var cfd_1 = require("./cfd");
var axios_1 = __importDefault(require("axios"));
var ql_1 = __importDefault(require("../constant/ql"));
var request_1 = require("../api/request");
var Bot_1 = require("../bot/Bot");
function cfd_hb() {
    console.log("".concat(utils_1.Utils.formatDate(new Date()), "  \u521D\u59CB\u5316\u8D22\u5BCC\u5C9B\u4EFB\u52A1"));
    node_schedule_1["default"].scheduleJob('30 59 * * * *', function () {
        return __awaiter(this, void 0, void 0, function () {
            var cks, rks, i, len, cookie, pt_pin, jdId, _id, url, nowTime, nextTime, contact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("===========\u672C\u6B21\u4EFB\u52A1\u5F00\u59CB============:".concat(utils_1.Utils.formatDate(new Date())));
                        cks = ql_1["default"].cfd_ck;
                        if (cks.length == 0 || cks.length == 1) {
                            return [2];
                        }
                        rks = new Array();
                        for (i = 0, len = cks.length; i < len; i++) {
                            if (cks[i].status == 0) {
                                rks.push(cks[i]);
                            }
                        }
                        if (rks.length == 0 || rks.length == 1) {
                            return [2];
                        }
                        cookie = rks[1].value;
                        console.log(cookie);
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        _id = rks[1]._id;
                        url = ql_1["default"].cfd_url;
                        nowTime = 0;
                        return [4, cfd_1.CFD.getJDDate().then(function (res) {
                                nowTime = parseInt(res.data.currentTime2.toString());
                            })];
                    case 1:
                        _a.sent();
                        nextTime = new Date(utils_1.Utils.format(new Date(nowTime + 3600000))).getTime();
                        console.log("\u5EF6\u8FDF:".concat(nextTime - nowTime - ql_1["default"].cfd_delay, "ms"));
                        return [4, utils_1.Utils.sleep(nextTime - nowTime - ql_1["default"].cfd_delay)];
                    case 2:
                        _a.sent();
                        console.log("\u62A2\u7EA2\u5305\u5F00\u59CB------->".concat(utils_1.Utils.formatDate(new Date())));
                        return [4, Bot_1.bot.Contact.find({ alias: new RegExp(jdId) })];
                    case 3:
                        contact = _a.sent();
                        return [4, axios_1["default"].all([cfd_1.CFD.getCFD_HB(cookie, url), cfd_1.CFD.getJDDate()]).then(axios_1["default"].spread(function (res1, res2) {
                                var data = JSON.parse(res1.data.replace('jsonpCBKM(', '').replace(')', ''));
                                console.log(res1.data);
                                console.log('抢红包结果------->' + res1.data);
                                console.log("\u62A2\u7EA2\u5305\u7ED3\u675F------->\u672C\u5730\u65F6\u95F4:".concat(utils_1.Utils.formatDate(new Date())));
                                console.log("\u62A2\u7EA2\u5305\u7ED3\u675F------->\u4EAC\u4E1C\u65F6\u95F4:".concat(utils_1.Utils.formatDate(new Date(parseInt(res2.data.currentTime2.toString())))));
                                var pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                                var jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                                contact === null || contact === void 0 ? void 0 : contact.say("\u3010\u8D22\u5BCC\u5C9B\u901A\u77E5\u3011\n\u8D26\u53F7:".concat(jdId, "\n\u7ED3\u679C:").concat(data.sErrMsg, "\n\u8BE6\u60C5:") + data + "\nPs:iRet\u503C?" +
                                    "\n0:\u53EF\u80FD\u62A2\u5230\u4E86\n1014:URL\u8FC7\u671F\n2007:\u8D22\u5BCC\u503C\u4E0D\u591F\n9999:cookie\u5931\u6548" + '\n本通知 By:https://github.com/hxianseng/wxbot.git');
                                if (data.iRet == 0) {
                                    request_1.reapi.disableEnvs(_id);
                                    console.log(data.sErrMsg);
                                }
                                else if (data.iRet == 2016) {
                                    ql_1["default"].cfd_delay -= 50;
                                    console.log(data.sErrMsg);
                                    console.log("\u4EFB\u52A1\u542F\u52A8\u5FEB\u4E86,\u9700\u8981\u52A0,\u4E0B\u4E00\u6B21\u5EF6\u8FDF\u53D8\u91CF:".concat(ql_1["default"].cfd_delay));
                                }
                                else if (data.iRet == 2013) {
                                    ql_1["default"].cfd_delay += 50;
                                    console.log(data.sErrMsg);
                                    console.log("\u4EFB\u52A1\u542F\u52A8\u6162\u4E86,\u9700\u8981\u51CF,\u4E0B\u4E00\u6B21\u5EF6\u8FDF\u53D8\u91CF:".concat(ql_1["default"].cfd_delay));
                                }
                                else if (data.iRet == 2007) {
                                    contact === null || contact === void 0 ? void 0 : contact.say('财富值不够,删除cfd_cookie\n本通知 By:https://github.com/hxianseng/wxbot.git');
                                    request_1.reapi.deleteEnvs(_id);
                                }
                                else if (data.iRet == 9999) {
                                    contact === null || contact === void 0 ? void 0 : contact.say('cookie失效,删除cfd_cookie\n本通知 By:https://github.com/hxianseng/wxbot.git');
                                    request_1.reapi.deleteEnvs(_id);
                                }
                            }))];
                    case 4:
                        _a.sent();
                        console.log("===========\u672C\u6B21\u4EFB\u52A1\u7ED3\u675F============:".concat(utils_1.Utils.formatDate(new Date()), "\n"));
                        return [2];
                }
            });
        });
    });
}
exports.cfd_hb = cfd_hb;
