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
exports.bot = exports.Bot = void 0;
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../conf/config"));
var constant_1 = __importDefault(require("../constant/constant"));
var qlUtils_1 = require("../util/qlUtils");
var request_1 = require("../api/request");
var ql_1 = __importDefault(require("../constant/ql"));
var msgReply_1 = require("./message/msgReply");
var conf = {
    max_user: 10
};
var botRes;
var Bot = (function () {
    function Bot() {
    }
    Bot.onScan = function (qrcode, status) {
        wechaty_1.log.info('扫描下方二维码登录微信');
        require('qrcode-terminal').generate(qrcode, { small: true });
        Bot.qrcodeUrl = ['https://api.qrserver.com/v1/create-qr-code/?data=',
            encodeURIComponent(qrcode),
        ].join('');
    };
    Bot.onLogin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var date, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wechaty_1.log.info("".concat(user, "\u767B\u5F55\u4E86"));
                        date = new Date();
                        wechaty_1.log.info("\u5F53\u524D\u65F6\u95F4:".concat(date));
                        constant_1["default"].islogin = false;
                        if (!config_1["default"].ql_module) return [3, 4];
                        wechaty_1.log.info('初始化青龙===========开始');
                        return [4, request_1.reapi.getQlToken()];
                    case 1:
                        res = _a.sent();
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
                    case 2:
                        _a.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        wechaty_1.log.info('[ql_module]已关闭, 联系管理员开启');
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    Bot.onLogout = function (user) {
        constant_1["default"].islogin = true;
        wechaty_1.log.info("".concat(user, " \u5DF2\u7ECF\u9000\u51FA"));
    };
    Bot.forwardLogGroup = function (msg) {
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
                        if (!(config_1["default"].logGroup && config_1["default"].logGroup != '')) return [3, 4];
                        return [4, bot.Room.find({ topic: config_1["default"].logGroup })];
                    case 2:
                        room = _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say("\u3010\u8054\u7CFB\u4EBA\u6D88\u606F\u3011\n\u6765\u81EA:".concat(contact.name()).concat(remarks == '' ? '' : "(".concat(remarks, ")"), "\n\u5185\u5BB9:").concat(content)))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    Bot.onMessage = function (msg) {
        try {
            var room = msg.room();
            var msgSelf = msg.self();
            if (msgSelf)
                return;
            if (!botRes) {
                botRes = new msgReply_1.MsgReply(conf, bot);
            }
            if (room) {
                Bot.room_msg(room, msg);
            }
            else {
                Bot.private_msg(msg);
                Bot.forwardLogGroup(msg);
            }
        }
        catch (e) {
            console.log('reply error', e);
        }
    };
    Bot.room_msg = function (room, msg) {
    };
    Bot.private_msg = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var type, contact, content, name, remarks, isOfficial, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = msg.type();
                        contact = msg.talker();
                        content = msg.text().trim();
                        name = contact.name();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _a.sent();
                        isOfficial = contact.type() === bot.Contact.Type.Official;
                        id = contact.id;
                        console.log("\u597D\u53CB\u7C7B\u578B:".concat(isOfficial ? '公众号' : '普通', " \u6635\u79F0:").concat(name, " \u5907\u6CE8:").concat(remarks, " \u5185\u5BB9:").concat(content, " id:").concat(id));
                        if (!!isOfficial) return [3, 5];
                        if (!/开启了朋友验证/.test(content)) return [3, 3];
                        wechaty_1.log.info('重新加载好友数据');
                        return [4, contact.sync()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4, botRes.run(contact, id, content)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    Bot.qrcodeUrl = '';
    return Bot;
}());
exports.Bot = Bot;
var bot = wechaty_1.WechatyBuilder.build({
    name: 'WXBOT',
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
        uos: true
    }
});
exports.bot = bot;
bot.on('scan', Bot.onScan);
bot.on('login', Bot.onLogin);
bot.on('logout', Bot.onLogout);
bot.on('message', Bot.onMessage);
bot.on('friendship', function (friendship) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(friendship.type() === bot.Friendship.Type.Receive)) return [3, 2];
                return [4, friendship.accept()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2];
        }
    });
}); });
bot
    .start()
    .then(function () { return wechaty_1.log.info("\u5FAE\u4FE1\u767B\u5F55\u4E8C\u7EF4\u7801\u751F\u6210\u4E2D..."); })["catch"](function (e) { return console.error(e); });
