# 📖 我的自传

> 记录人生，珍藏回忆。每个人的故事都值得被书写。

「我的自传」是一款专注于个人人生记录的多端应用，帮助用户按时间轴串联人生的重要时刻，写下一本属于自己的传记。

---

## ✨ 核心特性

### 📝 专注写作体验
- 极简编辑器，最小化干扰，专注文字本身
- 支持章节标题、正文分离
- 自动保存草稿，断电不丢失

### 🔐 隐私与安全
- 完整用户认证系统（Supabase Auth）
- 每位用户只能查看和编辑自己的内容
- Row Level Security (RLS) 数据隔离

### 📱 多端适配
- 移动端优先设计，底部导航栏
- 桌面端自适应侧栏布局
- Hash 路由支持，任意环境均可运行

### 🛠 技术亮点
- **React 18** + **TypeScript** + **Vite** 构建
- **TailwindCSS** 原子化样式，快速迭代
- **Supabase** BaaS 平台：数据库 + 认证 + 实时订阅
- 无需自建服务器，降低运维成本

---

## 🚀 技术架构

```
┌──────────────────┐     ┌─────────────────┐     ┌────────────────────┐
│   前端 (React)   │────▶│  Supabase Auth  │────▶│ PostgreSQL + RLS   │
│  Vite + Tailwind │     │   (用户认证)     │     │   (数据存储)       │
└──────────────────┘     └─────────────────┘     └────────────────────┘
         │
         │ 直接调用
         ▼
  ┌──────────────────┐
  │ Supabase REST   │
  │ (CRUD 操作)      │
  └──────────────────┘
```

### 未来扩展方向
- 🤖 **AI 润色**：大模型辅助优化文字表达
- 🖼️ **多媒体支持**：图片、语音录入
- 📅 **时间轴视图**：可视化人生轨迹
- 📤 **导出 PDF/打印**：珍藏版纸质自传

---

## 📂 项目结构

```
src/
├── App.tsx              # 主应用 + Auth/Toast Context + Hash路由
├── lib/
│   └── supabase.ts     # Supabase 客户端
├── pages/
│   ├── Login.tsx       # 登录 / 注册
│   ├── Home.tsx        # 章节列表（首页）
│   ├── Reader.tsx      # 阅读章节
│   ├── Editor.tsx      # 写作 / 编辑
│   └── Profile.tsx     # 个人中心
└── components/
    ├── TopNav.tsx      # 顶部导航
    ├── BottomNav.tsx    # 底部导航
    ├── ChapterCard.tsx  # 章节卡片
    ├── EmptyState.tsx  # 空状态引导
    └── Modal.tsx        # 确认弹窗
```

---

## 🧪 快速开始

```bash
# 克隆项目
git clone https://github.com/Legengds/my-autobiography.git
cd my-autobiography

# 安装依赖
npm install

# 配置环境变量
# 复制 .env.example 为 .env，填入 Supabase 项目地址和 Key

# 启动开发服务器
npm run dev
```

---

## 🌐 在线体验

**线上地址：** https://7bokly885w0z.space.minimaxi.com

---

> _每个人的人生都是一部独一无二的故事，值得被认真记录。_
