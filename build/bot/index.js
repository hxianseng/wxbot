"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.bot = exports.qrcodeImageUrl = void 0;
var wechaty_1 = require("wechaty");
var config_1 = __importDefault(require("../config"));
var util_1 = require("../utils/util");
var onMessage_1 = require("./onMessage");
var OnFriendShip_1 = require("./OnFriendShip");
var Bot = (function () {
    function Bot() {
    }
    Bot.onScan = function (qrcode, status) {
        require('qrcode-terminal').generate(qrcode, { small: true });
        exports.qrcodeImageUrl = qrcodeImageUrl = [
            'https://api.qrserver.com/v1/create-qr-code/?data=',
            encodeURIComponent(qrcode),
        ].join('');
    };
    Bot.onLogin = function (user) {
        console.log("".concat(user, "\u767B\u5F55\u4E86"));
        var date = new Date();
        console.log("\u5F53\u524D\u65F6\u95F4:".concat(date));
        util_1.util.pushChoice(user + '上线了');
    };
    Bot.onLogout = function (user) {
        util_1.util.pushChoice(user + '下线了');
        console.log("".concat(user, " \u5DF2\u7ECF\u9000\u51FA"));
    };
    return Bot;
}());
var bot = new wechaty_1.Wechaty({
    name: 'WechatEveryDay',
    puppet: 'wechaty-puppet-wechat'
});
exports.bot = bot;
var qrcodeImageUrl = '';
exports.qrcodeImageUrl = qrcodeImageUrl;
bot.on('scan', Bot.onScan);
bot.on('login', Bot.onLogin);
bot.on('logout', Bot.onLogout);
bot.on('message', onMessage_1.onMessage.message);
bot.on('friendship', OnFriendShip_1.OnFriendShip.onFriendShip);
bot
    .start()
    .then(function () { return console.log("\u5F00\u59CB\u767B\u5F55\u5FAE\u4FE1,\u6253\u5F00\u94FE\u63A5\u626B\u63CF\u4E8C\u7EF4\u7801(\u591A\u5237\u65B0\u51E0\u6B21) http://\u4F60\u7684IP:".concat(config_1["default"].PORT, "/api/v1/qrcodeImage")); })["catch"](function (e) { return console.error(e); });
