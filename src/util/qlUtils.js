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
exports.qlUtil = void 0;
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../conf/config"));
var request_1 = require("../api/request");
var ql_1 = __importDefault(require("../constant/ql"));
var jdLibrary_1 = require("../constant/jdLibrary");
var qlUtil = (function () {
    function qlUtil() {
    }
    qlUtil.qlNotify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, jdlib, js_file, i, leni, fileName, upArr, j, lenj, path, res, file, content, index, pointLen, head, fool, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wechaty_1.log.info('qlToken:' + ql_1["default"].qlToken);
                        if (!config_1["default"].qlNotify.flag) return [3, 16];
                        wechaty_1.log.info("=====\u5BF9\u63A5\u9752\u9F99\u4E00\u5BF9\u4E00\u901A\u77E5\u5F00\u59CB=====");
                        index = jdLibrary_1.jdLibrary.findIndex(function (x) { return x.name == config_1["default"].qlNotify.jdLibrary; });
                        if (!(index == -1)) return [3, 1];
                        wechaty_1.log.info("\u76EE\u524D\u4E0D\u652F\u6301\u5BF9\u63A5".concat(config_1["default"].qlNotify.jdLibrary, "\u5E93"));
                        wechaty_1.log.info("=====\u5BF9\u63A5\u9752\u9F99\u4E00\u5BF9\u4E00\u901A\u77E5\u7ED3\u675F=====");
                        return [2];
                    case 1:
                        jdlib = jdLibrary_1.jdLibrary.find(function (x) { return x.name == config_1["default"].qlNotify.jdLibrary; });
                        js_file = jdlib.js_file;
                        i = 0, leni = js_file.length;
                        _a.label = 2;
                    case 2:
                        if (!(i < leni)) return [3, 15];
                        fileName = js_file[i].fileName;
                        upArr = js_file[i].upArr;
                        wechaty_1.log.info("---".concat(fileName, "---------->\u5F00\u59CB"));
                        j = 0, lenj = upArr.length;
                        _a.label = 3;
                    case 3:
                        if (!(j < lenj)) return [3, 13];
                        path = jdlib.name;
                        wechaty_1.log.info("".concat(upArr[j].remark, "---------->\u5F00\u59CB"));
                        if (!(fileName == 'sendNotify.js')) return [3, 8];
                        if (!config_1["default"].qlNotify.isFile) return [3, 5];
                        return [4, request_1.reapi.getFileByName(fileName)];
                    case 4:
                        res = _a.sent();
                        return [3, 7];
                    case 5:
                        path = "";
                        return [4, request_1.reapi.getFileByName2(fileName)];
                    case 6:
                        res = _a.sent();
                        _a.label = 7;
                    case 7: return [3, 10];
                    case 8: return [4, request_1.reapi.getFileByName(fileName)];
                    case 9:
                        res = _a.sent();
                        _a.label = 10;
                    case 10:
                        file = res.data.data;
                        content = upArr[j].content;
                        if (file.lastIndexOf(content) != -1) {
                            wechaty_1.log.info("\u7ED3\u679C----->\u5DF2\u5BF9\u63A5,\u8DF3\u8FC7");
                            wechaty_1.log.info("".concat(upArr[j].remark, "---------->\u7ED3\u675F"));
                            return [3, 12];
                        }
                        index = file.indexOf(upArr[j].point);
                        pointLen = upArr[j].point.length;
                        head = '';
                        fool = '';
                        data = {
                            content: '',
                            filename: fileName,
                            path: path
                        };
                        if (upArr[j].up_or_down == 'up') {
                            head = file.substring(0, index);
                            fool = file.substring(index);
                            data.content = "".concat(head).concat(content, "\n\n").concat(fool);
                        }
                        else {
                            head = file.substring(0, index + pointLen);
                            fool = file.substring(index + pointLen);
                            data.content = "".concat(head, "\n").concat(content).concat(fool);
                        }
                        return [4, request_1.reapi.putFile(data)];
                    case 11:
                        res = _a.sent();
                        wechaty_1.log.info('结果----->', JSON.stringify(res.data));
                        wechaty_1.log.info("".concat(upArr[j].remark, "---------->\u7ED3\u675F"));
                        _a.label = 12;
                    case 12:
                        j++;
                        return [3, 3];
                    case 13:
                        wechaty_1.log.info("---".concat(fileName, "---------->\u7ED3\u675F"));
                        _a.label = 14;
                    case 14:
                        i++;
                        return [3, 2];
                    case 15:
                        wechaty_1.log.info("=====\u5BF9\u63A5\u9752\u9F99\u4E00\u5BF9\u4E00\u901A\u77E5\u7ED3\u675F=====");
                        return [3, 17];
                    case 16:
                        wechaty_1.log.info("\u5BF9\u63A5\u9752\u9F99\u4E00\u5BF9\u4E00\u901A\u77E5\u5DF2\u5173\u95ED\uFF0C\u5F00\u542F\u8BF7\u8BBE\u7F6Econfig.js\u7684qlNotify.flag\u4E3Atrue");
                        _a.label = 17;
                    case 17: return [2];
                }
            });
        });
    };
    qlUtil.getJDCK = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request_1.reapi.getEnvs('JD_COOKIE')];
                    case 1:
                        res = _a.sent();
                        wechaty_1.log.info('更新JD_COOKIE');
                        if (res) {
                            ql_1["default"].jd_ck = res.data.data;
                        }
                        else {
                            wechaty_1.log.info("更新JD_COOKIE失败，请检查网络");
                        }
                        return [2];
                }
            });
        });
    };
    qlUtil.getCFDCK = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request_1.reapi.getEnvs('CFD_COOKIE')];
                    case 1:
                        res = _a.sent();
                        wechaty_1.log.info('更新CFD_COOKIE');
                        ql_1["default"].cfd_ck = res.data.data;
                        return [2];
                }
            });
        });
    };
    return qlUtil;
}());
exports.qlUtil = qlUtil;
