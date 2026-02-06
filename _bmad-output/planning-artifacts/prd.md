---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['product-brief-www.md', 'project-context.md', 'architecture.md', 'ux-design-specification-www.md']
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 3
classification:
  projectType: web_app
  domain: general
  complexity: medium
  projectContext: brownfield
workflowType: 'prd'
date: 2026-02-03
author: Anita
project: lurus-www
---

# Product Requirements Document - lurus-www

**Author:** Anita
**Date:** 2026-02-03
**参照基准:** mastra.ai 着陆页结构（2026-02 快照）

---

## Executive Summary

**产品**: lurus-www — Lurus 平台品牌着陆页
**定位**: 统一 AI 网关平台的技术品牌门户，参照 mastra.ai 结构，以"Artisanal Premium"手绘美学呈现
**技术栈**: Vue 3.5 + TypeScript + Vite + Tailwind CSS 4
**设计语言**: 手绘风格（Caveat 字体、sketchy 边框、cream/ink/ochre 色彩 token、Fibonacci 间距）

**目标用户**:
- **Developer Chen（P0, ~40%）**: 通过 curl 验证 API → 获取 API Key
- **Trader Zhao（P1, ~20%）**: 通过产品截图建立信任 → 跳转 GuShen
- **Professional Lin（P2, ~30%）**: 门户直达日常工具 → 日活回访

**核心差异化**: 全栈自建（AI 网关 → 量化交易 → 企业邮件 → 桌面应用），非聚合平台。Hero 区可执行 curl 命令作为即时信任证明。

**MVP 策略**: Experience MVP — 2 波交付。Wave 1（Navbar + Hero + Final CTA + Footer + Conditional Chat）验证品牌信任假设；Wave 2 补全产品展示和资源层。

---

## Success Criteria

### User Success

**Developer Chen（P0，~40% 流量）— "首屏 curl → 技术信任 → 获取 Key"**

| 成功标准 | 度量方式 | V1 目标 |
|---------|---------|---------|
| 3s 内理解"统一 AI 网关"定位 | 5 人认知测试 ≥ 4 人通过 | ≥ 80% |
| Hero 区 curl 命令可一键复制验证 | 复制按钮点击率 | 可追踪 |
| 点击主 CTA"获取 API Key" | CTA 点击率 | > 5% |
| 浏览平台能力（6 个 feature icon） | 滚动深度至 Framework 区 | > 40% |
| 使用 AI Chat 验证产品能力 | Chat 会话发起率 | > 10% |

**Trader Zhao（P1，~20% 流量）— "看到真实界面 → 产品生态可信"**

| 成功标准 | 度量方式 | V1 目标 |
|---------|---------|---------|
| 浏览 GuShen 产品卡（含截图） | 产品卡点击率 | > 8% |
| 从 www 跳转到 GuShen | 外链转化率 | > 3% |
| 看到产品卡内 use case 描述 | 滚动深度至 Products 区 | > 30% |

**Professional Lin（P2，~30% 流量）— "门户直达 → 日活回访"**

| 成功标准 | 度量方式 | V1 目标 |
|---------|---------|---------|
| 门户链接点击 | 门户链接点击率 | > 20% |
| 7 日内回访 | 回访率 | > 15% |
| 门户到达时间（回访用户） | ≤ 3s 点击首个链接 | 通过 |

### Business Success

**V1 北极星指标：CTA 点击率 > 5%**

| 时间线 | 目标 | 指标 | 目标值 |
|--------|------|------|--------|
| 3 个月 | 品牌认知 | 月独立访客 | > 500 UV |
| 3 个月 | 产品转化 | www → api.lurus.cn 注册 | > 20 |
| 3 个月 | 日活种子 | 门户日活用户 | > 10 DAU |
| 3 个月 | AI Chat 验证 | 月 Chat 会话数 | > 200 |
| 12 个月 | 流量增长 | 月独立访客 | > 3,000 UV |
| 12 个月 | 付费转化 | www 来源付费用户 | > 50 |

**转化漏斗：**

```
访问 www (100%)
  → 停留 > 10s (> 60%)
    → 滚动至产品区 (> 40%)
      → 点击任意 CTA (> 5%)
        → 完成 api.lurus.cn 注册 (> 1%)
```

### Technical Success

性能指标详见 Web App Specific Requirements → Performance Targets（含测量工具与优化策略）。此处仅列 Go/No-Go 关注项：

| 指标 | V1 目标 | 报警阈值 |
|------|---------|---------|
| Lighthouse Performance | ≥ 90 | < 80 |
| LCP | < 2.0s | > 3.0s |
| CLS | = 0 | > 0.1 |
| JS Bundle (gzip) | < 150KB | > 200KB |
| 极简埋点 | 3 事件可追踪 | 任一事件丢失 |

### Measurable Outcomes

详见 Project Scoping → Go/No-Go 发布门（10 道），经 Elicitation 增强后包含 API 健康检查和 CTA 目标页验证。

---

## Product Scope

### 页面结构总览（参照 mastra.ai，经 Elicitation 精简优化）

**设计决策记录：**
- 原始 Mastra 11 区段 → 精简为 8 区段 + 2 浮动组件（Pre-mortem + SCAMPER 结论）
- S4 Platform + S6 Infrastructure 合并（Cross-Functional War Room 共识）
- S5 Products + S8 Use Cases 合并（Shark Tank 发现：无可运行模板资产）
- S8 Use Case Showcase 砍掉（Comparative Analysis：lurus 没有对应的模板/demo 资产）
- S1 Announcement Banner 推迟到 Wave 2（SCAMPER Eliminate：V1 无紧急公告需求）
- 门户从第 9 区段提前到第 5 区段（UX 视角：Lin 不应滚过 8 屏营销内容）
- GitHub Stars 有条件展示（Comparative Analysis：< 500 只放图标链接）
- Navbar 去掉 Blog 链接（Comparative Analysis：无博客内容，死链比空白更糟）

```
┌─────────────────────────────────────────────────────────────┐
│ [S1] Navbar — 固定导航栏                                     │
│   Logo(Caveat) | Products▾ | Resources▾ | Pricing | Docs    │
│   | [GitHub] | [获取 API Key]                                │
├─────────────────────────────────────────────────────────────┤
│ [S2] Hero — 全宽首屏                                         │
│   大标题 + 副标题 + curl/pip 命令 CTA（可复制）                │
│   + 右侧 API 网关可视化插图                                   │
├─────────────────────────────────────────────────────────────┤
│ [S3] Platform Overview — 平台能力 + 基础设施                   │
│   Badge "AI Gateway"                                        │
│   6 个 Feature Icon + 代码高亮 + Dashboard 预览               │
│   + 基础设施亮点（K8s/GitOps/开源/混合云）                     │
│   ── 轻量 CTA 条 ──                                         │
├─────────────────────────────────────────────────────────────┤
│ [S4] Products — 产品生态（含 use case）                       │
│   Badge "Product Ecosystem"                                 │
│   主卡 + 4 产品子卡（各含截图/代码 + use case 描述）           │
├─────────────────────────────────────────────────────────────┤
│ [S5] Portal — 知识门户（id="portal"）                        │
│   门户预览卡（6 分类 48 链接）+ AI Chat 预览卡                 │
│   ── 轻量 CTA 条 ──                                         │
├─────────────────────────────────────────────────────────────┤
│ [S6] Getting Started — 快速开始                              │
│   3 个核心入口按钮: API 文档 | Portal | GuShen               │
├─────────────────────────────────────────────────────────────┤
│ [S7] Final CTA — 终极行动号召                                │
│   品牌标语 + [获取 API Key] + [联系我们]                      │
├─────────────────────────────────────────────────────────────┤
│ [S8] Footer — 页脚                                           │
│   3 列: Products | Developers | Company                     │
│   + Logo(Caveat 签名) + GitHub · Discord                    │
└─────────────────────────────────────────────────────────────┘
│ [浮动] AI Chat Trigger — 右下角浮动按钮                       │
│ [浮动] AI Chat Panel — 右侧滑入面板                           │
└─────────────────────────────────────────────────────────────┘
```

### Wave 交付策略

| Wave | 区段 | 目标 | 发布标准 |
|------|------|------|---------|
| **Wave 1（MVP）** | S1 Navbar + S2 Hero + S7 Final CTA + S8 Footer + F-Chat（Conditional）+ 现有 Portal/Pricing 保留 | Chen 转化路径可用 | Hero 认知测试通过 + Lighthouse ≥ 90 + API 可达 + CTA 目标页可用 |
| **Wave 2** | S3 Platform Overview + S4 Products + S5 Portal 重构 + S6 Getting Started + SSG + Firefox/Safari 测试 | 全部区段完整 | 产品卡可点击 + 门户 3s 可达 |

每波可独立发布。Wave 1 发布时，现有 Portal/Features/Pricing 区段保留原样，不拆除。详细优先级排序见 Project Scoping → Post-MVP Features。

### 区段规格（8 区段 + 2 浮动组件，分两波交付）

#### S1: Navbar — 固定导航栏

| 属性 | 规格 |
|------|------|
| **左侧** | Logo（Caveat 字体） |
| **中部导航** | Products▾ (API Gateway, GuShen, Switch, Webmail, Docs) · Resources▾ (Portal, Docs) · Pricing · Docs |
| **右侧** | GitHub 图标链接（≥ 500 stars 时显示数字 badge）+ [获取 API Key] 主 CTA |
| **下拉菜单** | Products 和 Resources 各有 submenu，hover/click 展开 |
| **滚动行为** | 顶部透明 → 滚动后 `bg-cream-50/90 backdrop-blur-sm shadow-sm` |
| **当前区段** | IntersectionObserver 检测，对应导航项 `border-b-2 border-ochre` |
| **移动端** | 汉堡菜单 → 全屏覆盖导航 |
| **门户快速入口** | Resources 下拉中 Portal 项 + Navbar 按钮跳 `#portal` |
| **不含** | Blog 链接（V1 无博客内容，避免死链） |

#### S2: Hero — 全宽首屏

| 属性 | 规格 |
|------|------|
| **主标题** | `phi-3xl`（68px），如"一个端点，接入所有 AI 模型" |
| **副标题** | `phi-lg`，平台描述（统一网关 + OpenAI 兼容 + 50+ 模型） |
| **主 CTA** | 命令块（深色背景 + 语法高亮 + 一键复制）。优先用 `curl https://api.lurus.cn/v1/models`（免认证端点）；或 `pip install lurus`。如用需认证端点则标注"需 API Key" |
| **右侧** | API 网关可视化 SVG 插图（请求 → Lurus → 多模型扇出），手绘风格 |
| **装饰** | 手绘风格背景装饰元素（sketchy 圆、波浪线），保持克制 |
| **响应式** | Desktop: 左文右图 → Mobile: 堆叠，标题精简为 `phi-2xl` |

#### S3: Platform Overview — 平台能力 + 基础设施

原 S4(Platform Framework) + S6(Infrastructure) 合并。用户关心"你能做什么"而非"你怎么部署的"。

| 属性 | 规格 |
|------|------|
| **Badge** | "AI Gateway" 标签 |
| **标题** | "构建与迭代" |
| **上半部: 平台能力** | |
| — Feature Icon 网格 | 6 个能力图标卡：50+ 模型 · 负载均衡 · 自动回退 · 响应缓存 · 实时监控 · OpenAI 兼容 |
| — 代码高亮 | curl 完整示例（请求 + 响应 JSON），`CodeShowcase` 组件 |
| — 预览图 | Lurus API 控制台 Dashboard 截图（`card-sketchy` 容器）。**降级**：无截图时用 CodeShowcase 代码块替代 |
| **下半部: 基础设施亮点** | |
| — 4 个亮点条目 | K8s 集群（5 节点）· GitOps 流水线 · 开源（如实描述哪些开源）· 混合云架构 |
| — 展示方式 | 轻量化——icon + 一行描述，不做完整网格卡片 |
| **区段底部** | 轻量 CTA 条："想了解更多？[获取 API Key] · [查看文档]" |
| **布局** | 响应式网格，Desktop 2 列（icon 网格 + 代码），基础设施亮点为横向 4 列，Mobile 全部堆叠 |

#### S4: Products — 产品生态

原 S5(Product Ecosystem) + S8(Use Cases) 合并。每个产品卡自带 use case 描述 + 截图/代码。

| 属性 | 规格 |
|------|------|
| **Badge** | "Product Ecosystem" 标签 |
| **主卡** | 全宽，"全栈自建，从 AI 网关到量化交易到企业邮件" + 平台架构插图 |
| **子卡（4 张网格）** | 每张含：产品色标识 + 截图或代码块 + 标题 + use case 一句描述 + CTA |
| — API Gateway | 赭金标识，CodeShowcase curl 示例，"3 行代码接入 50+ AI 模型" |
| — GuShen 量化 | 鼠尾草绿标识，真实截图（策略编辑器），"自然语言描述 → AI 生成量化策略"。**降级**：无截图时用策略代码片段 |
| — Webmail 邮件 | 产品色标识，"自建企业邮件，中国送达率优化"。**降级**：无截图时用配置代码片段 |
| — Switch 桌面 | 赤陶橙标识，"Go + Web 跨平台桌面应用"。**降级**：无截图时用功能列表 |
| **交互** | hover: `hover-breathe` 效果；CTA 点击跳转对应产品域名（新标签） |
| **布局** | 主卡全宽 + 子卡 2×2 网格（Mobile 单列堆叠） |

#### S5: Portal — 知识门户

从原 S9 位置提前到紧接产品区，尊重 Professional Lin 的日活回访需求。

| 属性 | 规格 |
|------|------|
| **锚点** | `id="portal"`，支持 Navbar 直达和外部链接 `lurus.cn#portal` |
| **门户预览卡** | `card-sketchy` 大卡，展示 6 分类标签 + 代表性链接预览 + "探索全部 48 个链接" CTA。3D 微倾斜效果（参照 Mastra Book tilt） |
| **AI Chat 预览卡** | 品牌图标 + "Lurus AI 对话" + Quick Prompts 预览 + "开始对话" CTA（触发 F-Chat 展开） |
| **布局** | 门户卡 60% + Chat 卡 40%（Desktop），Mobile 堆叠 |
| **区段底部** | 轻量 CTA 条："需要 API 访问？[获取 API Key]" |
| **回访优化** | `#portal` 锚点跳转时跳过所有 scroll-triggered 动效，直达门户 |

#### S6: Getting Started — 快速开始

精简为 3 个核心入口，不硬凑 6 个。

| 属性 | 规格 |
|------|------|
| **标题** | "开始使用 Lurus" |
| **3 个图标链接按钮** | API 文档（→ docs.lurus.cn）· 门户链接（→ #portal）· GuShen 量化（→ gushen.lurus.cn） |
| **行为** | 外链新标签，内链锚点平滑滚动 |
| **布局** | 居中排列，间距 `fib-4` |

#### S7: Final CTA — 终极行动号召

| 属性 | 规格 |
|------|------|
| **标语** | 品牌标语（如"全栈自建，匠心品质。"），Caveat 字体，`phi-2xl` |
| **双按钮** | [获取 API Key]（Primary）+ [联系我们]（Secondary） |
| **布局** | 居中，大面积留白上下 `fib-7` |
| **注意** | 这不是唯一 CTA——S3 和 S5 底部各有轻量 CTA 条，不依赖用户滚到页尾 |

#### S8: Footer — 页脚

| 属性 | 规格 |
|------|------|
| **3 列结构** | |
| — Products | API Gateway · GuShen · Switch · Webmail · Docs |
| — Developers | API 文档 · 状态页 · GitHub |
| — Company | 关于 · 定价 · 联系 |
| **底部** | Logo（Caveat 签名）+ 社交链接（GitHub · Discord） |
| **品牌签名** | Caveat 字体手写风格，作为终值时刻品牌印记 |
| **不含** | Blog、模板、Legal 列（V1 无对应内容） |

#### F-Chat: AI Chat 浮动系统

| 属性 | 规格 |
|------|------|
| **ChatFloatingTrigger** | 右下角浮动按钮，`ochre` 背景 + Chat 图标，`hover-breathe` |
| **出现时机** | Hero 区离开视口后（IntersectionObserver） |
| **Chat Panel** | 右侧 400px 滑入面板，含 Quick Prompts + 输入框 + 流式输出 |
| **V1 降级** | 后端不可用时，按钮点击显示"AI Chat 即将开放" + 预录对话演示 |
| **复用** | 复用已有 7 个 Chat 子组件，仅新增 FloatingTrigger |

### 基础设施功能

| # | 功能 | 规格 |
|---|------|------|
| I1 | **性能优化** | 字体预加载、图片懒加载、非关键 JS defer、CSS 精简、LCP < 2.0s |
| I2 | **SEO 基础** | meta title/description、OG images、sitemap.xml、robots.txt、语义 HTML |
| I3 | **极简事件埋点** | `sendBeacon` 上报 3 事件：CTA 点击、Chat 打开、门户链接点击 |
| I4 | **Scroll 动效系统** | `useScrollReveal` composable + `.reveal-up/left/right/scale` CSS 类 |
| I5 | **微交互系统** | `.hover-breathe`、`.click-elastic`、`.focus-ring`、`.copy-flash` |
| I6 | **ReducedMotion** | `prefers-reduced-motion: reduce` 全局禁用所有动画 |
| I7 | **手绘美学精炼** | Sketchy 仅卡片级、Caveat ≤ 3 处、纸质纹理降噪、间距 ≥ 80px |

### 资产降级策略

| 资产 | 有 → 使用方式 | 无 → 降级方案 |
|------|-------------|-------------|
| Dashboard 截图 | `ProductScreenshot` + `card-sketchy` | CodeShowcase 代码块（curl 示例） |
| GuShen 截图 | 真实截图嵌入产品卡 | 策略代码片段 + 功能描述 |
| Webmail/Switch 截图 | 真实截图嵌入产品卡 | 功能列表 + icon |
| API 网关 SVG 插图 | Hero 右侧大插图 | 纯文字 Hero + CodeShowcase 右置 |
| 手绘装饰 SVG | 区段间装饰 | 无装饰，靠留白分隔 |

### Mastra → lurus-www 元素映射表（Elicitation 后修订版）

| Mastra 元素 | lurus-www 适配 | 视觉风格转换 | Elicitation 调整 |
|-------------|---------------|-------------|-----------------|
| Event Banner | Announcement Banner | `bg-ochre/10` 暖色 | **推迟 Wave 2** |
| Fixed Navbar + GitHub Stars | Navbar + GitHub 图标 | cream/ink 色系 | Stars ≥ 500 才显示数字；去掉 Blog |
| Hero npm command | Hero curl/pip command | 暗色代码块 | 用 `/v1/models` 免认证端点 |
| Agent SVG illustration | API 网关扇出 SVG | 手绘风格 | 无插图时降级为代码块 |
| Feature icon grid (6) | 平台能力 icon (6) | sketchy 容器 | 保持 |
| Dev Studio preview | Dashboard 截图 | `card-sketchy` | 无截图用 CodeShowcase 降级 |
| Observability grid | 合并入 Platform Overview | — | **合并 S4+S6** |
| Deployment grid | 合并入 Platform Overview | 轻量化亮点条 | **合并 S4+S6** |
| 6 Template cards | **砍掉** | — | **无可运行模板资产** |
| Book 3D tilt card | 门户预览 3D tilt 卡 | 保持 tilt | 内容换为 48 链接展示 |
| MCP Course portrait | AI Chat 预览卡 | 品牌图标 | 无人物/课程 |
| Tagline + dual CTA | 品牌标语 + 双 CTA | Caveat + ochre | 保持 |
| 5-column Footer | **3 列** Footer | 暖色 + 签名 | 去掉 Blog/Legal/模板 列 |
| — | **中间 CTA 条** (新增) | `bg-cream-100` | S3 和 S5 底部各一个 |
| — | **门户提前到 S5** (新增) | — | Lin 回访优先 |

### Growth & Vision

详见 Project Scoping → Post-MVP Features（Wave 2 优先级排序）和 Vision（V2+）。

---

## User Journeys

### Journey 1: Developer Chen（P0）— "首屏 curl → 技术信任 → 获取 Key"

```
首次访问 lurus.cn
  → [S1 Navbar] 看到 Logo + 导航（Products▾ · Resources▾ · Pricing · Docs）
      ├─ 快速路径: 点击 "Docs" → 直达 docs.lurus.cn（跳过营销内容）
      └─ 探索路径: 继续向下
  → [S2 Hero] 3s 内理解"统一 AI 网关"定位
      → 看到 curl 命令块 → 一键复制
      → 终端执行 curl https://api.lurus.cn/v1/models → 获得 JSON 响应
          ├─ 成功: 看到模型列表 → 技术信任建立 ✓
          └─ 失败: API 不可达 → CodeShowcase 显示"服务维护中"+ 预录响应示例
  → [S3 Platform Overview] 浏览 6 个能力 icon → 代码高亮 → 信任加深
      → 区段底部 CTA 条 → 可提前转化
  → [S4 Products] 浏览产品生态 → 理解全栈自建规模
  → [S7 Final CTA] 或任意中间 CTA → 点击 "获取 API Key"
      → 跳转 api.lurus.cn 注册页
```

**关键设计决策（Elicitation 增强）：**
- Navbar 保留 "Docs" 直达链接，让 Chen 可跳过全部营销内容直达文档
- curl 端点用 `/v1/models`（免认证），降低首次体验门槛
- API 不可达时 CodeShowcase 展示降级状态（预录响应 + 服务状态提示），而非空白
- CodeShowcase 如用需认证端点，必须显示"需 API Key"标注

### Journey 2: Trader Zhao（P1）— "看到真实界面 → 产品生态可信"

```
首次访问 lurus.cn（可能来自论坛/社交分享链接）
  → [S2 Hero] 看到 AI 网关定位 → 非目标但不排斥
  → [S3 Platform Overview] 快速扫过
      → Stats 数字（50+ 模型 · 680+ 测试）在产品卡附近 → 建立规模感
  → [S4 Products] 看到 GuShen 量化产品卡
      → 截图展示自然语言输入界面（"用中文描述策略 → AI 生成代码"）
      → 信任锚点: 真实截图 + Stats 数字 + "自然语言"关键词
      → 点击 CTA → 新标签打开 gushen.lurus.cn
          → 跨域视觉过渡: www 和 GuShen 共享配色体系（cream/ochre），减少"跳到另一个网站"的割裂感
```

**关键设计决策（Elicitation 增强）：**
- Stats 计数（50+ 模型等）放在产品卡附近而非独立区段，作为 Zhao 的信任锚点
- GuShen 截图必须展示自然语言输入界面（非纯代码界面），降低非程序员恐惧
- www → 产品子域名的跨域视觉过渡：共享色彩 token，避免品牌割裂
- 截图不可用时降级为策略代码片段，但需配自然语言描述文案

### Journey 3: Professional Lin（P2）— "打开即用 → 每天第一个页面"

```
首次访问:
  → [S1 Navbar] Resources▾ 下拉 → 看到 "Portal" 选项（醒目位置，非埋入子菜单）
      └─ 或直接滚动至 S5
  → [S5 Portal] id="portal" 锚点 → 看到 6 分类 48 链接预览
      → 找到常用工具链接 → 点击跳转 → 任务完成

回访路径（书签/直接 URL）:
  → 直接访问 lurus.cn#portal
      → 跳过所有 scroll-triggered 动效 → 直达门户区段
      → ≤ 3s 点击首个链接 → 日活回访目标达成

  → 或: 看到 AI Chat 预览卡 → "开始对话" → FloatingTrigger 展开 Chat Panel
      → 提问"xx工具的链接" → 得到直达链接 → 效率更高
```

**关键设计决策（Elicitation 增强）：**
- Navbar Resources 下拉中 Portal 项必须醒目（非埋入二级子菜单），尊重 Lin 的高频回访路径
- `#portal` 锚点跳转时跳过所有 scroll-triggered 动效，避免回访用户每次看动画
- Wave 发布时需回归测试门户性能——新增区段不得拖慢 `#portal` 锚点跳转速度
- AI Chat 作为门户辅助入口：Lin 可通过对话快速定位链接

### Journey 4: Anita Admin — "更新内容零摩擦"

```
内容更新场景:
  → 打开 src/data/ 目录 → README 索引文件列出所有可配置内容位置
  → 修改 JSON/TS 数据文件（产品卡文案、门户链接、Stats 数字等）
  → bun run build && bun run preview → 本地预览确认
  → git push → CI/CD 自动部署

链接维护场景:
  → 定期运行链接健康检查脚本（CI 集成或手动）
  → 检查 48 个门户链接 + 产品卡外链是否可达
  → 修复失效链接 → 提交 → 自动部署
```

**关键设计决策（Elicitation 增强）：**
- `src/data/` 目录提供 README 索引，列出所有可配置内容的文件位置和格式说明
- 内容更新工作流: 编辑数据文件 → `bun run build && bun run preview` → 确认 → push
- 链接健康检查: 提供脚本检查所有外部链接可达性，可集成到 CI
- 所有用户可见文案集中在数据文件中，不散落在组件内部

---

### Journey Requirements Traceability

旅程中提炼的 JR/JT/JN 需求已全部吸收进 Functional Requirements（FR1–FR45）和 Non-Functional Requirements（NFR-*）中，不再单独列表。可追溯映射：

| 旅程需求 | 吸收至 | 说明 |
|----------|--------|------|
| JR-01–10 | FR1–FR45 | 功能需求覆盖全部旅程场景 |
| JT-01–07 | Performance Targets / Browser Matrix / NFR-B* | 技术需求分布在 Web App 和 NFR 各节 |
| JN-01–03 | NFR-S1 / FR39–42 / NFR-I6 | 非功能需求已纳入对应类别 |

---

## Web App Specific Requirements

### Browser Compatibility Matrix

| 浏览器 | 最低版本 | 测试优先级 | 备注 |
|--------|---------|-----------|------|
| Chrome | Latest 2 | P0 | 主要开发/测试浏览器 |
| Edge | Latest 2 | P0 | Chromium 内核，与 Chrome 行为一致 |
| Firefox | Latest 2 | P1 | CSS Grid/Flexbox 差异需注意 |
| Safari | 16+ | P1 | macOS + iOS，CSS 前缀、IntersectionObserver polyfill |
| Mobile Chrome | Latest 2 | P0 | Android 主力浏览器 |
| Mobile Safari | 16+ | P1 | iOS 主力浏览器，PWA 限制 |

**不支持**: IE 11、Safari < 16。不提供 polyfill，优雅降级（核心内容可读，交互可能缺失）。

### Responsive Design Strategy

| 断点 | 宽度 | 布局 | 关键调整 |
|------|------|------|---------|
| Mobile | < 640px | 单列堆叠 | 标题缩小至 `phi-2xl`，汉堡菜单，产品卡单列 |
| Tablet | 640–1024px | 混合布局 | Hero 堆叠，产品卡 2 列，门户卡堆叠 |
| Desktop | 1024–1440px | 多列网格 | Hero 左右分栏，产品卡 2×2，门户 60/40 |
| Wide | > 1440px | 居中约束 | `max-w-7xl` 居中，两侧留白 |

**设计原则**:
- Mobile-first CSS（`min-width` 断点）
- 内容优先级不变——所有断点下用户看到相同信息，仅布局重排
- 图片使用 `<picture>` + `srcset` 按断点加载适配尺寸
- 触控目标 ≥ 44×44px（Mobile）

### Performance Targets

| 指标 | V1 目标 | 报警阈值 | 测量工具 |
|------|---------|---------|---------|
| Lighthouse Performance | ≥ 90 | < 80 | CI Lighthouse |
| LCP | < 2.0s | > 3.0s | Web Vitals |
| FCP | < 1.5s | > 2.5s | Web Vitals |
| CLS | = 0 | > 0.1 | Web Vitals |
| TTI | < 3.0s | > 5.0s | Lighthouse |
| JS Bundle (gzip) | < 150KB | > 200KB | Vite build |
| CSS Bundle (gzip) | < 30KB | > 50KB | Vite build |
| 字体加载 | Caveat preload + swap | FOIT > 200ms | 手动验证 |

**优化策略**:
- Vite 代码分割: Chat Panel 组件懒加载（`defineAsyncComponent`）
- 图片: WebP/AVIF + 懒加载（`loading="lazy"`），Hero 首屏图除外
- 字体: Caveat `font-display: swap` + `<link rel="preload">`
- CSS: Tailwind v4 purge 未使用类
- 第三方脚本: 零第三方（无 GA/GTM），仅 `sendBeacon` 极简埋点

### SEO Strategy

| 项目 | 实现方式 | 优先级 |
|------|---------|--------|
| **预渲染** | `vite-plugin-ssr` 或 `vite-ssg` 生成静态 HTML | P1（Wave 2） |
| **Meta 标签** | 动态 `<title>` + `<meta description>` + canonical | P0 |
| **Open Graph** | `og:title/description/image` — 品牌 OG 图（1200×630） | P0 |
| **sitemap.xml** | 构建时生成，含 `lurus.cn` 主 URL | P0 |
| **robots.txt** | 允许所有爬虫，引用 sitemap | P0 |
| **语义 HTML** | `<header>/<main>/<section>/<footer>/<nav>` 结构化 | P0 |
| **结构化数据** | `Organization` + `WebSite` JSON-LD | P1 |
| **ICP 备案号** | Footer 底部展示（中国法规要求） | P0 |

**SPA SEO 关键决策**: 使用构建时预渲染（SSG）而非运行时 SSR。单页着陆页无动态路由，SSG 足够且零运行时成本。

### Accessibility Level

**目标**: WCAG 2.1 AA

| 类别 | 要求 | 实现 |
|------|------|------|
| **键盘导航** | 所有交互元素可 Tab 到达 + Enter/Space 激活 | `tabindex`、focus 管理 |
| **焦点指示** | 可见焦点环（`.focus-ring` token） | `focus-visible` + ochre 轮廓 |
| **颜色对比** | 文字/背景 ≥ 4.5:1（正文），≥ 3:1（大号文字） | cream/ink 配色天然高对比 |
| **减弱动效** | `prefers-reduced-motion: reduce` 禁用全部动画 | I6 基础设施功能 |
| **屏幕阅读器** | 所有图片 `alt`，装饰图 `aria-hidden`，区段 `aria-label` | 组件级实现 |
| **Skip Link** | 页面顶部隐藏 "跳至主内容" 链接 | `<a href="#main">` |
| **Chat 可访问性** | Chat Panel 打开时 focus trap + `aria-live="polite"` 流式消息 | Chat 组件 |
| **语言声明** | `<html lang="zh-CN">` | 全局 |

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP 类型**: Experience MVP — 最小可验证品牌体验
**核心假设**: "精致手绘美学 + 可验证 curl 命令" 足以在 3s 内建立技术品牌信任
**验证方式**: 5 人认知测试 + CTA 点击率 > 5%

**第一性原理**（Elicitation 增强）:
> 唯一的根本真理：一个能建立技术信任的页面 + 一个能跳转的 CTA 按钮 = 最小可行转化路径。

**MVP 不是什么**:
- 不是功能最多——是品质最精
- 不追求所有人设——P0 Developer Chen 的转化路径 100% 可用即可发布
- 不需要完美截图——资产降级策略确保任何时候都可发布
- 不被 Chat 后端阻塞——Chat 为 Conditional，后端不就绪则不含

**资源约束**:
- 团队: 1 人（Anita）+ AI 辅助开发
- 现有资产: Vue 3.5 + Tailwind CSS 4 项目骨架、7 个 Chat 子组件、Portal/Pricing 现有区段
- 外部依赖: api.lurus.cn（API Gateway 服务）、Caveat 字体（Google Fonts）

### MVP Feature Set（Phase 1 = Wave 1）

**支撑的核心旅程**: Chen（P0）完整转化路径

| 组件 | 必要性 | 理由 | 得分 |
|------|--------|------|------|
| S1 Navbar | Must-Have | 导航骨架，Docs 直达 + Portal 快速入口 | 37 |
| S8 Footer | Must-Have | 品牌完整性 + ICP 备案 + 外链 | 33 |
| S2 Hero | Must-Have | 首屏定位 + curl CTA = Chen 转化起点 | 32 |
| S7 Final CTA | Must-Have | 页尾转化兜底 | 31 |
| F-Chat | **Conditional Must-Have** | 后端就绪 → 含入 Wave 1；不就绪 → 延至 Wave 2，不阻塞发布 | 20 |
| 现有 Portal/Pricing | 保留 | 不拆除，Lin 路径可用 | — |

**Wave 1 交付标准**: Hero 认知测试通过 + Lighthouse ≥ 90 + curl 可执行 + CTA 目标页可用

**Wave 1 浏览器范围**: Chrome + Edge（latest 2）。Firefox/Safari 测试延至 Wave 2。

**绝对最小可发布集**: Navbar + Hero + Footer（3 组件，零外部依赖），如资源极度紧张可先发布此集合。

### Post-MVP Features（Phase 2 = Wave 2）

原 Wave 2 与 Wave 3 合并为单一 Phase 2，按优先级排序交付：

| 优先级 | 功能 | 价值 | 依赖 |
|--------|------|------|------|
| P0 | S3 Platform Overview | 深化 Chen 技术信任 | 截图或 CodeShowcase 降级 |
| P0 | S4 Products | Zhao 转化路径完整化 | 产品截图（有降级方案） |
| P1 | F-Chat（若 Wave 1 未含） | 差异化体验 | Chat 后端就绪 |
| P1 | S5 Portal 重构 | Lin 日活回访体验升级 | 48 链接数据整理 |
| P1 | S6 Getting Started | 资源层完整 | Docs 站点就绪 |
| P1 | SSG 预渲染 | SEO 长期流量 | vite-ssg 集成 |
| P1 | Firefox/Safari 测试 | 浏览器覆盖 | 无 |
| P2 | Announcement Banner | 可配置公告条 | 无 |
| P2 | Stats 计数动画 | 规模感信任锚点 | 无 |

### Vision（V2+）

| 功能 | 目的 |
|------|------|
| AI Chat 升格为首屏核心 | 后端匿名公开端点就绪后 |
| i18n 双语切换 | 中英切换 |
| 交互式 API Playground | 官网内嵌试用 |
| 个性化门户 | 登录用户自定义布局 |
| 内容营销系统 | Blog/案例研究 |
| Use Case Showcase | 当有真实可运行 demo/模板资产时恢复 |
| 完整 Analytics | Umami/Plausible 替代极简埋点 |

### Go/No-Go 发布门（10 道）

| 门 | 指标 | 通过标准 | 来源 |
|----|------|---------|------|
| 技术品质 | Lighthouse Performance | ≥ 90 | Step 3 |
| 性能 | LCP | < 2.0s | Step 3 |
| 零偏移 | CLS | = 0 | Step 3 |
| 内容清晰 | Hero 认知测试（5 人） | ≥ 4 人 3s 内理解 | Step 3 |
| 视觉品质 | 设计评审 | 精致度明显提升 | Step 3 |
| 可度量 | 极简埋点 | 3 事件均可查到 | Step 3 |
| 可发现 | SEO | meta 标签 + OG 预览正确 | Step 3（SSG 降为 P1） |
| 功能完整 | Wave 1 区段 | 4 区段 + 保留现有 | Step 3 |
| **API 可达** | `/v1/models` 健康检查 | HTTP 200 + JSON 响应 | Elicitation Pre-mortem |
| **CTA 可用** | api.lurus.cn 注册页 | 页面存在且可操作 | Elicitation Pre-mortem |

### Risk Mitigation Strategy

**技术风险**:

| 风险 | 概率 | 缓解措施 |
|------|------|---------|
| Chat 后端不可用 | 高 | Conditional Must-Have，不阻塞 Wave 1 |
| API Gateway 不可达 | 中 | CodeShowcase 预录响应降级 + Go/No-Go 健康检查 |
| SSG 与 Vue 3.5 兼容问题 | 中 | 降为 P1，Wave 1 不依赖 SSG |
| Caveat 字体加载慢 | 低 | `font-display: swap` + preload |

**市场风险**:

| 风险 | 概率 | 缓解措施 |
|------|------|---------|
| 零流量 | 高 | Launch Plan: 上线当天社区发帖 + 群分享 |
| 跨域品牌割裂 | 中 | 共享色彩 token + 渐进式统一 |
| ICP 合规 | 低 | Footer 展示备案号 |

**资源风险**:

| 风险 | 概率 | 缓解措施 |
|------|------|---------|
| 独立开发者带宽不足 | 高 | Wave 策略 + 绝对最小集（3 组件）兜底 |
| 截图资产缺失 | 高 | 全面资产降级策略 |
| 跨服务依赖阻塞 | 中 | 所有外部依赖有降级方案，www 可独立发布 |

### Launch Plan（Wave 1 发布日）

| 动作 | 渠道 | 负责 |
|------|------|------|
| 社区发帖（技术介绍 + curl 示例） | V2EX / 掘金 / GitHub | Anita |
| 开发者群分享 | 微信群 / Discord | Anita |
| 邮件通知 | 已有联系人列表 | Anita |
| GitHub repo README 更新 | GitHub | Anita |

**目标**: Wave 1 上线首周 ≥ 50 UV，验证 curl → CTA 转化路径。

---

## Functional Requirements

### 导航与寻路（Navigation & Wayfinding）

- FR1: 访客可通过固定顶部导航栏导航至任意主要区段
- FR2: 访客可展开下拉菜单浏览产品和资源链接列表
- FR3: 访客可从导航栏直接跳转至外部文档站点
- FR4: 访客可通过导航链接或 URL 锚点直达门户区段
- FR5: 访客可通过导航栏活动指示器识别当前所在区段
- FR6: 移动端访客可通过汉堡菜单访问全部导航选项
- FR7: 访客可通过隐藏的 Skip Link 跳至主内容区（无障碍）

### 品牌呈现（Brand Presentation）

- FR8: 访客可在导航栏和页脚看到品牌 Logo
- FR9: 访客可感知全站一致的手绘美学设计语言
- FR10: 访客可在终极 CTA 区段看到品牌标语
- FR11: 访客可在页脚看到 ICP 备案号（法规合规）

### 技术展示（Technical Demonstration）

- FR12: 访客可一键复制 Hero 区段中的可执行 API 命令
- FR13: 访客可查看语法高亮的代码示例
- FR14: 访客可浏览 6 张平台能力卡片
- FR15: 访客可查看仪表盘预览或代码展示区块
- FR16: 访客可查看基础设施亮点摘要
- FR17: 系统在 API 不可达时展示降级状态（预录响应 + 状态提示）
- FR18: 系统在需认证的代码示例上标注"需 API Key"

### 产品发现（Product Discovery）

- FR19: 访客可通过分类产品卡片浏览产品生态
- FR20: 访客可在每张产品卡片中查看截图或代码示例
- FR21: 访客可阅读每个产品的用例描述
- FR22: 访客可从产品卡片跳转至对应产品域名
- FR23: 访客可在产品区附近看到量化统计数字

### 资源访问（Resource Access — Portal）

- FR24: 访客可按 6 个分类浏览门户链接
- FR25: 访客可点击门户链接访问外部工具和资源
- FR26: 回访用户可通过书签/URL 在 3 秒内到达门户区段
- FR27: 系统在锚点直达门户时跳过滚动触发动效
- FR28: 访客可从专设区段导航至 3 个快速入口（API 文档、门户、GuShen）

### AI 辅助（AI Assistance — Conditional）

- FR29: 访客可通过右下角浮动按钮打开 AI Chat 面板
- FR30: 访客可输入问题并接收流式 AI 回复
- FR31: 访客可从预设快捷提示开始对话
- FR32: 系统在 Chat 后端不可用时展示优雅降级提示

### 转化与互动（Conversion & Engagement）

- FR33: 访客可点击主 CTA 按钮跳转至 API Key 注册页
- FR34: 访客可通过次级按钮访问联系页面或文档
- FR35: 访客在浏览过程中遇到中间 CTA 条可提前转化
- FR36: 访客可从导航栏访问 GitHub 仓库链接
- FR37: 系统在 GitHub Star 数超过阈值时显示数字徽标
- FR38: 访客可从页脚访问社交媒体链接（GitHub、Discord）

### 内容管理（Content Management — Admin）

- FR39: 管理员可通过编辑集中数据文件更新网站内容
- FR40: 管理员可在部署前本地预览内容变更
- FR41: 管理员可通过自动化脚本检查外部链接健康状态
- FR42: 管理员可通过数据目录索引找到所有可配置内容位置

### 分析与度量（Analytics & Measurement）

- FR43: 系统通过轻量信标追踪 CTA 点击事件
- FR44: 系统通过轻量信标追踪 AI Chat 打开事件
- FR45: 系统通过轻量信标追踪门户链接点击事件

---

## Non-Functional Requirements

### Performance

详细指标参见 Web App Specific Requirements → Performance Targets 表。

补充要求：

- NFR-P1: 滚动动画帧率 ≥ 60fps（`requestAnimationFrame` 驱动，非 `setInterval`）
- NFR-P2: 一键复制操作延迟 < 100ms（用户感知即时响应）
- NFR-P3: Chat Panel 打开动画 ≤ 300ms（CSS transition，`will-change: transform` GPU 加速）
- NFR-P4: 图片懒加载不得导致可见区域内 CLS 增量（placeholder 占位）
- NFR-P5: 首次有意义绘制（FMP）不得被第三方资源阻塞（零第三方 JS）

### Security

- NFR-S1: 全站 HTTPS 强制 + HSTS header（`Strict-Transport-Security: max-age=31536000`）
- NFR-S2: 所有用户可见文案从数据文件加载时进行 XSS 转义（`v-text` 或模板自动转义，禁止 `v-html` 除非内容为受信常量）
- NFR-S3: Content-Security-Policy header — `default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' fonts.gstatic.com; connect-src 'self' api.lurus.cn; img-src 'self' data:; frame-ancestors 'none'`
- NFR-S4: 外部链接使用 `rel="noopener noreferrer"` 防止 tab-napping
- NFR-S5: 无敏感信息存储于客户端（无 cookie、无 localStorage 个人数据）
- NFR-S6: curl 示例中不硬编码 API Key 或凭证
- NFR-S7: 安全响应头 — `X-Frame-Options: DENY` + `X-Content-Type-Options: nosniff` + `Referrer-Policy: strict-origin-when-cross-origin`
- NFR-S8: 依赖安全 — `bun.lockb` 锁定版本 + CI 运行依赖审计（critical 级漏洞阻断构建）

### Accessibility

详细标准参见 Web App Specific Requirements → Accessibility Level 表。

补充要求：

- NFR-A1: 自动化无障碍扫描通过（axe-core 零 critical/serious violations）
- NFR-A2: 所有可交互元素 focus 顺序符合视觉阅读顺序
- NFR-A3: Chat 流式消息使用 `aria-live="polite"` 不打断屏幕阅读器当前内容
- NFR-A4: 颜色不作为唯一信息传达手段（如错误状态需配文字/图标）

### Integration Resilience

- NFR-I1: api.lurus.cn 不可达时，www 全部静态内容正常展示，仅 curl 演示区显示降级状态
- NFR-I2: Chat 后端不可达时，浮动触发按钮可点击但显示降级提示，不显示错误堆栈
- NFR-I3: 外部产品链接（gushen.lurus.cn 等）不可达时，链接仍可点击（新标签打开），不做客户端可达性检查
- NFR-I4: Google Fonts CDN 不可达时，Caveat 字体降级为系统 serif 字体，不阻塞渲染
- NFR-I5: GitHub Stars API 获取失败时静默降级，仅显示图标链接（不显示错误或数字 badge）
- NFR-I6: OG 图片自托管于构建产物中（不依赖外部 CDN），确保社交分享预览始终可用

### Build & Deploy Quality

- NFR-B1: `bun run build` 零警告（warnings treated as errors in CI）
- NFR-B2: TypeScript strict mode 编译通过，无 `any` 类型逃逸
- NFR-B3: 构建产物 JS bundle ≤ 150KB gzip，CSS bundle ≤ 30KB gzip（超出则 CI 失败）
- NFR-B4: Lighthouse CI 在 `bun run preview`（构建产物预览服务器）上检查 Performance ≥ 90（低于 80 阻断部署）
- NFR-B5: 部署后自动验证首页 HTTP 200 + 关键元素存在（smoke test）
- NFR-B6: 构建时间 ≤ 60s（CI 反馈循环）
- NFR-B7: CDN 缓存策略 — 哈希资产 `Cache-Control: public, immutable, max-age=31536000`；`index.html` `Cache-Control: no-cache`

### 显式排除

- V1 不使用 Service Worker（避免缓存一致性问题，静态站点无离线需求）
- V1 不做 SSR（SSG 预渲染在 Wave 2 实现，V1 用 meta 标签 + sitemap 满足基础 SEO）

