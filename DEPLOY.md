# 🌐 全球签证攻略 - 部署指南

## 部署包已就绪

项目已完成构建，静态文件位于：
```
app/dist/
visa-guide-deploy.zip  (可直接拖拽上传的压缩包)
```

---

## 方案一：Netlify（⭐ 最简单，30秒上线）

**无需命令行，直接拖拽：**

1. 打开 https://app.netlify.com/drop
2. 将 `app/dist` 文件夹（或 `visa-guide-deploy.zip`）**直接拖入**页面
3. 等待 3-5 秒，自动获得一个 `*.netlify.app` 域名
4. 🎉 上线完成！

> 可在 Netlify 控制台绑定自定义域名（需域名已完成 DNS 配置）

---

## 方案二：Vercel（推荐，永久免费）

**方式 A - GitHub 部署（推荐）：**

1. 在 GitHub 创建新仓库（设为 Public）
2. 将项目代码推送至仓库：
   ```bash
   cd app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/visa-guide.git
   git push -u origin main
   ```
3. 打开 https://vercel.com/new
4. 点击 "Import Git Repository"，选择刚创建的仓库
5. 点击 Deploy → 等待约 30 秒
6. 🎉 获得 `visa-guide.vercel.app` 免费域名

**方式 B - Vercel CLI（需先登录）：**
```bash
cd app
npx vercel --prod
```

---

## 方案三：Cloudflare Pages（极速 CDN）

1. 登录 https://pages.cloudflare.com
2. 创建项目 → 选择 "上传静态资源"
3. 上传 `app/dist` 文件夹
4. 完成！获得 `*.pages.dev` 域名

---

## 方案四：GitHub Pages（免费静态托管）

1. 在 GitHub 仓库设置中启用 Pages
2. 选择 `main` 分支和 `/ (root)` 目录
3. 等待 1-2 分钟，网站在 `https://你的用户名.github.io/仓库名` 上线

> ⚠️ 需要先在项目中配置 base URL：
> Vite 配置文件需添加 `base: "/仓库名/"`

---

## 自定义域名绑定（可选）

所有平台都支持绑定自己的域名（如 `visa.yourdomain.com`）：

1. 在你的域名服务商（如阿里云/腾讯云）添加 DNS 记录：
   - **CNAME** 记录：`www` → 指向平台提供的域名
2. 在平台控制台填入你的域名，完成验证

---

## 后续更新

每次修改代码后：
```bash
cd app
npm run build      # 重新构建
```

重新上传 `dist/` 文件夹即可。

---

## 文件说明

| 文件 | 用途 |
|------|------|
| `dist/` | 编译后的静态网站（上线用这个） |
| `vercel.json` | Vercel 部署配置 |
| `netlify.toml` | Netlify 部署配置 |
| `visa-guide-deploy.zip` | 可直接拖拽上传的压缩包 |
