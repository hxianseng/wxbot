"use strict";
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
        wechaty_1.log.info("".concat(user, "\u767B\u5F55\u4E86"));
        var date = new Date();
        wechaty_1.log.info("\u5F53\u524D\u65F6\u95F4:".concat(date));
        util_1.util.pushChoice(user + '上线了');
        (0, data_schedule_1.updata)();
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
