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
exports.__esModule = true;
exports.bot = void 0;
var wechaty_1 = require("wechaty");
var util_1 = require("../utils/util");
var onMessage_1 = require("./onMessage");
var onFriendShip_1 = require("./onFriendShip");
var data_schedule_1 = require("../utils/data-schedule");
var Bot = (function () {
    function Bot() {
    }
    Bot.onScan = function (qrcode, status) {
        wechaty_1.log.info('扫描下方二维码登录微信');
        require('qrcode-terminal').generate(qrcode, { small: true });
    };
    Bot.onLogin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wechaty_1.log.info("".concat(user, "\u767B\u5F55\u4E86"));
                        date = new Date();
                        wechaty_1.log.info("\u5F53\u524D\u65F6\u95F4:".concat(date));
                        util_1.util.pushChoice(user + '上线了');
                        return [4, (0, data_schedule_1.updata)()];
                    case 1:
                        _a.sent();
                        return [4, util_1.util.autoUpdateQingLong()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Bot.onLogout = function (user) {
        util_1.util.pushChoice(user + '下线了');
        wechaty_1.log.info("".concat(user, " \u5DF2\u7ECF\u9000\u51FA"));
    };
    return Bot;
}());
var bot = wechaty_1.WechatyBuilder.build({
    name: 'JD-WX-BOT',
    puppet: 'wechaty-puppet-wechat'
});
exports.bot = bot;
bot.on('scan', Bot.onScan);
bot.on('login', Bot.onLogin);
bot.on('logout', Bot.onLogout);
bot.on('message', onMessage_1.message);
bot.on('friendship', onFriendShip_1.OnFriendShip.onFriendShip);
bot
    .start()
    .then(function () { return wechaty_1.log.info("\u5FAE\u4FE1\u767B\u5F55\u4E8C\u7EF4\u7801\u751F\u6210\u4E2D..."); })["catch"](function (e) { return console.error(e); });
