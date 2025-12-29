# CodexVue

基于 Vue 3 的 Codex CLI 示例项目，用于快速体验命令行驱动的前端开发流程。页面是一个极简小博客，内置搜索、标签过滤、点赞与发布表单，适合当作 UI/交互模板继续扩展。

## 功能
- 搜索标题/标签，实时过滤文章列表
- 点击标签快速回填搜索
- 表单新增文章（内存数据，不落库）
- 点赞计数与卡片动效
- 响应式布局，移动端友好

## 技术栈
- Vue 3 + Vite
- 组合式 API + 单文件组件
- 纯 CSS 设计（含字体与渐变背景）

## 启动
```bash
npm install
npm run dev
```

## 项目结构
```
.
├─ index.html
├─ src/
│  ├─ main.js
│  ├─ App.vue
│  ├─ components/
│  │  ├─ BlogHero.vue
│  │  └─ PostCard.vue
│  └─ assets/
│     └─ styles.css
└─ vite.config.js
```

## 关键实现
- `src/App.vue` 维护文章数据、搜索状态、点赞与新增逻辑
- `src/components/BlogHero.vue` 提供搜索与发布表单
- `src/components/PostCard.vue` 渲染文章卡片与标签交互
- `src/assets/styles.css` 定义整体视觉与动效

## 常用脚本
- `npm run dev` 启动本地开发服务器
- `npm run build` 构建生产包
- `npm run preview` 本地预览生产构建
