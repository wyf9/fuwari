---
title: Windows 禁用 Bitlocker
published: 2025-11-12
description: Bitlocker 显示 "正在等待激活" 怎么办? 一行命令轻松解决!
# image: ./0-pic.png
tags:
  - Windows
  - 水
category: 记录
draft: true
lang: ""
---
# 为什么在 "记录" 类别

> [Skip](#问题)

因为是帮电脑小白的群友合并分区的时候遇到的问题，以及内容很水，只是我觉得可以记录下（

**截图已经过本人同意**:

![](1-agreement.png)

# 问题

在合并分区时发现 DiskGenius 调整不了分区大小，提示被 Bitlocker 加密:



# -help

```
PS C:\Users\guanzgong> manage-bde -help
BitLocker 驱动器加密: 配置工具版本 10.0.26100
版权所有 (C) 2013 Microsoft Corporation。保留所有权利。

manage-bde[.exe] -parameter [arguments]

描述:
    在磁盘卷上配置 BitLocker 驱动器加密。

参数列表:
    -status     提供有关支持 BitLocker 的卷的信息。
    -on         加密卷并启用 BitLocker 保护。
    -off        解密卷并关闭 BitLocker 保护。
    -pause      暂停加密、解密或擦除可用空间。
    -resume     恢复加密、解密或擦除可用空间。
    -lock       阻止访问 BitLocker 加密的数据。
    -unlock     允许访问 BitLocker 加密的数据。
    -autounlock 管理数据卷的自动解锁。
    -protectors 管理加密密钥的保护方法。
    -SetIdentifier 或 -si
                配置卷的标识字段。
    -ForceRecovery 或 -fr
                强制 BitLocker 保护的操作系统在重新启动时恢复。
    -changepassword
                修改数据卷的密码。
    -changepin  修改卷的 PIN。
    -changekey  修改卷的启动密钥。
    -KeyPackage 或 -kp
                为卷生成密钥数据包。
    -upgrade    升级 BitLocker 版本。
    -WipeFreeSpace 或 -w
                擦除卷上的可用空间。
    -ComputerName 或 -cn
                在其他计算机上运行。示例: "ComputerX", "127.0.0.1"
    -? 或 /?    显示简略帮助。示例: "-ParameterSet -?"
    -Help 或 -h 显示完整帮助。示例: "-ParameterSet -h"

示例:
    manage-bde -status
    manage-bde -on C: -RecoveryPassword -RecoveryKey F:\
    manage-bde -unlock E: -RecoveryKey F:\84E151C1...7A62067A512.bek
```

~~可以看到支持的操作还挺多的 (?~~
