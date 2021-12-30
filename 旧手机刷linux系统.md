# 前提条件
https://wiki.postmarketos.org/wiki/Devices
里的Main、Community里要有你的设备型号


​ Postmarket OS是一个基于Alpine Linux。能够安装到手机或其他移动设备上。当然linux deploy也可以使用SSH，但linux deploy运行在容器里.使用上会有些限制，比如docker启动不了。

- 不要直接刷Postmarket提供的镜像，docker启动不了

- 准备一台ubuntu的虚拟机，（别的也可以，但要能连上手机，要用fastboot把镜像刷进手机）
- 科学环境  
  
虚拟机操作：
```
//安装依赖
sudo apt install python3 git fastboot
sudo apt install python3-pip

//安装pmbootstrap并更新
pip3 install --user pmbootstrap

//更新
pip3 install --user --upgrade pmbootstrap
pmbootstrap pull

```
```
//初始化pmbootstrap

pmbootstrap init

下面没提到的可以直接回车

Choose your target device vendor选项
选择设备的供应商和代码(比如小米的就填 xiaomi 它上面有提示)

Device codename选项
这里是选择型号(我的是小米note2 填 scorpio)

Username选项
设备登录用户，后面你连ssh要用到，可以用默认的user

Available user interfaces选项
用户界面，到https://wiki.postmarketos.org/wiki/Devices
点到你设备的详情页去看开发者用的啥界面你就选啥界面，我小米note2
只能选Phosh，别的我都没启动成功过

后面的选项也可以直接回车了
```
```
//初始化安装pmbootstrap install
pmbootstrap install
需要漫长等待，中途可能报错就重新执行pmbootstrap install
中间会提示创建进入手机系统的新密码

```
```
刷入手机
进fastboot模式，并连接电脑，虚拟机会弹出提示，按提示接入虚拟机
pmbootstrap flasher flash_rootfs --partition userdata
pmbootstrap flasher flash_kernel

```
```
手机开机连WiFi

在手机命令行开启ssh可以密码登录，
vi /etc/ssh/sshd_config
将PasswordAuthentication 的值改为 yes ,去掉#注释

开启root登录权限
将PermitRootLogin的值改为 yes ,去掉#注释

重启ssh
sudo rc-service sshd restart
```
```
电脑同一WiFi连上ssh(ip可以在手机命令行输:ifconfig 查看)

//检测docker支持
wget https://raw.githubusercontent.com/moby/moby/master/contrib/check-config.sh
chmod 777 check-config.sh
./check-config.sh

//GenerallyNecessary选项不能有很多的missing
我的只有最后一个CONFIG_CGROUP_BPF: missing

#安装Docker
sudo apk add docker
#启动docker服务
sudo service docker start
#设置为自动启动
sudo rc-update add docker default
#创建docker用户组并把用户加入组
sudo groupadd docker
#把用户添加进docker组中
sudo gpasswd -a ${USER} docker

#docker 加速
sudo vi /etc/docker/daemon.json

{
"registry-mirrors": [
"https://dockerhub.azk8s.cn",
"https://reg-mirror.qiniu.com",
"https://registry.docker-cn.com",
"http://docker.mirrors.ustc.edu.cn",
"http://hub-mirror.c.163.com"
]
}
```
结束教程，教程可能有点不详细，不清楚的可以问我