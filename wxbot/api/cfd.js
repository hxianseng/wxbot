"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CFD = void 0;
var axios_1 = __importDefault(require("axios"));
var CFD = (function () {
    function CFD() {
    }
    CFD.randomString = function (e) {
        e = e || 32;
        var t = "abcdef0123456789", a = t.length, n = "";
        for (var i = 0; i < e; i++)
            n += t.charAt(Math.floor(Math.random() * a));
        return n;
    };
    CFD.getCFD_HB = function (cookie) {
        return (0, axios_1["default"])({
            url: 'https://m.jingxi.com/jxbfd/user/ExchangePrize?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1656492040098&dwType=3&dwLvl=15&ddwPaperMoney=100000&strPoolName=jxcfd2_exchange_hb_202205&sceneval=2&g_login_type=1',
            method: 'get',
            headers: {
                "Host": "m.jingxi.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                'referer': 'https://st.jingxi.com/',
                'User-Agent': CFD.UA,
                'cookie': cookie,
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Accept-Encoding": "gzip, deflate, br"
            },
            timeout: 1000 * 10
        });
    };
    CFD.UA = "jdpingou;iPhone;5.2.2;14.3;".concat(CFD.randomString(40), ";network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148");
    return CFD;
}());
exports.CFD = CFD;
