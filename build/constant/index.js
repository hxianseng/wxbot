"use strict";
module.exports = {
    message: {
        menu: '========命令========\n' +
            '查看绑定(发送 查看绑定)\n' +
            '解绑京东id(发送 解绑:绑定的京东id)\n' +
            '查询(京东资产详情:发送 查询)\n' +
            '添加/更新CK(直接发送包含pt_pin和pt_key的CK)\n' +
            '短信登录\n' +
            '容器详情\n' +
            '查看京东id(发送 查看京东id)\n' +
            '绑定京东id(发送 绑定:jd-xxx或者jd-xxx)\n' +
            '========注意事项========\n' +
            '京东id一般以"jd-"或"jd_"开头\n' +
            '========Bot========\n',
        bindId: '绑定成功，你绑定的京东id:',
        seeId: '打开 京东app => 我的 => 右上角设置图标 => 用户名:jd_xxx或jd-xxx => 发送 绑定:jd_xxx或jd-xxx 给我',
        msg1: '你目前没有绑定京东id!',
        msg2: '解绑成功\n发送 查看绑定 查看绑定的京东id',
        msg3: '你已绑定此京东id:',
        msg4: '你目前已绑定:',
        msg5: '你目前没有绑定此京东id!',
        msg6: '没有匹配到你发的消息,请检查消息,可以发送 菜单 查看详情',
        msg7: 'cookie格式错误',
        msg8: 'cookie添加成功,正在绑定京东id...',
        msg9: 'cookie添加失败',
        msg10: 'cookie更新成功,正在绑定京东id...',
        msg11: 'cookie更新失败',
        msg12: 'cookie已启用',
        msg13: 'cookie被禁用，启用中...',
        msg14: 'cookie启用失败',
        msg15: '添加cookie,请稍后...',
        msg16: '更新cookie,请稍后...',
        msg17: '查询中，请稍后...',
        msg18: '你所绑定的京东id没有匹配到cookie'
    }
};
