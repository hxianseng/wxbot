"use strict";
module.exports = {
    /**
     * 重新拉去镜像请重新获取此文件，因为你不知道我这个老六什么时候更新了此文件
     */
    //自定义服务端口 默认3000
    PORT: 3000,
    //自定义请求api接口的token,接口请求方式查看：https://github.com/hxianseng/wxbot#%E6%8E%A8%E9%80%81%E6%8E%A5%E5%8F%A3
    token: '',
    //日志群名称，机器人会把所有联系人发的消息转发到群(包括通过api接口发送的通知)，提前创建好群并拉机器人进群
    //(避免敏感消息泄露，群内请只有你和机器人)
    logGroup: '',
    //maiark短信登陆 http://ip:端口
    maiarkUrl: '',
    //青龙url http://ip:端口
    QLurl: '',
    clientId: '',//青龙面板=>系统设置=>应用设置 最少权限:环境变量、脚本管理;后续更新可能会用到:配置文件、定时任务
    clientSecret: '',//青龙面板=>系统设置=>应用设置 最少权限:环境变量、脚本管理;后续更新可能会用到:配置文件、定时任务
    //对接青龙一对一通知
    qlNotify: {
        //true or false  true:开启 false:关闭  默认false
        flag: false,

        /**
         * JD库
         * faker3 填 shufflewzc_faker3_main
         * 
         * 目前支持的库:faker3
         * 
        */
        jdLibrary: '',
        
        //该库是否有自带sendNotify.js文件 有：true  没有：false 默认：true
        isFile: true,

        //机器人接口 http://IP:端口/api/v1/send     IP: 本机ip  端口: 上述中的PORT
        botUrl: ''
    }
}