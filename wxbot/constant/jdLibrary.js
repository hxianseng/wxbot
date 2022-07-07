"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.jdLibrary = void 0;
var config_1 = __importDefault(require("../conf/config"));
exports.jdLibrary = [
    {
        name: 'shufflewzc_faker3_main',
        js_file: [
            {
                fileName: 'sendNotify.js',
                upArr: [
                    {
                        point: 'module.exports = {',
                        up_or_down: 'up',
                        remark: '通知主函数',
                        content: "let PUSH_WECHATY_BOT_TOKEN = '".concat(config_1["default"].token, "';\n") +
                            "let PUSH_WECHATY_BOT_URL = '".concat(config_1["default"].qlNotify.botUrl, "';\n") +
                            '//push-wechaty-bot\n' +
                            'async function wechatyNotify(userName, text, desp, time = 2100) {\n' +
                            '    return new Promise((resolve) => {\n' +
                            '        if (PUSH_WECHATY_BOT_TOKEN) {\n' +
                            '            const body = {\n' +
                            '                token: `${PUSH_WECHATY_BOT_TOKEN}`,\n' +
                            '                name: `${userName}`,\n' +
                            '                content: `${text}\\n${desp}`\n' +
                            '            };\n' +
                            '            const options = {\n' +
                            '                url: PUSH_WECHATY_BOT_URL,\n' +
                            '                body: JSON.stringify(body),\n' +
                            '                headers: {\n' +
                            '                    "Content-Type": "application/json",\n' +
                            '                },\n' +
                            '                timeout,\n' +
                            '            };\n' +
                            '            setTimeout(() => {\n' +
                            '                $.post(options, (err, resp, data) => {\n' +
                            '                    try {\n' +
                            '                        data = JSON.parse(data);\n' +
                            '                        if (data.status == 200) {\n' +
                            '                            console.log(userName + "推送到个人微信:" + data.message)\n' +
                            '                        } else {\n' +
                            '                            console.log(userName + "推送到个人微信:" + data.message);\n' +
                            '                        }\n' +
                            '                    } catch (e) {\n' +
                            '                        $.logErr(e, resp);\n' +
                            '                    } finally {\n' +
                            '                        resolve(data);\n' +
                            '                    }\n' +
                            '                });\n' +
                            '            }, time);\n' +
                            '        }\n' +
                            '        else {\n' +
                            '            resolve();\n' +
                            '        }\n' +
                            '    });\n' +
                            '}'
                    },
                    {
                        point: 'module.exports = {',
                        up_or_down: 'down',
                        remark: '导出主函数',
                        content: '  wechatyNotify,'
                    },
                ]
            },
            {
                fileName: 'jd_bean_change.js',
                upArr: [
                    {
                        point: '			if (intPerSent > 0) {',
                        up_or_down: 'up',
                        remark: '京东资产变动通知',
                        content: '            await notify.wechatyNotify(`${$.UserName}`, `${$.name}`, `${ReturnMessage}`);'
                    },
                ]
            }
        ]
    }
];
