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
    CFD.getCFD_HB = function (cookie, url) {
        return (0, axios_1["default"])({
            url: url,
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
    CFD.getCFD_URL = function (cookie) {
        return (0, axios_1["default"])({
            url: 'https://m.jingxi.com/jxbfd/user/ExchangeState?strZone=jxbfd&dwType=2&sceneval=2&g_login_type=1',
            method: 'GET',
            headers: {
                "Host": "m.jingxi.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                'referer': 'https://st.jingxi.com/fortune_island/index2.html?ptag=7155.9.47&sceneval=2&sid=6f488e2778fa2db09a39f105577da07w',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
                'cookie': cookie,
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Accept-Encoding": "gzip, deflate, br"
            }
        });
    };
    CFD.getJDDate = function () {
        return (0, axios_1["default"])({
            url: 'https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5',
            method: 'GET',
            headers: {
                'accept': 'text / html, application/ xhtml + xml, application/ xml; q = 0.9, image / webp, image / apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37'
            }
        });
    };
    CFD.UA = "jdpingou;iPhone;5.2.2;14.3;".concat(CFD.randomString(40), ";network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148");
    return CFD;
}());
exports.CFD = CFD;
