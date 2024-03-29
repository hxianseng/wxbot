"use strict";
module.exports = {
    /**
     * 更新之后请重新获取此文件，因为你不知道我这个老六什么时候更新了此文件
     */

    //自定义服务端口 默认3000
    PORT: 3000,

    //自定义请求api接口的token,接口请求方式查看：https://github.com/hxianseng/wxbot#%E6%8E%A8%E9%80%81%E6%8E%A5%E5%8F%A3
    token: '',

    //日志群名称，机器人会把所有联系人发的消息转发到群(包括通过api接口发送的通知)，提前创建好群并拉机器人进群
    //(避免敏感消息泄露，群内请只有你和机器人)
    logGroup: '',

    //联通流量查询
    traffic_query: {
        flag:false, //开启 true  关闭 false  默认 false
        timed_push_cron:'0 1 21 * * *', // 定时推送流量 默认每天21:01推送
        monitoring_jumps_cron:'0 0/5 * * * *' //监控跳点 默认每5分钟刷新
    },


    //================================京东青龙相关======================================

    //跟青龙相关模块， 填false 下面jd短信登录、ck登录、一对一通知都会关闭; true开启 默认false
    ql_module: false,

    //maiark短信登陆 http://ip:端口
    maiarkUrl: '',

    //nark短信登陆 http://ip:端口
    nark: {
        qlkey: 1, //默认为1  根据自己的nark来
        url: ''
    },

    //用的maiark填: maiark 用的nark填: nark     默认maiark
    current_interface: 'maiark',

    //青龙url http://ip:端口
    QLurl: {
        ql_url:'',
        qlId:'_id' //青龙新老版本的字段不同 根据你的青龙版本来  老版本：_id  新版本：id  默认：_id
    },

    //青龙面板=>系统设置=>应用设置 最少权限:环境变量、脚本管理;后续更新可能会用到:配置文件、定时任务
    clientId: '',

    //青龙面板=>系统设置=>应用设置 最少权限:环境变量、脚本管理;后续更新可能会用到:配置文件、定时任务
    clientSecret: '',


    /**
     * 自动对接青龙通知
     */
    qlNotify: {

        //true or false  true:开启 false:关闭  默认false
        flag: false,

        /**
         * JD库
         * 查看库文件夹名称: 青龙->脚本管理->拉取的库文件夹名
         *
         * faker3 填 shufflewzc_faker3_main 或 shufflewzc_faker3 根据自己青龙显示的库文件夹名来
         *
         * kr     填 KingRan_KR
         *
         * 目前支持的库:faker3、kr
         *
         */
        jdLibrary: '',

        //该库是否有自带sendNotify.js文件 有：true  没有：false 默认：true
        isFile: true,

        //机器人接口 http://IP:端口/api/v1/send     IP: 本机ip  端口: 上述中的PORT
        botUrl: ''
    }
};