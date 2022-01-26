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
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var bot_1 = require("../bot");
var config_1 = __importDefault(require("../config"));
var router = express_1["default"].Router();
exports.router = router;
router.use(function (req, res, next) {
    var url = req.url;
    if (/qrcodeImage$/.test(url)) {
        next();
    }
    else {
        if (req.body.token != config_1["default"].token || config_1["default"].token == '') {
            res.json({
                status: 500,
                message: 'token validation failed'
            });
        }
        else {
            next();
        }
    }
});
router.post('/send', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contact, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body;
                console.log(data);
                return [4, bot_1.bot.Contact.find({ alias: new RegExp(data.name) })];
            case 1:
                contact = _a.sent();
                if (contact == null) {
                    console.log("\u6CA1\u6709\u5339\u914D\u5230:".concat(req.body.name));
                    res.json({
                        status: 500,
                        message: "\u6CA1\u6709\u5339\u914D\u5230:".concat(req.body.name)
                    });
                    return [2];
                }
                contact === null || contact === void 0 ? void 0 : contact.say(data.content + '\n本通知 By:https://github.com/hxianseng/push-wechaty-bot.git');
                res.json({
                    status: 200,
                    message: "SUCCESS"
                });
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
