# Rethink AI

智能微信数据助手 - 用 AI 理解对话

## 在线访问

**文档站点**: https://docs-rho.vercel.app

| 页面 | 链接 |
|------|------|
| 中文首页 | https://docs-rho.vercel.app/zh |
| 英文首页 | https://docs-rho.vercel.app/en |
| 文档中心 | https://docs-rho.vercel.app/zh/docs |
| 下载页面 | https://docs-rho.vercel.app/zh/pricing |
| 登录页面 | https://docs-rho.vercel.app/zh/auth/login |

## 关于

这是 [Rethink AI](https://github.com/ai-hermes/wechat-mem0) 桌面应用的文档站点。Rethink AI 是一款基于 Electron 的智能桌面应用，通过 AI Agent 对话的方式查询和分析本地微信聊天数据。

## 功能特性

- 多语言支持 (中/英/日/法/韩/意/德/俄)
- 手机号验证码登录
- 第三方登录占位 (微信/QQ/Google)
- 文档系统
- 下载/定价页面
- SEO 优化

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + shadcn/ui
- **数据库**: Prisma + SQLite
- **国际化**: next-intl
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 初始化数据库
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 测试登录

- 手机号：任意格式
- 验证码：`123456`

## 目录结构

```
src/
├── app/[locale]/          # 国际化路由
│   ├── page.tsx           # 首页
│   ├── docs/              # 文档
│   ├── pricing/           # 下载/定价
│   ├── auth/              # 登录/注册
│   └── dashboard/         # 用户中心
├── components/            # UI 组件
├── content/               # 文档内容 (中英文 MDX)
├── messages/              # 翻译文件
└── lib/                   # 工具函数
```

## License

MIT
