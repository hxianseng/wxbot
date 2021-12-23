# push-wechaty-bot
push-wechaty-bot 是基于 node 与 wechaty 的微信个人号消息推送工具。

# push-wechaty-bot与ql对接
- [x] 推送消息
- [x] 添加/更新CK
- [ ] 查询资产
- [ ] 短信登录
<div>
    <img style="width:43%;display:inline-block;" src="https://img30.360buyimg.com/pop/jfs/t1/218863/3/8785/1707784/61c46ca0Ef1e882a8/933a55b36cef3a50.png">
    <img style="width:43%;display:inline-block" src="https://img30.360buyimg.com/pop/jfs/t1/223724/29/1134/887060/61c46cd9Ed668fd05/aa1797d848878136.png">
</div>
1. 环境

- Centos7
- node v14.18.2
- npm 6.14.15
- ql面板v2.10.2(非必须,添加/更新CK要ql2.9+)
- faker3(非必须)

2.安装nodejs
- ```
    cd /usr/local && mkdir node && cd node

    yum install wget && wget https://npmmirror.com/mirrors/node/v14.18.2/node-v14.18.2-linux-x64.tar.xz

    tar -xJvf node-v14.18.2-linux-x64.tar.xz
  ```
- 编辑 ~/.bash_profile ⽂件，在⽂件末尾追加如下信息:
    `export PATH=/usr/local/node/node-v14.18.2-linux-x64/bin:$PATH`
- 刷新环境变量，使之⽣效：`source ~/.bash_profile`
- `node -v`和`npm -v`均有版本信息输出即可
- `npm i pm2 -g` 安装pm2来管理进程

3.安装相关依赖和拉取代码
-   ```
    yum install git pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
    ```
- 拉取代码
- `cd /home && git clone https://github.com/hxianseng/push-wechaty-bot.git`
- `cd push-wechaty-bot`
- `npm install puppeteer --unsafe-perm=true --allow-root`
- `npm i`
- 注意看有没有报错
- 在build/config/index.js中填写相关信息
- 测试运行，在build目录下执行`node index.js`,出现下图打开 `http://你的IP:你的端口/api/v1/qrcodeImage` 扫描二维码登录(记得安全组方行端口，装了宝塔的也要在宝塔放行)
    ![](https://img30.360buyimg.com/pop/jfs/t1/142409/34/24460/5803/61c313b8E26aa2fe2/c18f8d53b4fb6dc1.png)
    扫码之后出现下图代表登录成功:
    ![](https://img30.360buyimg.com/pop/jfs/t1/174696/15/24069/11469/61c31657E64c1ed92/ef9233bcf6a3658b.png)
- Ctrl+C停止，并回到push-wechaty-bot目录下，用pm2管理进程
- `pm2 start build/index.js`
- `pm2 logs` 可以查看日志输出

4.ql修改:(找不到要修改的地方到文件中搜索相关文字)


- sendNotify.js ==> 在=====go-cqhttp=====通知设置区域 上面或者下面加上:
    ```//=======================================push-wechaty-bot===========================================
    // push-wechaty-bot的build/config/index.js下你配置的token
    let PUSH_WECHATY_BOT_TOKEN = '';

    // http://你的IP:端口/api/v1/send
    let PUSH_WECHATY_BOT_URL = '';
    ```
    ![](https://img30.360buyimg.com/pop/jfs/t1/176525/14/23000/23472/61c31d7bEea5dce05/e3d3e0f22e6278ec.png)
- sendNotify.js ==>在文件末尾 module.exports = { 的上一行添加下面的函数
  ```
    //push-wechaty-bot
    async function wechatyNotify(userName, text, desp, time = 2100) {
        return new Promise((resolve) => {
            if (PUSH_WECHATY_BOT_TOKEN) {
                const body = {
                    token: `${PUSH_WECHATY_BOT_TOKEN}`,
                    name: `${userName}`,
                    content: `${text}\n${desp}`
                };
                const options = {
                    url: PUSH_WECHATY_BOT_URL,
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': ' application/json',
                    },
                    timeout,
                };
                setTimeout(() => {
                    $.post(options, (err, resp, data) => {
                        try {
                            data = JSON.parse(data);
                            if(data.status == 200){
                                console.log(userName + '推送到个人微信:' + data.message)
                            }else{
                                console.log(userName + '推送到个人微信:' + data.message);
                            }
                        } catch (e) {
                            $.logErr(e, resp);
                        } finally {
                            resolve(data);
                        }
                    });
                }, time);
            }
            else {
                resolve();
            }
        });
    }
    ```

- sendNotify.js ==> 末尾
    ```
                module.exports = {
                    sendNotify,
                    BARK_PUSH,
                    //导出这个函数
                    wechatyNotify
               };
    ```
    ![](https://img30.360buyimg.com/pop/jfs/t1/201728/1/19697/4164/61c31ca3Eb0a60560/569f7bd1121ade22.png)

- 一对一推送到微信(以shufflewzc_faker3_jd_bean_change_new.js京东资产变动通知 为例) 在 await showMsg(); 的下一行添加: 
    ```
    await notify.wechatyNotify(`${$.UserName}`, `${$.name}`, `${ReturnMessage}`);
    ```
    ![](https://img30.360buyimg.com/pop/jfs/t1/207072/22/13582/18344/61c31c49Ece5900a1/eea4e19a812d0f57.png)

## 常见问题处理
- ubuntu 下载 puppeteer 失败
  ```
  apt-get install  gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
  ```
- Failed to download Chromium rxxx 的问题
    ```
    ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.{ Error: read ETIMEDOUT at _errnoException (util.js:1041:11) at TLSWrap.onread (net.js:606:25) code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'read' }
    ```
    push-wechaty-bot目录下执行

    `npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`

    `sudo npm install puppeteer --unsafe-perm=true --allow-root`


