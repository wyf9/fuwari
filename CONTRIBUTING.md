# 友链

## 本站信息

**名称**
```text
wyf9's Blog
```

**描述**
```text
什么都有的个人 blog?
```

**链接**
```url
https://wyf9.top
```

**图标**
 - **512x512**
   ```url
   https://wyf9.top/favicon.png
   ```
 - **192x192**
   ```url
   https://wyf9.top/favicon/android-chrome-192x192.png
   ```
 - **180x180**
   ```url
   https://wyf9.top/favicon/apple-touch-icon.png
   ```
 - **32x32**
   ```url
   https://wyf9.top/favicon/favicon-32x32.png
   ```
 - **16x16**
   ```url
   https://wyf9.top/favicon-16x16.png

## 添加友链

**请先将本站加入你的友链列表**

> 要求: 个人自行判断 <br/>
> 建议: <br/>
> 1. 网站没有违反中国大陆法律法规的内容 *(少量网络协议内容除外)* <br/>
> 2. 与我有交集 *(SiiWay Team Member -> 或许秒过)* <br/>
> 3. 至少有 3~5 篇原创文章 <br/>
> 4. **我有权随时删除友链, 个人保留所有解释权**

并 Fork 仓库, 按照以下的格式编辑 [`src/friends.ts`](./src/friends.ts):

```ts
// 请插入到文件底部 (虽然部署时会随机排序)
[
    // 其他友链
	{
		name: "SiiWay Team Home", // 网站名称
		desc: "SiiWay 团队官方主页", // 网站描述
		avatar: "https://siiway.top/favicon.png", // 网站图标
		url: "https://siiway.top", // 网站链接
	},
];
```

提交 Pull Request 等待我通过即可.

---

> Original CONTRIBUTING.md below

# Contributing

Thank you for your interest in contributing!

## Before You Start

If you plan to make major changes (especially new features or design changes), please open an issue or discussion before starting work. This helps ensure your effort aligns with the project's direction.

## Submitting Code

Please keep each pull request focused on a single purpose. Avoid mixing unrelated changes in one PR, as this can make reviewing and merging code more difficult.

Please use the [Conventional Commits](https://www.conventionalcommits.org/) format for your commit messages whenever possible. This keeps our history clear and consistent.

Before submitting code, please run the appropriate commands to check for errors and format your code.

```bash
pnpm check
pnpm format
```