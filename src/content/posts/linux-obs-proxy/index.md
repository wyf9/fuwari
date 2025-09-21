---
title: 在 Linux 上解决 OBS 直播推流不走代理的问题
published: 2025-09-21
description: '发现我的 OBS 连 Twitch 服务器既不走系统代理也不走 TUN, 在 Grok 的推荐下发现了 GOST 反代工具 (同时适用于 Windows / Linux)'
image: './0-pic.png'
tags: ['Linux', 'Ubuntu', 'OBS', '反向代理']
category: '记录'
draft: false
lang: ''
---

# 前言

> *可直接跳转到: [# (成功) GOST](#成功-gost)*

最近因为 Clash Verge 占用太大, 切换到了 Mihomo Core, 但发现 OBS 直播连不上了:

![obs 连接失败](./1-cannot-connect.png)

但问题是: 我既开了系统代理, 也开了 TUN (`tun: enable: true`), **但 OBS 就是不用**

在询问 Grok 后, 我得到了两种方案: **Proxychains** 和 **GOST**

![grok's answer](./2-grok-answer.png)

> [!TIP]
> https://grok.com/share/c2hhcmQtNA%3D%3D_22494f12-c044-4fcb-9b48-0ca6dfed06e1

# (失败) Proxychains

既然 Grok 都说它是最流行的代理工具了, 当然要试试

安装很简单:

```bash
sudo apt update
sudo apt install proxychains -y
```

接下来编辑 `/etc/proxychains.conf` (替换 `11451` 为你的混合代理端口):

![更改端口](./3-change-port.png)

一切进行得很顺利, 使用 `proxychains obs` 启动, 然后炸了:

![无法连接 (dns)](./4-failed.png)

我先后尝试了四种方式解决:

1. 关掉 Proxy DNS requests

![proxy dns](./5-proxy-dns.png)

2. 改成 HTTP 代理

![http proxy](./6-http-proxy.png)

3. 取消环境变量 (`xxx_proxy`)

![unset env](./7-unset-env.png)

4. 关掉 TUN

无果, 只好放弃这个方案.

## (成功) GOST

::github{repo="go-gost/gost"}

GOST 是用 Go 编写的安全隧道软件, 国人维护, 有很多代理相关的功能:

![gost 功能](./8-gost.png)

首先打开 **[Releases](https://github.com/go-gost/gost/releases/latest)**, 下载你系统版本的压缩包

解压并将 `gost` 复制到 `/usr/bin/`

```bash
tar -zxvf gost_3.2.4_linux_amd64.tar.gz # 3.2.4 -> your version
rm LICENSE README.md README_en.md
sudo mv gost /usr/bin/
```

使用下面的命令启动隧道:

```bash
gost -L=tcp://:1935/hkg06.contribute.live-video.net:1935 -F=socks5://127.0.0.1:11451
```

> [!IMPORTANT]
> 替换 `:11451` 为你的 soocks 监听端口
> 直播 rtmp 服务器地址 (Twitch) 在 https://ingest.twitch.tv/ingests 查找

> 看到如下提示即为成功启动

![start success](./9-started.png)

接下来, 打开 OBS 设置 -> 直播

- **服务器**改为 `指定自定义服务器...`
- **自定义服务器**改为 `rtmp://127.0.0.1:1935/app/`

![obs settings](./10-obs-setting.png)

保存设置, 点击 `开始直播` 应该就能正常串流了
