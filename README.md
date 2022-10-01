# wx机器人

- [x] 自动同意好友申请(限搜微信号或手机号添加)

# 前提条件

- 微信号一个
- ~~微信号有web权限(https://wx.qq.com 能登陆)~~
- uos协议能用，支持所有微信号

# 更新
```
//备份配置文件
cd /root/wxbot/conf && mv config.js config.js.bak

//拉取最新代码
docker exec -it wxbot git pull

//更新依赖
docker exec -it wxbot npm i

//【填写】配置文件
vi config.js


//重启容器
docker restart wxbot

```
# 联通流量监控
- [x] 多个手机号
- [x] 短信登录
- [x] 查询流量
- [ ] 定时推送
# 配合青龙
- [x] 短信登录(maiark，nark)
- [x] ck登录
- [x] 自动对接青龙一对一通知
  - [x] 京东资产变动通知
  - [x] 京东CK检测
  - 目前支持自动对接的库:faker3
  - 其他有需要的请在下文找到TG联系我
  - 有能力的可以根据下方机器人推送接口自定义


# 推送接口
- 请求地址：http://搭建机器人的服务器ip:端口/api/v1/send_sms  (下方name为联系人的昵称)
- 请求地址：http://搭建机器人的服务器ip:端口/api/v1/send      (下方name为联系人的备注)
- 请求方式：POST
- Content-Type: application/json
- 参数 
  ```
    {
        "token":"config.js自定义的token",
        "name":"目标联系人的备注或昵称",
        "content":"内容"
    }
  ```

# 联系方式
- [TG交流](https://t.me/+16_DY1GtTT9iN2Vl)

# 效果展示
<div>
    <img style="width:43%;display:inline-block;" src="https://img30.360buyimg.com/pop/jfs/t1/218863/3/8785/1707784/61c46ca0Ef1e882a8/933a55b36cef3a50.png" alt="">
    <img style="width:43%;display:inline-block" src="https://img30.360buyimg.com/pop/jfs/t1/223724/29/1134/887060/61c46cd9Ed668fd05/aa1797d848878136.png" alt="">
    <img style="width:43%;display:inline-block" src="https://img30.360buyimg.com/pop/jfs/t1/213651/31/12429/1480848/6209005dE22620c22/1ada447f53e572da.png" alt="">
</div>

# 安装

```
//安装docker
sudo curl -sSL get.docker.com | sh

//配置国内源
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://0b27f0a81a00f3560fbdc00ddd2f99e0.mirror.swr.myhuaweicloud.com",
    "https://ypzju6vq.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
EOF

systemctl daemon-reload

systemctl restart docker

//拉取镜像
docker pull hxiansen/wxbot:latest

//创建【配置目录】
cd /root && mkdir -p wxbot/conf


//启动容器 
docker run -d \
	-v /root/wxbot/conf:/usr/wxbot/src/conf \
	--name wxbot \
	--net host \
	--restart always \
	hxiansen/wxbot:latest

//拉取最新代码
docker exec -it wxbot git pull

//更新依赖包
docker exec -it wxbot npm i

//【填写】配置文件  配置文件在你创建的【配置目录】下

//重启容器
docker restart wxbot

//浏览器打开http://IP:端口/api/v1/qrcodeImage微信扫码登陆

//有问题查看容器日志
docker logs -f wxbot
```

# 使用
- 请把机器人设置为自动通过好友请求
- 添加机器人为好友
- 发送 菜单 给机器人


