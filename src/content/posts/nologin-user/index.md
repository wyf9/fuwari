---
title: (服务器权限控制必备) 快速创建不能登录的用户！
published: 2025-12-07
description: 一个小脚本，帮你快速在服务器创建给应用部署使用的无法登录用户，轻松实现权限管理 (实际上是自用?)
image: ""
tags:
  - Bash
  - 脚本
  - Linux
  - 服务器
category: 记录
draft: true
lang: ""
---
# 效果


# 一键安装脚本

```bash
# 1. 创建脚本
sudo tee /usr/bin/nologin-user > /dev/null <<'ENDINST'
#!/usr/bin/env bash

set -euo pipefail

CONFIG="/etc/nologin-user.conf"
GID="1919810"
BASE="/home/apps"

usage() {
    cat <<EOF
用法: $(basename "$0") <命令> [参数]

命令:
  init                    初始化（创建 apps 组和 /home/apps）
  add <user> <uid>        创建 nologin 服务账号
  del <user>              删除账号及家目录（危险！会二次确认）
  run <user> <cmd...>     以该用户身份执行命令
  enable <user>           临时允许登录（shell → bash）
  disable <user>          禁止登录（shell → nologin）
  list                    列出所有 nologin 服务账号
  check                   检查还有哪些服务账号能登录（审计神器）

示例:
  sudo $(basename "$0") add payment 1919811
  sudo $(basename "$0") run payment /app/bin/start.sh
  sudo $(basename "$0") enable payment    # 调试用
EOF
    exit 1
}

confirm() { read -rp "$1 [y/N]: " yn; [[ $yn =~ ^[Yy]$ ]]; }

ensure_init() {
    [[ -f "$CONFIG" ]] || { echo "未初始化，请先运行: sudo $(basename "$0") init"; exit 1; }
}

init() {
    sudo groupadd -f --gid "$GID" apps
    sudo mkdir -p "$BASE"
    sudo touch "$CONFIG"
    echo "初始化完成：apps(gid=$GID) + $BASE"
}

add() {
    ensure_init
    local u=$1 uid=$2
    id "$u" &>/dev/null && { echo "用户 $u 已存在"; exit 1; }
    getent passwd "$uid" &>/dev/null && { echo "UID $uid 已被占用" && exit 1

    sudo useradd -M --gid apps --shell /sbin/nologin --uid "$uid" "$u"
    sudo mkdir -p "$BASE/$u"
    sudo chown "$u":apps "$BASE/$u"
    sudo chmod 700 "$BASE/$u"
    echo "创建成功: $u (uid=$uid)  家目录: $BASE/$u"
}

del() {
    ensure_init
    local u=$1 home=$(getent passwd "$u" | cut -d: -f6)
    id "$u" &>/dev/null || { echo "用户 $u 不存在"; exit 1; }
    confirm "确认删除用户 $u 及其家目录 $home ？此操作不可恢复！" || exit 0

    sudo pkill -u "$u" &>/dev/null || true
    sudo userdel -f "$u" || sudo userdel "$u"
    [[ -d "$home" ]] && sudo rm -rf "$home"
    echo "已删除用户 $u"
}

run() {
    ensure_init
    local u=$1; shift
    id "$u" &>/dev/null || exit 1
    sudo -u "$u" "$@"
}

enable() {
    ensure_init
    sudo usermod -s /bin/bash "$1"
    echo "$1 已允许登录（临时调试用，记得用完 disable）"
}

disable() {
    ensure_init
    sudo usermod -s /sbin/nologin "$1"
    echo "$1 已禁止登录"
}

list() {
    awk -F: -v base="$BASE" '$6 ~ "^" base ".*" && $7 == "/sbin/nologin" {printf "%-15s %s  %s\n", $1, $3, $6}'
}

check() {
    echo "警告：以下服务账号（UID≥1000）仍可登录，请处理！"
    awk -F: '$3>=1000 && $7!="/sbin/nologin" && $7!="/bin/false" && $7!="/usr/sbin/nologin" {print "  → " $1 "  shell=" $7}'
}

# 主入口
case "${1:-}" in
    init)    init ;;
    add)     [[ $# -eq 3 ]] && add "$2" "$3" || usage ;;
    del)     [[ $# -eq 2 ]] && del "$2" || usage ;;
    run)     [[ $# -ge 3 ]] && run "${2}" "${@:3}" || usage ;;
    enable)  [[ $# -eq 2 ]] && enable "$2" || usage ;;
    disable) [[ $# -eq 2 ]] && disable "$2" || usage ;;
    list)    list ;;
    check)   check ;;
    *)       usage ;;
esac
ENDINST
```

# 源脚本

可手动复制到 `/usr/bin/文件名` 并给予执行权限 (`+x`).

```bash
#!/usr/bin/env bash

set -euo pipefail

CONFIG="/etc/nologin-user.conf"
GID="1919810"
BASE="/home/apps"

usage() {
    cat <<EOF
用法: $(basename "$0") <命令> [参数]

命令:
  init                    初始化（创建 apps 组和 /home/apps）
  add <user> <uid>        创建 nologin 服务账号
  del <user>              删除账号及家目录（危险！会二次确认）
  run <user> <cmd...>     以该用户身份执行命令
  enable <user>           临时允许登录（shell → bash）
  disable <user>          禁止登录（shell → nologin）
  list                    列出所有 nologin 服务账号
  check                   检查还有哪些服务账号能登录（审计神器）

示例:
  sudo $(basename "$0") add payment 1919811
  sudo $(basename "$0") run payment /app/bin/start.sh
  sudo $(basename "$0") enable payment    # 调试用
EOF
    exit 1
}

confirm() { read -rp "$1 [y/N]: " yn; [[ $yn =~ ^[Yy]$ ]]; }

ensure_init() {
    [[ -f "$CONFIG" ]] || { echo "未初始化，请先运行: sudo $(basename "$0") init"; exit 1; }
}

init() {
    sudo groupadd -f --gid "$GID" apps
    sudo mkdir -p "$BASE"
    sudo touch "$CONFIG"
    echo "初始化完成：apps(gid=$GID) + $BASE"
}

add() {
    ensure_init
    local u=$1 uid=$2
    id "$u" &>/dev/null && { echo "用户 $u 已存在"; exit 1; }
    getent passwd "$uid" &>/dev/null && { echo "UID $uid 已被占用" && exit 1

    sudo useradd -M --gid apps --shell /sbin/nologin --uid "$uid" "$u"
    sudo mkdir -p "$BASE/$u"
    sudo chown "$u":apps "$BASE/$u"
    sudo chmod 700 "$BASE/$u"
    echo "创建成功: $u (uid=$uid)  家目录: $BASE/$u"
}

del() {
    ensure_init
    local u=$1 home=$(getent passwd "$u" | cut -d: -f6)
    id "$u" &>/dev/null || { echo "用户 $u 不存在"; exit 1; }
    confirm "确认删除用户 $u 及其家目录 $home ？此操作不可恢复！" || exit 0

    sudo pkill -u "$u" &>/dev/null || true
    sudo userdel -f "$u" || sudo userdel "$u"
    [[ -d "$home" ]] && sudo rm -rf "$home"
    echo "已删除用户 $u"
}

run() {
    ensure_init
    local u=$1; shift
    id "$u" &>/dev/null || exit 1
    sudo -u "$u" "$@"
}

enable() {
    ensure_init
    sudo usermod -s /bin/bash "$1"
    echo "$1 已允许登录（临时调试用，记得用完 disable）"
}

disable() {
    ensure_init
    sudo usermod -s /sbin/nologin "$1"
    echo "$1 已禁止登录"
}

list() {
    awk -F: -v base="$BASE" '$6 ~ "^" base ".*" && $7 == "/sbin/nologin" {printf "%-15s %s  %s\n", $1, $3, $6}'
}

check() {
    echo "警告：以下服务账号（UID≥1000）仍可登录，请处理！"
    awk -F: '$3>=1000 && $7!="/sbin/nologin" && $7!="/bin/false" && $7!="/usr/sbin/nologin" {print "  → " $1 "  shell=" $7}'
}

# 主入口
case "${1:-}" in
    init)    init ;;
    add)     [[ $# -eq 3 ]] && add "$2" "$3" || usage ;;
    del)     [[ $# -eq 2 ]] && del "$2" || usage ;;
    run)     [[ $# -ge 3 ]] && run "${2}" "${@:3}" || usage ;;
    enable)  [[ $# -eq 2 ]] && enable "$2" || usage ;;
    disable) [[ $# -eq 2 ]] && disable "$2" || usage ;;
    list)    list ;;
    check)   check ;;
    *)       usage ;;
esac
```
