# 我的自传 - 产品规格说明书

## 1. Concept & Vision

「我的自传」是一款记录人生轨迹的文字创作工具。它不只是日记，而是一本属于自己的传记——按时间轴串联人生的重要时刻，留给未来的自己一份完整的人生档案。整体风格温暖而有质感，像翻开一本泛黄的精美日记本。

**核心理念**：简单、专注、永恒。

---

## 2. Design Language

### 美学方向
温暖复古日记本风格 + 现代简约界面。米黄纸张质感背景，配合烫金点缀，营造"珍藏版个人史册"的仪式感。

### 色彩系统
```
--color-primary:    #8B7355    (温暖棕色 - 主色调，书架/木质感)
--color-secondary:  #C4A77D    (淡金 - 章节分隔/高亮)
--color-accent:     #D4AF37    (金色 - 强调/图标/重要操作)
--color-bg:         #F5F0E8    (米黄纸张背景)
--color-surface:    #FFFDF7    (纯白卡片)
--color-text:      #3D3226    (深棕文字)
--color-muted:     #8B7D6B    (淡棕辅助文字)
--color-border:    #E8DFD0    (淡边框)
--color-danger:    #C0392B    (危险操作)
```

### 字体
- 标题: `"Noto Serif SC", "Source Han Serif CN", serif` (宋体风格，庄重)
- 正文: `"Noto Sans SC", "PingFang SC", sans-serif` (清晰易读)
- 装饰: `"ZCOOL XiaoWei", serif` (可选书法风格数字)

### 空间系统
- 基础单位: 4px
- 页面边距: 16px (移动端), 32px (桌面端)
- 卡片圆角: 12px
- 阴影: `0 2px 12px rgba(139,115,85,0.08)`

### 动效哲学
- 页面切换: 左右滑动，300ms ease-out
- 卡片出现: 从下向上淡入，200ms
- 按钮反馈: scale(0.97) + 颜色变深，150ms
- 保存成功: 金色光芒闪烁动画

### 视觉资产
- 图标库: Lucide React (线条风格)
- 装饰元素: CSS绘制羽毛笔、书签、印章图形
- 无图片依赖，使用CSS渐变和SVG

---

## 3. Layout & Structure

### 页面结构

```
┌─────────────────────────────┐
│  顶部导航栏 (固定)           │
│  [logo] [标题] [用户菜单]    │
├─────────────────────────────┤
│                             │
│  主内容区域 (可滚动)         │
│                             │
│                             │
├─────────────────────────────┤
│  底部导航 (移动端) / 侧边栏  │
│  [首页] [写自传] [我的]       │
└─────────────────────────────┘
```

### 页面列表
1. **登录/注册页** - 简洁表单，背景是装饰性书法文字
2. **首页(自传列表)** - 时间轴展示所有章节
3. **阅读页** - 完整展示某一章节，支持编辑
4. **编辑页** - 专注写作界面，最小化干扰
5. **个人设置页** - 头像、昵称、登出

### 响应式策略
- 移动端(<768px): 底部Tab导航，全屏单栏
- 桌面端(≥768px): 左侧侧边栏，中央内容区，最大宽度960px居中

---

## 4. Features & Interactions

### 4.1 用户认证
- **注册**: 邮箱 + 密码，最少6位
- **登录**: 邮箱 + 密码
- **退出登录**: 清除会话，返回登录页
- **状态**: 登录后显示用户邮箱，区分登录/未登录

### 4.2 自传章节管理
- **创建章节**: 填写标题+正文，保存
- **编辑章节**: 点击章节进入编辑页，修改后保存
- **删除章节**: 二次确认后删除
- **查看章节**: 阅读模式，无编辑按钮

### 4.3 数据存储
- **Supabase PostgREST API**
- **表: `autobiography_chapters`**
  - `id`: uuid, 主键
  - `user_id`: uuid, 外键到auth.users
  - `title`: varchar(200), 章节标题
  - `content`: text, 章节正文
  - `created_at`: timestamp
  - `updated_at`: timestamp

### 4.4 交互细节
- **保存按钮**: 点击后显示loading spinner，2秒后显示"已保存 ✓"
- **自动保存**: 编辑后30秒无操作自动保存草稿（localStorage）
- **删除确认**: 弹出模态框 "确定删除《标题》吗？此操作不可恢复。"
- **空状态**: 无章节时显示引导页 "点击下方按钮，写下你的第一章"
- **加载状态**: 骨架屏 shimmer 动画

### 4.5 边界情况
- 未登录访问 → 重定向到登录页
- 保存失败 → 显示红色toast "保存失败，请重试"
- 网络断开 → 显示toast提示，数据暂存localStorage
- 内容为空 → 禁止保存，返回"请输入内容"提示

---

## 5. Component Inventory

### 5.1 TopNav 顶部导航
- 默认: 白色背景，底部细线分隔
- 桌面端: 左侧logo + 右侧用户下拉菜单
- 移动端: 中间标题 + 右侧用户图标

### 5.2 BottomNav 底部导航(移动端)
- 3个Tab: 首页(书图标) / 写自传(笔图标) / 我的(用户图标)
- 选中态: 图标变色 + 文案加粗 + 上方圆角指示器
- 高度: 56px + safe-area底部

### 5.3 ChapterCard 章节卡片
- 封面: 标题 + 创建日期 + 字数
- 悬停: 轻微上浮 + 阴影加深
- 点击: 跳转阅读页

### 5.4 Editor 编辑器
- 全屏写作模式
- 顶部: 返回按钮 + 标题输入框 + 保存按钮
- 底部: 正文字数统计
- 自动聚焦打开键盘

### 5.5 AuthForm 认证表单
- 简洁表单: 邮箱输入框 + 密码输入框 + 提交按钮
- 登录/注册切换链接
- 表单验证实时反馈

### 5.6 EmptyState 空状态
- 装饰性书本SVG
- 引导文案
- 主按钮"开始写作"

### 5.7 Toast 提示
- 位置: 顶部居中
- 类型: success(绿) / error(红) / info(蓝)
- 自动消失: 3秒

### 5.8 Modal 确认弹窗
- 半透明黑色遮罩
- 白色圆角卡片
- 取消 + 确认按钮

---

## 6. Technical Approach

### 技术栈
- **前端框架**: React 18 + Vite + TypeScript
- **样式**: TailwindCSS + CSS Variables
- **状态管理**: React Context + useReducer
- **路由**: React Router v6
- **后端**: Supabase (Auth + PostgREST + 数据库)
- **HTTP**: Supabase JS Client

### 项目结构
```
/workspace/my-autobiography/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── lib/
│   │   └── supabase.ts         # Supabase 客户端
│   ├── types/
│   │   └── index.ts             # TypeScript 类型
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── Reader.tsx
│   │   ├── Editor.tsx
│   │   └── Profile.tsx
│   ├── components/
│   │   ├── TopNav.tsx
│   │   ├── BottomNav.tsx
│   │   ├── ChapterCard.tsx
│   │   ├── Editor.tsx
│   │   ├── AuthForm.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Toast.tsx
│   │   └── Modal.tsx
│   └── contexts/
│       ├── AuthContext.tsx
│       └── ToastContext.tsx
```

### Supabase 数据表

```sql
-- 创建 autobiographies 表
create table if not exists public.autobiographies (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title varchar(200) not null default '无题',
  content text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 启用 Row Level Security
alter table public.autobiographies enable row level security;

-- 用户只能操作自己的数据
create policy "Users can CRUD own autobiographies"
  on public.autobiographies
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### API 设计
所有数据通过 Supabase JS Client 访问，无需自定义后端API：

```typescript
// 获取用户所有章节
supabase.from('autobiographies')
  .select('*')
  .order('created_at', { ascending: false })

// 创建章节
supabase.from('autobiographies')
  .insert([{ title, content, user_id }])

// 更新章节
supabase.from('autobiographies')
  .update({ title, content, updated_at: new Date() })
  .eq('id', chapterId)

// 删除章节
supabase.from('autobiographies')
  .delete()
  .eq('id', chapterId)
```

### 部署
- 前端: Vercel / 任意静态托管
- 环境变量: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
