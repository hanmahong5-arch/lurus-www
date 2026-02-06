---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments: ['prd.md', 'ux-design-specification.md', 'product-brief.md', 'project-context.md', 'bmad-gap-analysis.md']
workflowType: 'architecture'
project_name: 'lurus-www'
user_name: 'Anita'
date: '2026-02-04'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
45 个 FR 分布于 9 个领域。架构影响分析：

| FR 领域 | 数量 | 架构影响 |
|---------|------|---------|
| Navigation (FR1–7) | 7 | Navbar 组件需支持下拉菜单、IntersectionObserver 区段检测、移动端汉堡菜单、Skip Link |
| Brand (FR8–11) | 4 | 设计系统 token 驱动，ICP 备案号可配置 |
| Tech Demo (FR12–18) | 7 | CodeShowcase 新组件（CSS-only 语法着色 + 一键复制）、API 降级逻辑 |
| Product (FR19–23) | 5 | 产品卡片组件 + 截图容器 + 资产降级策略 |
| Portal (FR24–28) | 5 | 锚点导航系统、静态数据驱动（portalLinks.ts 已存在） |
| AI Chat (FR29–32) | 4 | **Conditional 插件架构** — 复用已有 7 个 Chat 子组件 + 新增 ChatPreview/ChatFloatingTrigger |
| Conversion (FR33–38) | 6 | CTA 按钮 + GitHub Stars API 集成（条件展示 + 降级） |
| Admin (FR39–42) | 4 | 数据文件集中化（src/data/）+ 内容管理工作流 |
| Analytics (FR43–45) | 3 | sendBeacon 极简埋点，零第三方依赖 |

**Non-Functional Requirements:**
30 个 NFR 驱动以下架构决策：

- **Performance (P1–P5)**: 60fps 动画、< 100ms 复制响应、Chat 动画 ≤ 300ms → 纯 CSS GPU 加速 + requestAnimationFrame
- **Security (S1–S8)**: HTTPS/HSTS/CSP/安全头 → Nginx + K8s Ingress 配置；XSS 防护 → Vue 模板自动转义
- **Accessibility (A1–A4)**: WCAG 2.1 AA → 语义 HTML + ARIA + 焦点管理 + ReducedMotion（组件契约级内建）
- **Integration Resilience (I1–I6)**: 6 个外部依赖全部有组件级降级状态机
- **Build & Deploy (B1–B7)**: TS strict + 零警告 + bundle 限制 + Lighthouse CI → 构建管线配置

**Scale & Complexity:**

- Primary domain: **Frontend SPA (Vue 3 + Vite + Static Deploy)**
- Complexity level: **Medium** — 无后端逻辑、无数据库、无认证，但有丰富交互层（Chat、动效、响应式、降级）
- Estimated components: ~20 个 Vue 组件（12 已有 + 8 新增）+ 5 个 composables（4 已有 + 1 新增）

### Technical Constraints & Dependencies

| 约束 | 来源 | 影响 |
|------|------|------|
| Vue 3.5.13 + Composition API only | project-context.md | 禁止 Options API、JSX、Mixins |
| Tailwind CSS 4.0.0 (CSS-first) | project-context.md | `@theme {}` 配置，scoped 需 `@reference` |
| Bun (dev) / npm (Docker) | project-context.md | 包管理器纪律 |
| Nginx Alpine (prod) | project-context.md | 静态文件 + SPA fallback + gzip |
| `@/*` 路径别名 | tsconfig + vite.config | 禁止深层相对路径 |
| Vite dev port 3001 | vite.config | 开发环境固定端口 |
| API proxy → api.lurus.cn | vite.config | 仅开发环境有效，生产用 VITE_API_URL |
| Chat API 无需认证 | project-context.md | 公开端点，访客可直接使用 |
| K3s + ArgoCD GitOps | project-context.md | 禁止手动 kubectl apply |
| 设计 token 已定义 | project-context.md §8.3 | Cream/Ink/Ochre + Product/Portal 色彩已在 CSS 自定义属性中 |
| Vue ~30KB gzip 基线 | 框架固有成本 | 剩余 ~120KB 给应用代码 + 依赖 |

### Cross-Cutting Concerns Identified

1. **设计系统一致性** — 所有新组件必须使用现有 token（cream/ink/ochre/fib-*），禁止 Tailwind 默认调色板
2. **性能预算** — JS < 150KB gzip → Chat Panel 需 `defineAsyncComponent` 懒加载；图片需 WebP + lazy loading
3. **无障碍** — 所有交互元素需 ARIA 标签、焦点管理、ReducedMotion 全局开关（架构级，非修补）
4. **优雅降级** — 每个外部依赖（API/Chat/Fonts/GitHub/外链）均有组件级降级状态
5. **响应式** — Mobile-first CSS、4 断点、触控目标 ≥ 44px
6. **SEO** — meta 标签 + OG + sitemap + semantic HTML（Wave 1）；SSG 预渲染（Wave 2）
7. **Wave 增量交付** — 架构需支持 Wave 1 独立发布 + Wave 2 无缝扩展

### Architecture Key Principles

1. **Chat 是插件，不是核心** — 架构必须在 Chat 完全不存在时保证 100% 功能
2. **CSS-first，JS-last** — 动效、语法着色、降级状态全部优先用纯 CSS 实现
3. **首屏极简** — 关键渲染路径仅包含 Navbar + HeroSplit + 关键 CSS
4. **Section 懒挂载预留** — useScrollReveal 同时承担动效触发和未来懒挂载
5. **字体自托管** — 消除 Google Fonts 外部依赖，改善 LCP
6. **无障碍是架构，不是修补** — 组件 props 接口内建 aria 属性
7. **零重型库** — 无 GSAP、无 Prism、无 Pinia、无 Markdown 渲染大库

### Architecture Decision Records

| ADR | 决策 | 理由 |
|-----|------|------|
| ADR-001 组件加载 | 首屏静态 + 折叠下方 defineAsyncComponent | 150KB 预算；Hero 必须即时渲染 |
| ADR-002 动效系统 | 纯 CSS transitions + IntersectionObserver composable | 零 JS 成本；ReducedMotion 一行媒体查询 |
| ADR-003 状态管理 | Composables only（无 Pinia） | 着陆页无全局状态需求；composables 已有 4 个 |
| ADR-004 SEO | Wave 1 meta + OG + sitemap；Wave 2 SSG | PRD 排除 V1 SSR/SSG |
| ADR-005 Chat 集成 | useAIChat composable 松耦合 | 统一状态源 + Chat 插件化 |

### Pre-mortem Risk Matrix

| 风险 | 预防措施 |
|------|---------|
| Bundle 超标 (>150KB) | CSS-only 方案优先；defineAsyncComponent 折叠下方组件；零重型库 |
| LCP 超标 (>2.0s) | 自托管字体 WOFF2；首屏零 API 调用；Hero 纯文字 + CTA |
| CLS > 0 | 所有图片显式 width/height + skeleton；字体预加载 + 系统回退匹配 |
| Chat 不可用 | 插件架构；unavailable 态 = 产品截图轮播（一等公民设计） |
| Wave 2 膨胀 | Section 懒挂载；图片 lazy + WebP；Portal 数据独立 JSON chunk |
| 无障碍违规 | 组件契约内建 aria；axe-core Playwright CI；ReducedMotion 全局 |
| Tailwind scoped 失效 | 组件模板规范强制 @reference；CI lint 检查 |
| Google Fonts 被墙 | 字体自托管 WOFF2 子集；font-display: swap |

### Hero Right Side Decision

**决策: ChatPreview 为主，ProductCarousel 为回退（Option A）**

- PRD 标记 Chat 为 "Conditional Must-Have" — 为它规划
- UX Direction B 是已批准的设计方向
- ChatPreview 的 `unavailable` 状态本身就是截图轮播
- Chat-first 开发对齐峰值体验设计
- HeroSplit 右侧使用 slot/条件渲染，接受任何内容组件

### First Principles Conclusions

| 假设 | 真相 | 架构推论 |
|------|------|---------|
| "这是 SPA" | 主页 = 产品，Router 仅服务次要页面 | 主页 bundle = 应用 bundle，每字节都重要 |
| "需要 Vue" | 已在生产，Chat 需要响应式 | 接受 ~30KB 基线，剩余 ~120KB 给应用 |
| "所有内容在初始 bundle" | 仅首屏需要即时渲染 | 关键路径 = Navbar + HeroSplit + 关键 CSS |
| "需要语法高亮库" | 仅 1 条 curl + 1 个 JSON 响应 | CSS-only token 着色，~5 种 token 类型，零 JS |
| "Chat 需要始终可用" | Chat 是 conditional | Chat 是插件，页面无 Chat = 100% 正常 |

## Starter Template Evaluation

### Primary Technology Domain

**Frontend SPA (Vue 3 + Vite + Tailwind CSS 4)** — 基于 PRD 和项目上下文分析确定。

### Brownfield Assessment

**lurus-www 是已有项目，不需要 Starter Template。** 项目已在生产运行，具备完整的技术栈和项目结构。

### Existing Foundation

**Language & Runtime:**
- Vue 3.5.13 + TypeScript 5.7.2 (strict mode, ES2022 target, ESNext module)
- Node 20 (Docker build) / Bun (local dev)

**Styling Solution:**
- Tailwind CSS 4.0.0 — CSS-first config (`@theme {}`)
- `@tailwindcss/postcss` 4.1.18 + `@tailwindcss/vite` 4.1.18
- PostCSS 8.4.49 + Autoprefixer 10.4.20
- Design tokens as CSS custom properties (Cream/Ink/Ochre/Product/Portal)
- Scoped styles with mandatory `@reference`

**Build Tooling:**
- Vite 6.0.7 — esbuild minification, dev port 3001
- Manual chunks: Vue + Vue Router → `vendor` chunk
- Source maps disabled in production
- API proxy: `/api` → `https://api.lurus.cn` (dev only)

**Testing Framework:**
- ⚠️ No test configuration exists — 无 vitest.config.ts、无 playwright.config.ts

**Code Organization:**
```
src/
├── components/          # 12+ Vue SFC 按分类组织
│   ├── Chat/            # 9 个子组件（AI Chat sidebar 完整系统）
│   ├── Layout/          # Navbar, Footer
│   ├── Hero/            # HeroSection
│   ├── Portal/          # PortalLinks
│   ├── Products/        # ProductShowcase
│   ├── Features/        # FeatureGrid
│   ├── Pricing/         # PricingCards
│   └── Download/        # DownloadSection
├── composables/         # 6 个状态逻辑封装
│   ├── useAIChat.ts     # Chat 编排（防抖、互斥、重试）
│   ├── useChatApi.ts    # API 通信（30s 超时、3 次重试、指数退避）
│   ├── useChatPersist.ts # LocalStorage 消息持久化
│   ├── useNetworkStatus.ts # 在线/离线检测
│   ├── useScrollReveal.ts  # IntersectionObserver 滚动动效
│   └── useTracking.ts   # sendBeacon 事件追踪
├── data/                # 静态数据文件 (portalLinks.ts)
├── pages/               # 路由页面 (Home, Pricing, Download, About)
├── router/              # Vue Router 配置（懒加载 + 平滑滚动）
├── styles/              # 全局样式 + Tailwind @theme tokens
└── types/               # TypeScript 类型定义 (chat.ts)
```

**Production Deployment:**
- Dockerfile: 多阶段构建 (node:20-alpine → nginx:alpine)
- Nginx: 静态文件 + SPA fallback + gzip + 基础安全头
- CI/CD: GitHub Actions → GHCR → ArgoCD (K3s)
- Healthcheck: wget localhost 每 30s

**SEO Baseline:**
- index.html: meta tags + OG + Twitter Card + JSON-LD 结构化数据
- 路由: hash link 平滑滚动 + 位置恢复
- main.ts: /login, /register, /docs, /console/* 外部重定向

### Codebase Corrections (vs Documentation)

| 项目 | 文档记载 | 实际状态 |
|------|---------|---------|
| Composables 数量 | 4 个 | **6 个**（多了 useScrollReveal + useTracking） |
| Chat 子组件 | 7 个 | **9 个** |
| useScrollReveal | "需新增" | **已存在**（触发 .reveal-fade-up/.reveal-stagger） |
| useTracking | 未提及 | **已存在**（sendBeacon 事件追踪） |
| Stats 区段 | "无" | **已内联在 Home.vue**（4 个指标，无计数动画） |

### Failure Mode Analysis

| 组件 | 失败模式 | 预防/修复 |
|------|---------|---------|
| Google Fonts link | 被墙/超时 → FOUT 闪烁 + LCP 延迟 | 自托管 WOFF2 子集到 dist/fonts/ |
| index.html SVG filters | Wave 2 SSG 可能剥离 | 移至 App.vue 或独立 SVG sprite |
| Nginx 安全头 | 缺 CSP + HSTS → NFR-S1/S3 不达标 | 补充 CSP + HSTS header |
| CI 流水线 | 仅 Docker build → 无质量门 | 增加 tsc + lint + test + Lighthouse CI |
| App.vue AIChatSidebar | 无条件挂载 → bundle 膨胀 | defineAsyncComponent + 条件渲染 |
| Home.vue Stats | 内联硬编码 → 不可复用 | 提取为 StatsCounter 组件 |
| main.ts redirects | 4 个硬编码 URL | 集中到 src/data/externalRoutes.ts |
| Chat 模型列表 | useAIChat 内硬编码 3 个模型 | 提取到 src/data/chatModels.ts |

### Comparative Assessment Score

| 标准 | 评分 | 说明 |
|------|------|------|
| 设计系统 | 8/10 | Token 完整，与 UX 匹配，需扩展动效/状态组件 |
| 组件架构 | 7/10 | 分类合理，需新增 ~8 组件 |
| Composables | 7/10 | 6 个已有且成熟，useScrollReveal 需增强 |
| SEO | 6/10 | meta + OG + JSON-LD 已有，缺 sitemap + robots.txt |
| 构建配置 | 6/10 | Vite + chunk 拆分可用 |
| 数据集中化 | 5/10 | portalLinks.ts 已有，其他数据散落 |
| 安全头 | 5/10 | 3 个基础头，缺 CSP + HSTS |
| 无障碍 | 4/10 | 部分 ARIA，无自动化检查 |
| 性能验证 | 3/10 | 无 Lighthouse CI、无 bundle 分析 |
| CI 质量门 | 2/10 | 仅 Docker build + push |
| 测试基础 | 0/10 | 零测试配置 |
| **综合** | **55/100** | 设计系统强，测试/CI/安全严重不足 |

### Gaps to Address (Priority Ordered)

| 优先级 | Gap | 修复行动 |
|--------|-----|---------|
| 🔴 P0 | 零测试配置 | 添加 Vitest + @vue/test-utils + Playwright + @axe-core/playwright |
| 🔴 P0 | CI 无质量门 | CI 增加 tsc + lint + test + bundle size check + Lighthouse CI |
| 🔴 P0 | 字体外部依赖 | 自托管 WOFF2 子集，移除 Google Fonts link |
| 🔴 P0 | Chat 无条件挂载 | defineAsyncComponent + 可用性条件渲染 |
| 🟠 P1 | 缺 CSP/HSTS | Nginx config 补充安全头 |
| 🟠 P1 | Stats 内联 | 提取为 Stats/StatsCounter.vue 组件 |
| 🟠 P1 | 硬编码外部 URL | 集中到 src/data/ |
| 🟠 P1 | package-lock.json 可能缺失 | 确认 Docker build 依赖文件存在 |
| 🟡 P2 | SVG filters 位置 | 移至 App.vue |
| 🟡 P2 | Chat 模型选择器 | 评估是否移除前端模型选择 |
| 🟡 P2 | sitemap + robots.txt | Vite 插件或构建脚本生成 |

### Simplification Opportunities (Occam's Razor)

| 项目 | 当前 | 简化建议 | 理由 |
|------|------|---------|------|
| Chat 模型选择 | 前端 3 模型切换 | 移除前端选择，后端决定模型 | PRD 未要求用户选模型 |
| Chat 持久化 | localStorage 跨会话 | 改为 sessionStorage 当前会话 | 着陆页 Chat 是"试驾"非持久会话 |
| /pricing 独立页面 | Vue Router 路由 | 评估是否合并入主页 | UX 已设计 Pricing 为主页区段 |
| main.ts redirects | 4 个独立 if 判断 | 合并为 redirectMap + 单循环 | 减少重复代码 |

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1. 测试策略 — Vitest + Playwright + axe-core（当前零测试配置）
2. CI 质量门 — tsc → lint → test → bundle check → Lighthouse CI
3. 安全头策略 — CSP + HSTS + 完整安全头

**Important Decisions (Shape Architecture):**
4. 静态数据组织 — src/data/ 集中管理
5. Bundle 分块策略 — vendor / chat / async-sections
6. 外部 API 统一降级模式
7. 组件 a11y 接口规范

**Deferred Decisions (Post-MVP / Wave 2):**
8. Brotli 压缩（需自编译 Nginx 模块）
9. SSG 预渲染具体方案（Wave 2 再定）
10. CDN 策略（当前单集群足够）

### Data Architecture

**ADR-006 静态数据集中化**
- **决策**: 所有静态数据集中到 `src/data/`，组件只消费不定义
- **文件规划**: portalLinks.ts, products.ts, stats.ts, chatModels.ts, externalRoutes.ts, navItems.ts
- **理由**: 对齐 PRD FR39-42（Admin 可维护性）；Step 3 识别数据集中化仅 5/10，需提升
- **影响**: 需从 main.ts 提取重定向、从 useAIChat 提取模型列表、从 Home.vue 提取 Stats

**ADR-007 数据类型安全**
- **决策**: TypeScript `interface` + `as const` 断言，零运行时验证
- **理由**: 数据全为本地硬编码，无运行时不确定性；Zod ~15KB 违反零重型库原则
- **影响**: 每个 src/data/*.ts 导出 typed const array + 对应 interface

### Authentication & Security

**ADR-008 安全头策略**

无用户认证（公开网站），安全焦点在传输层和内容策略：

| Header | Value | 理由 |
|--------|-------|------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | NFR-S3；暂不 preload（需确认所有子域均支持 HTTPS） |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.lurus.cn; font-src 'self'; frame-ancestors 'none'` | NFR-S1；`unsafe-inline` 因 Tailwind 运行时注入需要 |
| `X-Content-Type-Options` | `nosniff` | 防 MIME 嗅探 |
| `X-Frame-Options` | `DENY` | 防点击劫持 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 隐私保护 + Analytics 保留来源 |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | 最小权限 |

- **实施位置**: Nginx server block（非 K8s Ingress，因 Nginx 直接服务静态文件）

### API & Communication Patterns

**ADR-009 GitHub Stars API 集成**
- **决策**: 运行时 fetch + 静态回退值
- **方案**: 组件 mount 时 fetch GitHub API，成功则显示实时数据 + sessionStorage 缓存 1h；失败/超时（5s）则显示 src/data/ 中硬编码的回退值
- **理由**: 构建时 fetch 需 CI 网络访问且数据可能过时；运行时 + 缓存 + 回退兼顾新鲜度和可靠性

**ADR-010 外部 API 统一降级模式**
- **决策**: 所有外部依赖遵循三态模式 `loading → ready | unavailable`
- **契约**:
  - 超时: 5s（Chat API 30s 保持现有）
  - 重试: 最多 1 次（Chat 已有 3 次指数退避，保持不变）
  - 降级: 每个组件自行渲染 unavailable 态，无全局 error boundary
- **理由**: PRD I1-I6 要求组件级降级；全局 error boundary 对着陆页过度设计

### Frontend Architecture

**ADR-011 测试策略**
- **决策**: Vitest 4.x 单元/组件测试 + Playwright 1.58 E2E + @axe-core/playwright 无障碍
- **覆盖范围**:
  - **Unit (Vitest)**: composables（useScrollReveal、useTracking、useAIChat）+ src/data/ 类型正确性
  - **Component (Vitest + @vue/test-utils 2.4)**: 关键组件渲染 + props 接口 + 降级状态
  - **E2E (Playwright)**: 首页完整渲染、导航流程、Chat 开关、响应式断点
  - **a11y (axe-core)**: 每个 E2E 流程附带 axe scan
- **覆盖目标**: composables ≥ 80%，组件 ≥ 50%

**ADR-012 组件 a11y 接口规范**
- **决策**: 交互组件 props 必须包含 `ariaLabel: string`；所有可点击非 `<button>/<a>` 元素必须有 `role` + `tabindex`
- **理由**: NFR A1-A4 WCAG 2.1 AA；架构原则"无障碍是架构，不是修补"

**ADR-013 Bundle 分块策略**
- **决策**: 3 层 chunk 拆分
  - `vendor` — vue + vue-router（已有，~30KB gzip）
  - `chat` — Chat/ 目录全部组件 via defineAsyncComponent（~25-35KB gzip）
  - `app` — 首屏 + 同步组件（目标 < 80KB gzip）
  - Wave 2 新增 sections 按需异步加载
- **验证**: CI 中 `vite build` 后检查 dist/assets/*.js 总大小 < 150KB gzip

### Infrastructure & Deployment

**ADR-014 CI 质量门**
- **决策**: GitHub Actions 多阶段 pipeline
  - Stage 1: `tsc --noEmit`（零错误）
  - Stage 2: `eslint --max-warnings=0`
  - Stage 3: `vitest run --coverage`（覆盖率不低于基线）
  - Stage 4: `vite build` + bundle size check（JS < 150KB gzip, CSS < 30KB gzip）
  - Stage 5: `playwright test`（全部通过）
  - Stage 6: Lighthouse CI（Performance/Accessibility/Best Practices/SEO ≥ 90）
  - Stage 7: Docker build + push to GHCR
- **理由**: Step 3 识别 CI 质量门 2/10，P0 gap；PRD B1-B7 明确要求

**ADR-015 环境变量管理**
- **决策**: 3 层 .env 文件
  - `.env` — 默认值（commit 到 repo）
  - `.env.local` — 本地覆盖（gitignored）
  - `.env.production` — 生产值（commit 到 repo，无敏感信息）
- **命名**: 所有变量 `VITE_` 前缀
- **变量清单**: `VITE_API_URL`, `VITE_CHAT_ENABLED`

**ADR-016 Nginx 生产配置**
- **决策**:
  - **压缩**: gzip on（level 6），types: html/css/js/json/svg
  - **缓存**: 带 hash 文件名资源 `Cache-Control: public, max-age=31536000, immutable`；index.html `Cache-Control: no-cache`
  - **SPA**: `try_files $uri $uri/ /index.html`
  - **Brotli**: 延迟至 Wave 2（需自编译 Nginx 模块）

### Decision Impact Analysis

**Implementation Sequence:**
1. ADR-006/007 数据集中化 + 类型安全 → 基础重构，其他决策依赖
2. ADR-008 安全头 → Nginx 配置独立，可并行
3. ADR-015 环境变量 → 影响 Chat 条件加载
4. ADR-011 测试策略 → 需先配置再写测试
5. ADR-014 CI 质量门 → 依赖测试配置就绪
6. ADR-013 Bundle 分块 → 依赖 Chat async 重构
7. ADR-009/010 API 降级 → 组件开发时实施
8. ADR-012 a11y 接口 → 新组件开发时执行
9. ADR-016 Nginx 配置 → 部署阶段

**Cross-Component Dependencies:**
- ADR-013 (bundle) ← ADR-005 (Chat 松耦合) + ADR-001 (async loading)
- ADR-014 (CI) ← ADR-011 (测试) + ADR-013 (bundle 阈值)
- ADR-010 (降级) ← ADR-009 (GitHub Stars) 共享模式
- ADR-008 (CSP) ← ADR-016 (Nginx) 同一配置文件

## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified

12 个 AI Agent 可能做出不同选择的领域。本项目为纯前端 SPA，无数据库/后端 API 设计相关模式，聚焦前端一致性。

### Naming Patterns

**组件文件命名:**
- PascalCase：`ChatPreview.vue`, `StatsCounter.vue`, `CodeShowcase.vue`
- 按功能目录组织：`components/Chat/`, `components/Hero/`, `components/Stats/`
- 禁止缩写：`FeatureGrid` 而非 `FeatGrid`

**Composable 命名:**
- `use` + CamelCase：`useScrollReveal.ts`, `useGitHubStars.ts`
- 文件名 = 导出函数名

**数据文件命名:**
- camelCase：`portalLinks.ts`, `products.ts`, `navItems.ts`
- 无 `use` 前缀（与 composable 区分）

**CSS Class 命名:**
- kebab-case：`chat-input-wrapper`, `message-bubble`
- 状态修饰符：`.is-[state]` / `.has-[state]`（`.is-focused`, `.is-open`, `.has-messages`）
- 语义命名：描述用途而非外观（`.action-buttons` 而非 `.flex-row`）

**Props 命名:**
- camelCase：`modelValue`, `selectedModel`, `maxLength`
- Boolean 前缀：`is` / `has` / `can`（`isLoading`, `hasMessages`, `canSend`）

**Emit 命名:**
- kebab-case 动词：`send`, `retry`, `delete`, `close`
- v-model 同步：`'update:modelValue'`

**事件处理函数命名:**
- `handle` + EventName：`handleKeydown()`, `handleSend()`, `handleFocus()`

### Structure Patterns

**项目结构规则:**

```
src/
├── components/
│   └── [Feature]/              # PascalCase 功能目录
│       ├── [Component].vue     # PascalCase 组件
│       └── __tests__/          # 测试与组件同级
│           └── [Component].test.ts
├── composables/
│   ├── use[Feature].ts
│   └── __tests__/
│       └── use[Feature].test.ts
├── data/                       # 静态数据（ADR-006）
│   └── [feature].ts            # camelCase
├── pages/                      # 路由页面
│   └── [Page].vue              # PascalCase
├── types/                      # 共享类型定义
│   └── [domain].ts             # 按业务域分文件
├── styles/
│   └── main.css                # 全局 Tailwind @theme + 工具类
└── router/
    └── index.ts
e2e/                            # Playwright E2E 测试（项目根目录）
├── home.spec.ts
└── chat.spec.ts
```

**测试文件位置:**
- 单元/组件测试：`__tests__/` 与源码同级（co-location）
- E2E 测试：项目根目录 `e2e/`
- 测试文件命名：`[Source].test.ts`（单元）/ `[flow].spec.ts`（E2E）

**静态资源:**
- 字体：`public/fonts/`（自托管 WOFF2）
- 图片：`src/assets/images/`（Vite 处理）
- SVG 图标：`src/assets/icons/`（内联引入）

### Format Patterns

**TypeScript 类型定义:**
- 共享类型集中在 `src/types/[domain].ts`，组件内简单类型可内联 `<script setup>`
- 始终使用 `interface` 定义对象结构，`type` 仅用于联合类型
- 导入时必须使用 `import type`
- 禁止 `I` 前缀：`ChatMessage` 而非 `IChatMessage`

```typescript
// 正确
export interface PortalLink {
  name: string
  url: string
  description: string
}
export type MessageStatus = 'sending' | 'sent' | 'failed' | 'timeout'

// 错误
export type PortalLink = { name: string; url: string }  // 应用 interface
export interface IPortalLink { ... }                      // 禁止 I 前缀
```

**数据文件格式:**

```typescript
// src/data/products.ts
export interface Product {
  id: string
  name: string
  description: string
  icon: string
  href: string
}

export const products = [
  { id: 'gushen', name: '谷神', description: '...', icon: '...', href: '...' },
] as const satisfies readonly Product[]
```

**Null 处理:**
- `undefined` 用于可选参数/props
- `null` 用于显式空值（如 API 返回的空字段）
- 禁止 `null!` 非空断言

### Communication Patterns

**组件通信:**
- Props down, Events up（严格单向数据流）
- `defineProps<{ ... }>()` 泛型语法，禁止运行时声明
- `defineEmits<{ eventName: [payload: Type] }>()` 具名元组
- 禁止 `defineExpose`（组件不暴露内部状态）
- 禁止 `provide/inject` 传递业务数据（仅限设计系统级主题）

**Composable 契约:**
- 始终返回 Object（禁止 Array）
- State refs 在前，computed 居中，methods 在后
- Constants 在模块顶层导出，不放入 return
- Boolean ref 必须 `is`/`has`/`can` 前缀

```typescript
// 正确
export function useFeature() {
  const isLoading = ref(false)
  const data = ref<Item[]>([])
  const isEmpty = computed(() => data.value.length === 0)
  function refresh() { ... }
  return { isLoading, data, isEmpty, refresh }
}
```

**Import 顺序:**
1. Vue core（`ref`, `computed`, `onMounted`）
2. Types（`import type { ... }`）
3. Composables（`useXxx`）
4. Components（`XxxYyy.vue`）
5. Data（`import { products } from '@/data/products'`）

### Process Patterns

**三态加载模式 (ADR-010):**

所有异步操作遵循统一状态机：

```typescript
const isLoading = ref(false)
const error = ref<string | null>(null)
```

- 组件渲染基于状态：`loading` → skeleton/spinner，`error` → unavailable 态，`ready` → 正常内容
- 无全局 loading state（每个 composable/组件自管理）

**错误处理:**
- Composable 内 try/catch，暴露 `error` ref
- 组件决定渲染（错误文案、降级 UI）
- 自定义 Error class 用于可识别错误类型
- 禁止 `console.error` 裸抛（使用 useTracking 或结构化处理）
- 用户可见错误信息必须中文

**CSS 动效规则:**
- 所有动效使用 CSS `transition` 或 `@keyframes`（禁止 JS 动画库）
- 必须包含 `prefers-reduced-motion: reduce` 媒体查询
- 交互反馈 ≤ 200ms，状态转换 ≤ 300ms
- GPU 加速属性：仅 `transform` 和 `opacity`

```css
.reveal-fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal-fade-up { transition: none; opacity: 1; transform: none; }
}
```

**Style 区块规则:**
- 始终 `<style scoped>`
- 引用全局 token 时必须 `@reference "../../styles/main.css";`
- Tailwind 工具类可用于模板，自定义样式写在 scoped style
- 禁止内联 style（`:style="..."` 仅限动态计算值如进度条宽度）

### Enforcement Guidelines

**所有 AI Agent 必须遵守:**

1. 新建组件前检查 `src/components/` 是否已有同功能组件
2. 新建 composable 前检查 `src/composables/` 是否已有类似逻辑
3. 新建类型前检查 `src/types/` 是否已定义
4. Props 接口包含 `ariaLabel` 如果组件含交互元素（ADR-012）
5. 所有外部依赖组件实现 unavailable 降级渲染（ADR-010）
6. 数据文件放 `src/data/`，禁止组件内硬编码静态数据（ADR-006）
7. Import 使用 `@/*` 路径别名，禁止深层相对路径 `../../../`

**Pattern 验证:**
- ESLint + Vue plugin 自动检查命名规范
- TypeScript strict mode 确保类型安全
- CI bundle size check 防止引入重型依赖
- Code review checklist 对照本文档

### Anti-Patterns

| 禁止 | 正确做法 |
|------|---------|
| `defineProps({ msg: String })` 运行时声明 | `defineProps<{ msg: string }>()` 泛型 |
| `this.$emit('event')` Options API | `emit('event')` Composition API |
| `import Prism from 'prismjs'` 重型库 | CSS-only 语法着色 |
| `<div @click="...">` 无 role | `<button @click="...">` 或加 `role="button" tabindex="0"` |
| `.wrapper { color: red }` 无 scoped | `<style scoped>` + `@reference` |
| `ref<any>(null)` any 类型 | `ref<Item \| null>(null)` 精确类型 |
| `console.log(error)` 裸打印 | `error.value = getErrorMessage(err)` 结构化处理 |
| `provide('data', bigObject)` 业务数据 | Props/emits 传递 |

## Project Structure & Boundaries

### FR 类别到目录映射

| FR 类别 | 主要目录 | 新增/修改 |
|---------|---------|----------|
| Navigation (FR1–7) | `components/Layout/` | 增强 Navbar（下拉、区段高亮、移动菜单、Skip Link） |
| Brand (FR8–11) | `styles/main.css` + `data/` | ICP 配置化 |
| Tech Demo (FR12–18) | `components/TechDemo/` | 新建 CodeShowcase |
| Product (FR19–23) | `components/Products/` | 增强 + ProductScreenshot |
| Portal (FR24–28) | `components/Portal/` | 已有，增强锚点导航 |
| AI Chat (FR29–32) | `components/Chat/` | 增强 + ChatPreview、ChatFloatingTrigger |
| Conversion (FR33–38) | `components/Conversion/` | 新建 CTA、TrustBadge、GitHub Stars |
| Admin (FR39–42) | `data/` | 数据集中化 |
| Analytics (FR43–45) | `composables/useTracking.ts` | 已有，增强事件 |

### Complete Project Directory Structure

```
lurus-www/
├── .github/
│   └── workflows/
│       └── build-www.yaml          # CI: tsc → lint → test → build → bundle check → playwright → lighthouse → docker (ADR-014)
├── .env                            # 默认环境变量 (committed)
├── .env.production                 # 生产环境变量 (committed, no secrets)
├── .gitignore
├── Dockerfile                      # 多阶段: node:20-alpine → nginx:alpine, COPY deploy/nginx.conf
├── README.md
├── index.html                      # SPA 入口 + SEO meta + OG
├── package.json
├── tsconfig.json                   # strict, ES2022, @/* alias
├── vite.config.ts                  # port 3001, API proxy, manual chunks (ADR-013)
├── vitest.config.ts                # 新建 — Vitest 配置 (ADR-011)
├── playwright.config.ts            # 新建 — Playwright 配置 (ADR-011), webServer: vite preview
├── eslint.config.js                # 新建 — ESLint 9 flat config (ADR-014)
├── postcss.config.js               # PostCSS + Tailwind + Autoprefixer
│
├── public/
│   ├── fonts/                      # 自托管 WOFF2 字体子集 — 引用: /fonts/xxx.woff2 (绝对路径)
│   │   ├── inter-latin-400.woff2
│   │   ├── inter-latin-600.woff2
│   │   └── noto-sans-sc-400.woff2
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml                 # Wave 1 静态
│
├── deploy/
│   ├── nginx.conf                  # gzip + 缓存 + SPA fallback + 安全头 (ADR-008/016)
│   └── k8s/                        # 仅基础设施变更时修改，业务开发不涉及
│       ├── deployment.yaml
│       └── service.yaml
│
├── e2e/                            # Playwright E2E 测试 (ADR-011)
│   ├── home.spec.ts                # 首页完整渲染 + 导航流程
│   ├── chat.spec.ts                # Chat 开关 + 交互
│   ├── responsive.spec.ts          # 4 断点响应式
│   └── fixtures/
│       └── .gitkeep
│
├── src/
│   ├── main.ts                     # Vue app 创建 + Router + 外部重定向 (用 externalRoutes.ts)
│   ├── App.vue                     # Navbar + RouterView + Footer + Chat (defineAsyncComponent)
│   ├── env.d.ts                    # Vite ImportMetaEnv 类型声明 (VITE_API_URL, VITE_CHAT_ENABLED)
│   │
│   ├── assets/
│   │   ├── images/                 # 产品截图、品牌图片 (Vite 处理)
│   │   └── icons/                  # SVG 图标 (内联引入)
│   │
│   ├── components/
│   │   ├── Chat/                   # AI Chat 插件系统 (FR29–32)
│   │   │   ├── AIChatSidebar.vue       # Chat 面板主容器 (defineAsyncComponent 入口)
│   │   │   ├── ChatHeader.vue
│   │   │   ├── ChatInput.vue
│   │   │   ├── ChatMessages.vue
│   │   │   ├── ChatMessageBubble.vue
│   │   │   ├── ChatModelSelector.vue
│   │   │   ├── ChatQuickPrompts.vue
│   │   │   ├── ChatToggleButton.vue
│   │   │   ├── ChatTypingIndicator.vue
│   │   │   ├── ChatPreview.vue         # 新建 — Hero 右侧 Chat 预览 (FR29)
│   │   │   ├── ChatFloatingTrigger.vue # 新建 — 浮动触发器 (FR30)
│   │   │   └── __tests__/
│   │   │       ├── ChatPreview.test.ts
│   │   │       └── ChatFloatingTrigger.test.ts
│   │   │
│   │   ├── Layout/                 # 布局 (FR1–7, FR8–11)
│   │   │   ├── Navbar.vue              # 下拉、区段高亮、移动菜单、Skip Link
│   │   │   ├── Footer.vue              # ICP 备案、社交链接
│   │   │   └── __tests__/
│   │   │       └── Navbar.test.ts
│   │   │
│   │   ├── Hero/                   # 首屏
│   │   │   ├── HeroSection.vue         # 重构为 HeroSplit 双列布局 (非新建文件)
│   │   │   └── __tests__/
│   │   │       └── HeroSection.test.ts
│   │   │
│   │   ├── TechDemo/               # 新建 — 技术演示区 (FR12–18)
│   │   │   ├── CodeShowcase.vue        # CSS-only 语法着色 + 一键复制
│   │   │   └── __tests__/
│   │   │       └── CodeShowcase.test.ts
│   │   │
│   │   ├── Products/               # 产品展示 (FR19–23)
│   │   │   ├── ProductShowcase.vue
│   │   │   ├── ProductScreenshot.vue   # 新建 — lazy + WebP + 降级
│   │   │   └── __tests__/
│   │   │       └── ProductScreenshot.test.ts
│   │   │
│   │   ├── Portal/                 # 快速通道 (FR24–28)
│   │   │   ├── PortalLinks.vue
│   │   │   └── __tests__/
│   │   │       └── PortalLinks.test.ts
│   │   │
│   │   ├── Stats/                  # 新建 — 数据统计区
│   │   │   ├── StatsCounter.vue        # 提取自 Home.vue
│   │   │   └── __tests__/
│   │   │       └── StatsCounter.test.ts
│   │   │
│   │   ├── Conversion/             # 新建 — 转化组件 (FR33–38)
│   │   │   ├── CTASection.vue
│   │   │   ├── TrustBadge.vue          # GitHub Stars + 技术栈
│   │   │   └── __tests__/
│   │   │       └── TrustBadge.test.ts
│   │   │
│   │   ├── Features/
│   │   │   └── FeatureGrid.vue
│   │   │
│   │   ├── Pricing/
│   │   │   └── PricingCards.vue
│   │   │
│   │   ├── Download/
│   │   │   └── DownloadSection.vue
│   │   │
│   │   └── common/                 # 跨功能共享 (≥ 3 处引用才入此目录)
│   │       ├── SectionTransition.vue   # IntersectionObserver 包装器
│   │       └── StateIllustration.vue   # 空态/错误态/加载态 SVG 插图
│   │
│   ├── composables/                # 有响应式状态 (ref/computed/watch) 的逻辑
│   │   ├── useAIChat.ts            # 单例 — App.vue 唯一调用，子组件通过 props 接收
│   │   ├── useChatApi.ts           # API 通信 (30s 超时、3 次重试)
│   │   ├── useChatPersist.ts       # sessionStorage 消息持久化
│   │   ├── useNetworkStatus.ts     # 在线/离线检测
│   │   ├── useScrollReveal.ts      # IntersectionObserver 滚动动效
│   │   ├── useTracking.ts          # sendBeacon 事件追踪 (FR43–45)
│   │   ├── useGitHubStars.ts       # 新建 — GitHub Stars API + 缓存 + 回退 (ADR-009)
│   │   └── __tests__/
│   │       ├── useScrollReveal.test.ts
│   │       ├── useTracking.test.ts
│   │       ├── useAIChat.test.ts
│   │       ├── useGitHubStars.test.ts
│   │       └── useNetworkStatus.test.ts
│   │
│   ├── utils/                      # 纯函数工具 (无 ref/computed/watch)
│   │   ├── clipboard.ts            # navigator.clipboard.writeText 封装
│   │   ├── formatNumber.ts         # 数字格式化 (千分位、缩写)
│   │   └── __tests__/
│   │       ├── clipboard.test.ts
│   │       └── formatNumber.test.ts
│   │
│   ├── data/                       # 静态数据 (ADR-006) — 不定义 interface，仅 import type 使用
│   │   ├── portalLinks.ts          # 6 类 48 个链接
│   │   ├── products.ts             # 产品列表
│   │   ├── stats.ts                # 统计数字
│   │   ├── navItems.ts             # 导航菜单项
│   │   ├── externalRoutes.ts       # 外部重定向映射
│   │   └── chatModels.ts           # Chat 模型选项
│   │
│   ├── pages/                      # Home.vue 仅区段排列 + defineAsyncComponent，零业务逻辑
│   │   ├── Home.vue
│   │   ├── Pricing.vue
│   │   ├── Download.vue
│   │   └── About.vue
│   │
│   ├── router/
│   │   └── index.ts                # 懒加载路由 + 平滑滚动 + 位置恢复
│   │
│   ├── styles/
│   │   └── main.css                # Tailwind @theme tokens + 全局工具类
│   │
│   └── types/                      # 共享类型 — data/ 文件的 interface 定义在此
│       ├── chat.ts                 # Chat 相关
│       ├── navigation.ts           # NavItem, DropdownMenu
│       ├── products.ts             # Product, ProductCategory
│       └── common.ts              # 共享组件 props 接口 (AriaProps 等)
│
└── doc/
    └── process.md
```

### Architectural Boundaries

**外部 API 边界:**

| 端点 | 用途 | 组件 | 超时 | 降级 |
|------|------|------|------|------|
| `https://api.lurus.cn/v1/chat` | Chat 对话 | useChatApi | 30s | unavailable 态 |
| `https://api.github.com/repos/...` | Stars 数 | useGitHubStars | 5s | 静态回退值 |
| `sendBeacon(/api/track)` | 埋点 | useTracking | fire-and-forget | 静默失败 |

**组件通信边界:**

```
App.vue — useAIChat() 唯一调用点
├── Navbar (sync)                  ←→ useScrollReveal (区段高亮)
├── RouterView
│   └── Home.vue (零业务逻辑，仅区段排列)
│       ├── HeroSection (sync)     ←→ ChatPreview (slot, props from useAIChat)
│       ├── CodeShowcase (async)   ← 纯展示 + utils/clipboard
│       ├── ProductShowcase (async)← data/products.ts
│       ├── StatsCounter (async)   ← data/stats.ts + utils/formatNumber
│       ├── PortalLinks (async)    ← data/portalLinks.ts
│       ├── CTASection (async)     ← TrustBadge ← useGitHubStars
│       └── FeatureGrid (async)    ← 纯展示
├── Footer (sync)                  ← data/ (ICP, 社交链接)
├── ChatFloatingTrigger (async)    ← props from useAIChat
└── AIChatSidebar (async)          ← props from useAIChat
```

**状态边界:**

| Composable | 管辖范围 | 调用位置 | 跨组件 |
|------------|---------|---------|--------|
| useAIChat | Chat 全生命周期 | App.vue (单例) | props 向下传递 |
| useScrollReveal | 单组件滚动检测 | 各组件独立调用 | 否 |
| useTracking | 全局事件收集 | 任何组件 | 是 |
| useNetworkStatus | 网络状态 | useAIChat 内部 | 间接 |
| useGitHubStars | Stars 数据 | TrustBadge | 否 |

**目录职责判断规则:**

| 判断条件 | 放置位置 |
|---------|---------|
| 有 `ref`/`computed`/`watch` 的逻辑 | `composables/` |
| 纯函数，无响应式状态 | `utils/` |
| 静态数据数组/对象 | `data/` |
| TypeScript interface/type | `types/` |
| 被 ≥ 3 个功能目录引用的组件 | `components/common/` |
| 仅被 1-2 个目录使用的组件 | 对应功能目录内 |

### Wave 交付与结构映射

**Wave 1:**
- `components/Layout/` — Navbar 增强 + Footer
- `components/Hero/` — HeroSection 重构为 HeroSplit + ChatPreview
- `components/Chat/` — ChatPreview + ChatFloatingTrigger + 现有系统 async 化
- `components/Conversion/` — CTASection + TrustBadge
- `composables/useGitHubStars.ts`
- `utils/` — clipboard, formatNumber
- `data/` — 全部数据集中化
- `types/` — navigation, products, common
- `env.d.ts` — Vite 环境变量声明
- `deploy/nginx.conf` — 安全头 + 缓存
- CI 质量门 + 测试配置
- `public/fonts/` — 自托管字体

**Wave 2:**
- `components/TechDemo/` — CodeShowcase
- `components/Products/` — ProductScreenshot
- `components/Stats/` — StatsCounter 动画
- `components/common/` — SectionTransition, StateIllustration
- SSG 预渲染 + Brotli 压缩

### Development Workflow Integration

**开发:**
```
bun install → bun run dev (port 3001) → API proxy to api.lurus.cn
```

**构建与验证:**
```
tsc --noEmit → eslint → vitest run --coverage → vite build → bundle size check → playwright test → lighthouse CI
```

**部署:**
```
Docker build (node:20-alpine → nginx:alpine) → GHCR → ArgoCD sync → K3s
Dockerfile: COPY deploy/nginx.conf → /etc/nginx/conf.d/default.conf
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- 16 个 ADR 全部兼容，无矛盾
- 技术栈版本已验证（Vue 3.5 + TS 5.7 + Vite 6 + Tailwind 4）
- ADR 链条完整：ADR-001 (async) → ADR-013 (chunks)；ADR-008 (安全头) → ADR-016 (nginx)

**Pattern Consistency:**
- 命名、结构、通信模式与 Vue 3 Composition API 官方约定一致
- 12 个潜在冲突点已识别并有解决规则
- Anti-patterns 表提供 7 项对照

**Structure Alignment:**
- 项目结构支撑所有 16 个 ADR
- 目录职责判断规则表可直接执行
- Wave 1/2 交付与目录结构精确映射

### Requirements Coverage ✅

**Functional Requirements: 45/45 (100%)**
- 9 个 FR 类别全部有对应目录和组件映射
- 关键 FR 验证：FR7 Skip Link → `<main id="main-content">`；FR32 Chat 限流 → useChatApi 每分钟限流

**Non-Functional Requirements: 30/30 (100%)**
- Performance (P1-P5)：ADR-001/002/013 + Lighthouse CI
- Security (S1-S8)：ADR-008 完整安全头 + COOP
- Accessibility (A1-A4)：ADR-012 + axe-core CI
- Integration (I1-I6)：ADR-010 三态降级
- Build (B1-B7)：ADR-014 CI 7 阶段

### Implementation Readiness ✅

**Decision Completeness:**
- 16 个 ADR 含版本 + 理由 + 影响
- 实施顺序和依赖关系已明确

**Pattern Completeness:**
- 5 类模式全覆盖（命名、结构、格式、通信、过程）
- useAIChat 模块级 state 模式已明确

**Structure Completeness:**
- 完整目录树含所有文件
- 组件通信边界图含 sync/async 标注

### Gap Analysis Results

**Critical Gaps: 0** — 无阻塞性缺失

**Important Gaps (已在验证中解决):**

| Gap | 解决方案 |
|-----|---------|
| Pricing 页面定位 | 延迟到 Epic 规划阶段决定 |
| useAIChat 单例实现 | 模块级 state，任何组件可独立调用返回同一状态 |
| Analytics 数据流 | Nginx 代理 `/api/track` → lurus-api |
| Chat 消息渲染 | Wave 1 纯文本；Wave 2 评估 markdown-it + DOMPurify |
| 移动端 Chat 入口 | `< 768px` 时 ChatPreview 隐藏，ChatFloatingTrigger 为唯一入口 |
| Chat 客户端速率限制 | useChatApi 增加每分钟 N 条限流 (FR32) |

**目录树补充:**
```
├── lighthouserc.js                 # Lighthouse CI 配置
├── scripts/
│   └── check-bundle-size.js        # Bundle size 检查脚本
```

**ADR-008 安全头补充:**
```
Cross-Origin-Opener-Policy: same-origin
```
注：暂不添加 COEP（会阻止跨域 API 调用）

**Lighthouse CI 阈值调整:**
- Performance: desktop ≥ 90, mobile ≥ 85
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] 项目上下文全面分析（45 FR + 30 NFR）
- [x] 规模与复杂度评估（Medium — 前端 SPA）
- [x] 技术约束识别（12 项）
- [x] 跨切面关注点映射（7 项）
- [x] 7 个架构关键原则确立

**✅ Architectural Decisions**
- [x] 16 个 ADR 文档化含版本
- [x] 技术栈完整指定
- [x] 集成模式定义（3 个外部 API 边界）
- [x] 性能考量覆盖
- [x] 安全考量覆盖（含 COOP）

**✅ Implementation Patterns**
- [x] 命名约定全覆盖
- [x] 结构模式定义（含目录职责判断表）
- [x] 通信模式指定（含 useAIChat 模块级 state）
- [x] 过程模式文档化
- [x] Anti-patterns 列表

**✅ Project Structure**
- [x] 完整目录树
- [x] 组件边界建立
- [x] 集成点映射
- [x] FR → 目录映射完成
- [x] Wave 交付映射

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: HIGH**

**Key Strengths:**
1. 基于实际代码库分析（Brownfield 准确性验证）
2. 16 个 ADR 覆盖所有关键决策点
3. 两轮 Advanced Elicitation 深度验证
4. 模式规则可直接执行
5. Wave 1/2 交付边界清晰

**Areas for Future Enhancement:**
1. Pricing 页面定位（Epic 规划阶段决定）
2. SSG 预渲染方案细化（Wave 2）
3. Brotli 压缩（Wave 2，需自编译 Nginx）

### Implementation Handoff

**AI Agent Guidelines:**

1. **严格遵循 16 个 ADR** — 决策已定，不重新讨论
2. **使用目录职责判断规则表** — 决定文件放置位置
3. **useAIChat 模块级 state** — 不在组件内创建新实例
4. **所有新组件实现 a11y 接口** — ADR-012
5. **所有外部依赖实现三态降级** — ADR-010
6. **移动端 Chat 入口** — `< 768px` 仅 ChatFloatingTrigger
7. **Wave 1 Chat 消息用纯文本渲染** — 无 v-html

**First Implementation Priority:**

1. **数据集中化 (ADR-006/007)** — 提取硬编码到 src/data/ + src/types/
2. **测试基础设施 (ADR-011)** — vitest.config.ts + playwright.config.ts + eslint.config.js + lighthouserc.js
3. **CI 质量门 (ADR-014)** — 更新 build-www.yaml
4. **useAIChat 模块级 state 重构** — 确保单例行为
5. **Chat async 化 (ADR-001/013)** — defineAsyncComponent + VITE_CHAT_ENABLED
