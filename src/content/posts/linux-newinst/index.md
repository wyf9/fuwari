---
title: Linux 新电脑开荒软件
published: 2025-10-18
description: 自用，Linux 新电脑开荒软件列表 (可参考 / 建议)
image: ""
tags:
  - Linux
  - Ubuntu
  - Apps
category: 整理
draft: false
lang: ""
---
# Linux 新电脑开荒软件

(一定程度上) 自用，可参考

其中很多软件在 Windows 也可用

> 如 失效 / 建议增加 / 建议修改 直接评论或 [联系我](https://wyf9.top/c)

## AppImage 前置

> [!IMPORTANT]
> AppImage 需要 FUSE 来运行，安装:

```bash
# Ubuntu >= 24.04
sudo add-apt-repository universe # 可能不需要 (系统默认已添加 universe 源)
sudo apt install libfuse2t64
```

**其他版本说明**: https://github.com/AppImage/AppImageKit/wiki/FUSE#install-fuse

## Flatpak 前置

```bash
sudo apt install flatpak
sudo apt install gnome-software-plugin-flatpak
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

**其他版本说明**: https://flatpak.org/setup/

# Ubuntu 特供

## **去 Snap**

✅

```bash
# 1. 删除 Snapd (以及所有 snap 包)
sudo apt purge snapd -y
sudo apt autoremove -y
# 2. 防止 Snapd 被重新安装
echo 'Package: snapd
Pin: release a=*
Pin-Priority: -10

Package: *snap*
Pin: release a=*
Pin-Priority: -10' | sudo tee /etc/apt/preferences.d/nosnap
```

> [!TIP]
> 细节 / 分步教程见此文: [Ubuntu without Snap](../ubuntu-nosnap)

## **Firefox & Thunderbird PPA**

✅

```bash
# 1. 添加 Mozilla PPA
sudo add-apt-repository ppa:mozillateam/ppa -y
# 2. 固定 Firefox & Thunderbird 版本
echo 'Package: firefox*
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 32767

Package: thunderbird*
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 32767' | sudo tee /etc/apt/preferences.d/mozillateamppa
# 3. 安装 PPA 版 Firefox & Thunderbird
sudo apt install firefox thunderbird thunderbird-gnome-support -y --allow-downgrades
```

## Unsnap

> 快速将 *(部分)* Flatpak 包迁移到 Snap 包

https://github.com/popey/unsnap

# 社交软件

## **QQ**

✅

https://im.qq.com/linuxqq/index.shtml

- deb
- rpm
- AppImage

## **Discord**

✅

https://discord.com/

- deb
- bin

## 微信

https://linux.weixin.qq.com/

- deb
- rpm
- AppImage

## **AyuGram Desktop**

✅

> ~~高德地图 (x)~~ TG 的桌面端 Fork, 增加了一些实用功能 (部分违反 ToS)

https://github.com/AyuGram/AyuGramDesktop

- [aur-src](https://aur.archlinux.org/packages/ayugram-desktop)
- [aur-bin](https://aur.archlinux.org/packages/ayugram-desktop-bin)
- [Flatpak](https://github.com/0FL01/AyuGramDesktop-flatpak)
- [build](https://github.com/AyuGram/AyuGramDesktop/blob/dev/docs/building-linux.md)

# 办公软件

## **飞书**

✅

https://www.feishu.cn/download

- deb
- rpm

## **LibreOffice**

✅

> 开源的 MS Office 实现

https://zh-cn.libreoffice.org/download/libreoffice/

- deb
- rpm
- Flatpak

## **Visual Studio Code**

✅

https://code.visualstudio.com/Download

- deb
- rpm
- bin

## **Obsidian**

✅

> Markdown 编辑器

https://obsidian.md/download

- deb
- AppImage
- Flatpak

# 娱乐软件

## **bilibili-linux**

✅

>B 站客户端的 Linux 移植版

https://github.com/msojocs/bilibili-linux/releases

- AppImage
- deb
- rpm
- bin

## **OBS**

✅

https://obsproject.com/download#linux

- deb
- Flatpak

### **obs-composite-blur**

✅

>马赛克插件

https://github.com/FiniteSingularity/obs-composite-blur?tab=readme-ov-file#installation

- Flatpak
- bin

## **PrismLauncher**

✅

>一个全平台的 Minecraft Java 启动器

https://prismlauncher.org/download/

- deb
- rpm
- aur
- Flatpak
- bin
- ...

## Steam

https://store.steampowered.com/about/

- deb
- ...

## 音视频软件

## **OpenShot**

✅

>开源, 低性能机器友好的视频编辑器

https://www.openshot.org/zh-hans/download/

- AppImage
- PPA

## **VLC**

✅

>全能视频播放器

https://www.videolan.org/vlc/#download

- deb
- ...

```bash
sudo apt install vlc
```

# 网络工具

## Clash Verge Rev

https://github.com/clash-verge-rev/clash-verge-rev/releases/latest

- deb
- rpm
- bin

## **Mihomo**

✅

> Clash Verge 默认核心，轻量，纯命令行

https://github.com/MetaCubeX/mihomo/releases/latest

- deb
- rpm
- bin

### 解决 `Start TUN listening error: configure tun interface: operation not permitted`

```bash
sudo setcap cap_net_bind_service,cap_net_admin=+ep $(which mihomo)
```

如你的 mihomo 在非 PATH 路径，将 `$(which mihomo)` 改为你的 mihomo 绝对路径

> Ref: https://github.com/zzzgydi/clash-verge/issues/182

# 实用工具

## **GIMP**

✅

>图片编辑器

https://www.gimp.org/downloads/

- Flatpak
- AppImage
## **Ulauncher**

✅

https://github.com/Ulauncher/Ulauncher/releases/latest

> [!TIP]
> v6 目前为 Pre-release -> https://github.com/Ulauncher/Ulauncher/releases

- deb
- bin

### **Emoji Plugin**

✅

> 一个表情插件，直接点 `EXTENSTIONS` -> `Add extensions` 粘贴下面的 repo 链接即可

https://github.com/ulauncher/ulauncher-emoji

## **LocalSend**

✅

> 一个简洁的内网文件传输工具

https://github.com/localsend/localsend/releases/latest

- deb
- AppImage
- bin

## **Snipaste**

✅

> 一个跨平台的 截图 + 贴图 工具

https://dl.snipaste.com/linux

- AppImage

## **AudioRelay**

✅

> 一个在不同设备之间传输音频的工具

https://audiorelay.net/downloads

- deb
- bin

>[!TIP]
>`libflac8`: https://launchpad.net/ubuntu/jammy/+package/libflac8
## **Waylyrics**

✅

>一个使用 Rust 编写的 Wayland 桌面歌词工具

https://github.com/waylyrics/waylyrics/blob/master/doc/INSTALLATION.md

- [Flatpak](https://flathub.org/apps/io.github.waylyrics.Waylyrics)
- bin
- aur
- build

构建 & 安装:

```bash
# 安装工具链
sudo apt-get install git nano build-essential libssl-dev libgtk-4-dev libdbus-1-dev libmimalloc-dev gettext rustup
rustup update stable
# Clone 项目
mkdir gittemp
cd gittemp
git clone https://github.com/waylyrics/waylyrics.git
cd waylyrics
# 默认设置编译
export WAYLYRICS_THEME_PRESETS_DIR=/usr/share/waylyrics/themes
cargo build --release --locked --target-dir target
# 复制产物
sudo cp ./target/release/waylyrics /usr/bin/
sudo chmod 755 /usr/bin/waylyrics
# 编译 schemas
sudo cp ./metainfo/io.github.waylyrics.Waylyrics.gschema.xml /usr/share/glib-2.0/schemas/
sudo glib-compile-schemas /usr/share/glib-2.0/schemas/
# 汉化
cd ./locales/zh_CN/LC_MESSAGES/
msgfmt waylyrics.po
sudo cp ./messages.mo /usr/share/locale/zh_CN/LC_MESSAGES/waylyrics.mo
# 设置图标
cd ../../..
sudo cp -r ./res/icons/* /usr/share/icons/
# 设置桌面图标
sudo cp ./metainfo/io.github.waylyrics.Waylyrics.desktop /usr/share/applications/
sudo chmod 644 /usr/share/applications/io.github.waylyrics.Waylyrics.desktop
# 设置主题
sudo mkdir -p /usr/share/waylyrics/themes/
sudo cp -r ./themes/* /usr/share/waylyrics/themes/
sudo chmod 755 -R /usr/share/waylyrics/themes/
# 设置软件详情
sudo cp ./metainfo/io.github.waylyrics.Waylyrics.metainfo.xml /usr/share/metainfo/
sudo update-desktop-database
```

>From https://github.com/waylyrics/waylyrics/blob/master/doc/BUILD_GUIDE_UBUNTU.zh_cn.md

## **Bottles**

✅

>Wine / Proton 兼容层管理器，用来运行 WIndows 应用

https://github.com/bottlesdevs/Bottles

- Flatpak

### 功能授权

```bash
# 创建桌面启动项
flatpak override com.usebottles.bottles --user --filesystem=xdg-data/applications
# 添加 Steam 库中应用 / 游戏
flatpak override com.usebottles.bottles --filesystem=~/.local/share/Steam
flatpak override com.usebottles.bottles --filesystem=~/.var/app/com.valvesoftware.Steam/data/Steam
```

> From https://docs.usebottles.com/bottles/programs

### ProtonUp-Qt

https://github.com/DavidoTek/ProtonUp-Qt

用于为 Bottles / Steam 等工具安装 GE-Proton
## **MusicPlayer2**

✅

>Windows 下的全能本地音乐播放器 (我主要用来下歌词 & 封面)

>[!IMPORTANT]
>需要 Wine / Proton 兼容层 <br/>
>[Here](#bottles)

https://github.com/zhongyang219/MusicPlayer2/releases/latest

- *exe*

## **RustDesk**

✅

> 远控软件

https://github.com/rustdesk/rustdesk/releases/latest

- deb
- rpm
- aur
- Flatpak
- AppImage

## **Syncthing**

> 多设备分布式文件同步工具

https://github.com/syncthing/syncthing/releases/latest

- deb
- bin
- ...

```bash
# Add the release PGP keys:
sudo mkdir -p /etc/apt/keyrings
sudo curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
# Add the "stable-v2" channel to your APT sources:
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable-v2" | sudo tee /etc/apt/sources.list.d/syncthing.list
# Update and install syncthing:
sudo apt-get update
sudo apt-get install syncthing
```

> From https://apt.syncthing.net/

# 命令行工具

## **q**

✅

> 一个轻量，易用的 DNS 客户端，支持 TCP, UDP, DoT, DoH, DoQ, oDoH

https://github.com/natesales/q/releases/latest

- deb
- rpm
- bin

## **scrcpy**

✅

> 基于 (并内置) adb 的 Android 屏幕控制工具

https://github.com/Genymobile/scrcpy/releases/latest

- bin

## **tcping**

✅

> 顾名思义, 使用 tcp 协议的 ping

https://github.com/pouriyajamshidi/tcping/releases/latest

- deb
- bin

## **gh**

✅

> 还算好用的 GitHub 官方 CLI

https://github.com/cli/cli/blob/trunk/docs/install_linux.md

- deb
- rpm
- dnf
- bin

### **gh-gonest**

✅

> 一个插件，用于快速清理从 已删除组织 / 用户 / 仓库 发出的 "幽灵通知" (在网页客户端无法清除)

https://github.com/emmanuel-ferdman/gh-gonest

```bash
gh extension install emmanuel-ferdman/gh-gonest
# 运行: gh gonest
```

### **gh-p**

✅

> 自制插件，用于快速 Clone Pull Request 的更改到本地，方便进行进一步修改 & 直接推送到 PR 作者分支

https://github.com/wyf9/gh-p

```bash
gh extension install wyf9/gh-p
# 运行: gh p
```

## **Cloudflared**

✅

> Cloudflare Tunnel 服务端 & 客户端

https://github.com/cloudflare/cloudflared/releases/latest

- deb
- rpm
- bin

或者使用 pkg repo:

https://pkg.cloudflare.com/

```bash
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared noble main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

### 提示 `failed to sufficiently increase receive buffer size`

```ini
# /etc/sysctl.conf
net.core.rmem_max=7500000
net.core.wmem_max=7500000
```

```bash
sudo sysctl -p
```

> https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes

### 提示 `Group ID X is not between ping group X to X`

```ini
# /etc/sysctl.conf
net.ipv4.ping_group_range=0 114514
```

```bash
sudo sysctl -p
```

## **gost**

✅

>Go 语言实现的安全隧道

https://github.com/go-gost/gost/releases/latest

- bin

## **Thefxxk**

✅

>一个在你打错命令暴怒时可以输入 `f**k` 修正的工具

https://github.com/nvbn/thefuck?tab=readme-ov-file#installation

```bash
sudo apt install thefuck
```

编辑 `~/.bashrc` 追加:

```bash
# ~/.bashrc
eval $(thefuck --alias)
```
# 编程语言

## **Python** (uv)

✅

https://docs.astral.sh/uv/getting-started/installation/

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

使用 uv 安装:

```bash
uv python install 3.13
```

## **NodeJS** (nvm)

✅

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

```bash
curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

使用 nvm 安装:

```bash
nvm install 25
```

安装 pnpm:

```bash
npm i -g pnpm
```

换源:

```bash
npm config set registry https://registry.npmmirror.com
```

### **PM2**

✅

> 进程管理器

```bash
pnpm i -g pm2
pm2 startup # 启用自启, 执行执行这行命令后输出的命令 (?)
```

## **Java** (Azul)

✅

https://www.azul.com/downloads/?os=linux&package=jre#zulu
# 杂项

## 防 QQ 快速登录协议盗号

✅

编辑 `/etc/hosts` 写入 (追加不是覆盖):

```
# /etc/hosts
# anti qq fastlogin spamming
0.0.0.0 localhost.ptlogin2.qq.com
:: localhost.ptlogin2.qq.com
```

## 调整 Swap 文件大小

✅

```bash
# 先查看现有 swap 文件的位置
sudo swapon --show
```

```bash
sudo swapoff /swap.img
sudo rm /swap.img
sudo fallocate -l 12G /swap.img
sudo chmod 600 /swap.img
sudo mkswap /swap.img
sudo swapon /swap.img
sudo swapon --show # 查看是否生效
```

> [!IMPORTANT]
> 将上面的 `/swap.img` 改为你看到 Swap 文件的路径, `12G` 改为你想要的 Swap 大小 <br/>
> 查看 `/etc/fstab` 是否有此文件的记录, 如果没有须手动添加 (注意不要删除其他记录):

```bash
# /etc/fstab
/swap.img none swap sw 0 0
```

### 设置 Swap 使用频率

`vm.swappiness` 值在 0 - 100 之间，值越大使用越频繁

```ini
# /etc/sysctl.conf
vm.swappiness=20
```

```bash
sudo sysctl -p
```

<!-- ## AppArmor 管理

```bash
sudo apt install apparmor-utils
```

禁用 `firefox` 的 AppArmor 配置 (默认配置会阻止 Firefox 访问一些文件):

```
sudo aa-disable firefox
```
-->