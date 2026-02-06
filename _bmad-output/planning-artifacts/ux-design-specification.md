---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
lastStep: 14
status: complete
completed: 2026-02-03
inputDocuments: [product-brief-www.md, project-context.md]
date: 2026-02-03
author: Anita
project: lurus-www
---

# UX Design Specification lurus-www

**Author:** Anita
**Date:** 2026-02-03

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

lurus-www 是 Lurus 平台的品牌门面与核心转化入口，承载品牌展示、专业知识门户（48 个权威链接）、AI 即时体验三大功能。设计语言为"Artisanal Premium（匠心精品）"— 保留 Caveat 手写字体、纸质纹理、sketchy 边框的独特手绘美学作为品牌差异点，同时注入 Vercel/Linear/Stripe 级别的转化效率与性能标准。

核心情感旅程：好奇（Hero 吸引注意）→ 惊艳（视觉品质超预期）→ 信任（社会证明 + 产品可视化）→ 渴望（AI Chat 即时体验 + 清晰价值）。

### Target Users

- **Developer Chen（P0, ~40% 流量）** — AI API 评估开发者，需 3 秒内理解"统一 AI 网关"定位，通过 curl 示例和 AI Chat 体验产品能力
- **Trader Zhao（P1, ~20% 流量）** — 量化交易探索者，需看到 GuShen 真实界面和自然语言策略示例建立信任
- **Professional Lin（P2, ~30% 流量）** — 知识门户日活用户，需极速加载（LCP < 1.5s）和精选链接的即用体验

### Key Design Challenges

1. **信息焦点** — Hero 区需从四方向等权轮播聚焦到"统一 AI 网关"主定位，建立清晰信息层级
2. **手绘美学精炼** — 控制 sketchy 边框和 Caveat 字体的使用密度，确保传达"匠心"而非"业余"
3. **情感节奏** — 从功能堆叠转为有节奏的情感曲线，每个页面区段对应一个情感阶段
4. **双模式共存** — 同一页面服务日活工具用户（极速、实用）和首次营销访客（说服、转化）

### Design Opportunities

1. **AI Chat 零门槛试驾** — 落地页直接内嵌 AI 对话，无需注册即可体验，竞品无此能力
2. **手绘美学情感连接** — 在千篇一律的极简风 SaaS 网站中创造强烈品牌记忆点
3. **全栈自建叙事可视化** — 让"从 LLM 到量化到邮件全部自建"的技术实力被"看到"而非仅"读到"

## Core User Experience

### Defining Experience

lurus-www 是"认知→信任→行动"型着陆站点，三个并行核心行为：
1. **首次认知形成**（P0）— Hero 3s 分层认知（主定位 + Persona 标签）→ 滚动叙事式证据 → CTA 转化
2. **AI Chat 即时体验**（P0/P1）— 区别于客服 widget 的产品体验入口 → 零注册对话 → 感受 AI 能力 → 被说服
3. **门户日活回访**（P2）— 直达通道（URL 锚点/快速入口）→ 点击链接 → 完成（< 5s，跳过营销内容）

最关键的单一交互："Hero 区 3 秒分层清晰度" — 每个 Persona 在首屏都能找到属于自己的钩子。

### Platform Strategy

- 桌面优先（开发者评估 + 日活门户），移动端 Hero 区基础适配
- 纯 Web SPA（Vue 3 + Vite），静态部署 + CDN，零运维
- 鼠标/键盘主交互，触控作为补充
- 无离线需求，无登录态（Chat 和门户均匿名可用）
- 门户区加载独立于营销区段，支持 URL 锚点直达

### Effortless Interactions

- **页面加载** — LCP < 2.0s，缓存回访 < 1s，日活用户感知"瞬开"
- **门户直达** — 回访用户通过 URL 锚点或页面快速入口跳过营销区段，直达门户链接
- **AI Chat** — 入口设计明确传达"产品体验"而非"客服 widget"；点击即聊，首条回复 < 2s；V1 降级方案：预录对话演示 + "即将开放"
- **区段浏览** — scroll-triggered 渐入自然融入阅读流，回访用户可选择跳过动效
- **CTA 行动** — 按钮文案指向具体行动 + 附近信任徽章，满足 Fogg 模型（动机×能力×触发）
- **微交互触感** — 悬停呼吸效果、点击柔和弹性 = 数字世界的"触感品质"，对应 Moleskine 的材质感

### Critical Success Moments

| 时刻 | 成功信号 | 失败信号 |
|------|---------|---------|
| Hero 首屏 3s | 分层信息：开发者看到"统一 AI 网关 50+ 模型"，量化用户看到"AI 策略"标签 | 信息单一，50% 非开发者用户无共鸣 → 跳出 |
| AI Chat 首次对话（峰值时刻） | 入口醒目且区别于客服，低延迟高质量回复 → "这就是我要的" | 入口像客服 widget 被忽略，或无响应 → "又一个套壳" |
| 产品卡片浏览 | curl 示例 + 产品截图 + 价格信号 → 专业可信 | 纯文字描述 → "精致空壳" |
| 门户首次发现 | 48 个精选链接 → 加入书签 | 链接杂乱 → 不再回访 |
| CTA 点击 → 跨域着陆 | api.lurus.cn 保持视觉一致性和信任延续 | 风格断裂 → "这靠谱吗" |
| 页面结束（终值时刻） | Footer 品牌印记留下"匠心"记忆 | 平淡 Footer → 无品牌记忆 |

### Experience Principles

1. **3 秒分层清晰度** — 每个视窗高度传达 1 个核心信息 + ≤ 3 个支撑元素。Hero 区多层信息让每个 Persona 都能在 3 秒内找到属于自己的钩子
2. **渐进式体验深度** — 按参与度递进解锁：看（首屏价值主张）→ 试（AI Chat 零注册体验）→ 学（产品详情 + 叙事式证据）→ 用（CTA 注册）。含 AI Chat 不可用时的降级方案
3. **性能即信任信号** — LCP < 2.0s 不只是技术指标，而是品牌对品质的承诺。性能本身可作为产品可信度的展示证据
4. **手绘精准触点** — 手绘元素仅在 3 类场景使用：品牌标识、卡片容器、区段情感转折装饰。反向场景（404/空状态/加载）用手绘温暖冷体验。其他场景一律标准设计
5. **叙事式证据** — 数据以故事线呈现（"1 端点 → 50+ 模型 → 省 30% → 680+ 测试"），按节奏递进：Hero 1 个惊叹数据 → 产品区 3 个支撑 → Stats 区完整面板。含定价透明度
6. **信任链不断裂** — 每个页面区段至少包含 1 个信任信号。CTA 跨域跳转需保持视觉一致性。Fogg 模型三要素同时满足才放置 CTA
7. **回访用户快速通道** — 门户区加载独立于营销内容，URL 锚点直达，日活用户不被首次访客的营销流程"惩罚"
8. **峰终设计** — 刻意设计 1 个峰值时刻（AI Chat 首对话的惊喜感）+ 1 个优雅结尾（Footer 品牌印记），中间区段允许平稳节奏

## Desired Emotional Response

### Primary Emotional Goals

- **Developer Chen** — 专业认同 → 技术信任 → 效率渴望："一个端点解决所有问题，这正是我要的"
- **Trader Zhao** — 好奇激发 → 可能性想象 → 安全感："非程序员也能做量化，而且他们认真在做"
- **Professional Lin** — 即时掌控 → 工具依赖 → 偶尔惊喜："每天第一个打开的页面，偶尔发现 AI 还能帮更多"
- **共通情感目标** — "匠心"品牌印记：离开后记住的不是具体功能，而是"这个团队做事的质感不一样"

### Emotional Journey Mapping

| 页面区段 | Chen (评估心态) | Zhao (探索心态) | Lin (工具心态) |
|---------|----------------|----------------|--------------|
| Hero | 专业认同："统一网关，懂我" | 好奇："AI 量化？" | 中性 → 快速跳过 |
| Products | 技术信任：curl 示例验证 | 想象力：看到真实界面 | 跳过 |
| Stats | 数据信服：可验证指标 | 安全感：有人在认真做 | 跳过 |
| Portal | 扫过 | 扫过 | 核心区：掌控感 |
| AI Chat (峰值) | 效率渴望：延迟低质量好 | 行动勇气：真能聊策略 | 惊喜：还能问 AI |
| Footer (终值) | 品牌好感 | 品牌好感 | 品牌好感 |

### Micro-Emotions

| 情感轴 | 目标 | 设计手段 |
|--------|------|---------|
| 信任 vs 怀疑 | 信任 | 可验证证据（curl 结果、Lighthouse 分数、测试覆盖率） |
| 掌控 vs 迷失 | 掌控 | 信息层级清晰、锚点导航、分类标签 |
| 惊喜 vs 无感 | 适度惊喜 | AI Chat 首回复超预期、手绘美学独特感 |
| 效率 vs 拖沓 | 极致效率 | LCP < 2.0s、门户直达、CTA 一步到位 |
| 专业 vs 业余 | 专业 | Golden Ratio 排版、克制手绘密度、术语准确 |
| 温暖 vs 冷淡 | 适度温暖 | Caveat 人情味、纸质纹理质感、错误状态手绘缓和 |

### Design Implications

- **Hero 区** → 触发"专业认同"（Chen）+ "好奇"（Zhao）：分层标题 + 产品色点标签，避免信息过载的"烦躁"
- **产品展示区** → 触发"技术信任"（Chen）+ "想象力"（Zhao）：curl 示例 + 产品截图，避免纯文字的"空壳感"
- **门户区** → 触发"掌控感"（Lin）：分类清晰、加载独立，避免被营销内容拖慢的"烦躁"
- **AI Chat** → 峰值时刻：入口设计传达"产品体验"非"客服"，首条回复质量超预期，触发所有 Persona 的"aha"
- **错误/空状态** → 用手绘风格缓和"挫败"，转化为"温暖"
- **Footer** → 终值时刻：品牌印记设计，让"匠心品质"成为离开时的最后记忆

### Emotional Design Principles

1. **证据触发信任，不是话术** — 用 curl 返回结果、Lighthouse 分数、测试数据说话。禁止"最好的""领先的""强大的"等空洞形容词
2. **手绘温暖技术冷感** — Caveat 字体和纸质纹理的核心作用是为技术内容注入人情味，让开发者工具感觉"有人在用心做"
3. **留白即呼吸** — Section 间距 ≥ 80px 不只是视觉规范，而是让用户在信息区段之间获得情感喘息，防止认知疲劳
4. **尊重回访者的时间** — 日活用户的情感优先级是"效率 > 一切"。任何阻碍 Lin 到达门户的设计元素（动效、弹窗、营销内容）都是情感损害
5. **峰值可控，终值优雅** — AI Chat 首对话是刻意设计的情感高峰；Footer 品牌印记是刻意设计的优雅收尾。中间区段允许平稳，不追求处处高潮
6. **错误即温暖机会** — 404、网络断开、Chat 无响应等"冷"场景是使用手绘风格的最佳时机。把挫败转化为"这个团队连错误页面都用心了"

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Claude (claude.ai)** — "安静的专业感"
- 极度克制的界面，所有视觉空间让给内容
- 流式文本输出创造 AI 临场感；Markdown 渲染 + 一键代码复制
- 单一焦点：引导用户开始对话，不做多余展示
- 启示：AI Chat Sidebar 的质感标杆 — 安静、流畅、专业

**Gemini (gemini.google.com)** — "友好的智能"
- Quick Prompts 卡片降低空白输入框的启动焦虑
- 三层信息（定位 + 输入框 + 能力卡片），零认知负担
- 圆润设计语言传达温暖与现代感
- 启示：Quick Prompts 模式直接适用于 AI Chat；卡片布局可适配 sketchy 风格

**Google (google.com)** — "极致直达"
- 人类最成功的"3 秒清晰度"设计 — 一个输入框，全世界都懂
- 日活回访的终极标杆：零干扰 + 极速 + 每次直达目标
- 速度本身就是品牌和信任
- 启示：门户区的体验标准 — Lin 的每次回访应达到 Google 级别的直达感

### Transferable UX Patterns

**导航与信息架构：**
- 单一焦点首屏（Google）→ Hero 区一个核心价值主张 + 一个主 CTA
- 渐进式信息展开（Claude）→ 每个滚动区段只展开一个主题
- Quick Access 入口（Google）→ Navbar 门户直达按钮

**交互：**
- 流式文本输出（Claude）→ AI Chat 逐字渐显
- Quick Prompts 卡片（Gemini）→ AI Chat 预设提示消除空输入框焦虑
- 一键复制代码块（Claude）→ curl 示例 hover 显示复制按钮
- 即时反馈（Google）→ 门户链接零等待新标签打开

**视觉：**
- 极致留白（Google/Claude）→ Section 间距 + Hero 呼吸空间 = 高端感载体
- 内容即装饰（Claude）→ curl 代码块本身就是视觉元素
- 柔和过渡（Gemini）→ scroll-triggered 渐入平滑不突兀

### Anti-Patterns to Avoid

- **功能堆砌首页** — Hero 不试图同时说 4 件事
- **过度动效** — 手绘动画不是每个元素都加，否则从"独特"变"烦躁"
- **客服 Widget 外观** — AI Chat 入口必须区别于 Intercom/Zendesk 样式
- **假对话 Demo** — 预录演示必须标注"示例"，否则损害信任
- **信息密度过高** — 非技术用户不应被密集术语吓退
- **跨域风格断裂** — www → api.lurus.cn 的视觉连续性

### Design Inspiration Strategy

**Adopt（直接采用）：**
- Claude 内容即装饰 → curl/API 响应作为视觉元素
- Google 极速直达 → 门户区"来了就用"标准
- Claude 流式输出 + 代码复制 → AI Chat 核心交互
- Gemini Quick Prompts → AI Chat 预设提示卡片

**Adapt（改造适配）：**
- Google 单一焦点 → "分层焦点"Hero（主 API + 次级 Persona 标签）
- Claude 安静专业 → 注入 Caveat 手绘温暖作为品牌调味
- Gemini 卡片布局 → sketchy 边框卡片替代圆润卡片

**Avoid（明确回避）：**
- Google 极端去装饰 → 需保留品牌记忆点
- Gemini 渐变色彩 → 与 Cream/Ink/Ochre 体系冲突
- 深色默认主题 → V1 保持暖白纸质基调

## Design System Foundation

### Design System Choice

**Custom Design System on Tailwind CSS v4** — 保留并扩展现有自定义设计系统。

lurus-www 已具备完整的自定义设计系统基础（色彩 token、Golden Ratio 排版、Fibonacci 间距、手绘风格组件），构建在 Tailwind CSS v4 的 CSS-first 配置之上。本次 UX 规范不是重建设计系统，而是在现有基础上补充缺失的交互层和组件规范。

### Rationale for Selection

1. **品牌独特性** — "匠心手绘"美学是核心差异点，任何预制 UI 库都无法提供
2. **技术匹配** — Tailwind v4 `@theme {}` 配置与已有 CSS 自定义属性设计 token 天然兼容
3. **性能优化** — 自定义系统无冗余组件代码，CSS Bundle < 30KB gzip 目标可达
4. **团队效率** — 2 人团队无需大型组件库治理开销，轻量自定义更高效
5. **已有投入** — 色彩、排版、间距、手绘风格均已实现并在生产使用

### Implementation Approach

**现有层（保持不变）：**
- 色彩系统：Cream / Ink / Ochre / Product / Portal token
- 排版系统：Golden Ratio 尺度 + Caveat/Noto Sans SC
- 间距系统：Fibonacci 数列
- 基础组件：card-sketchy、btn-hand、rounded-sketchy

**新增层（本次 UX 规范驱动）：**
- 动效系统：scroll-triggered 渐入类（`.fade-in-up`、`.fade-in-left`）+ 微交互状态类（`.hover-breathe`、`.click-elastic`）
- 代码展示组件：`.code-showcase` 深色卡片 + 语法高亮 + 一键复制
- AI Chat 设计 token：气泡样式、Quick Prompts 卡片、流式输出容器
- 状态组件：错误/空状态手绘插图样式（`.state-empty`、`.state-error`）
- 导航增强：门户快速入口按钮 + URL 锚点系统

### Customization Strategy

**手绘元素使用规则（精准触点原则）：**

| 使用场景 | 手绘元素 | 示例 |
|---------|---------|------|
| 品牌标识 | Caveat 字体 | Logo、Hero 装饰文字、Footer 品牌签名 |
| 卡片容器 | sketchy 圆角 + paper-texture | 产品卡片、门户卡片、Chat 气泡 |
| 情感转折 | 手绘装饰图案 | 区段过渡分隔线、引用装饰 |
| 冷场景温暖 | 手绘插图 | 404 页面、空状态、加载等待 |
| **禁用场景** | 标准设计 | 表单控件、导航栏、数据表格、代码块 |

**动效层级规则：**

| 层级 | 动效类型 | 持续时间 | 使用场景 |
|------|---------|---------|---------|
| L1 微交互 | hover/focus 状态变化 | 150-200ms | 按钮、链接、卡片 |
| L2 过渡 | 组件出现/消失 | 300-400ms | Chat 面板展开、模态框 |
| L3 叙事 | scroll-triggered 渐入 | 500-700ms | 页面区段首次进入视口 |
| 全局 | `prefers-reduced-motion` | 0ms | 尊重用户系统设置，禁用所有动效 |

## Defining Core Experience

### Defining Experience

> "一个开发者工具官网，让你不用注册就能直接和 AI 对话验证产品 — 而且它看起来像一本手工笔记本。"

三个记忆锚点：零门槛试用 + AI 即时验证 + 手绘美学。
用户会怎么说：Chen "直接能试 AI"，Zhao "能看到真实界面"，Lin "48 个链接天天用"。

### User Mental Model

- **Chen** — "API 选型 = 文档 + Playground + 定价"。破局：把 Playground 前置到官网（AI Chat），打破"先注册后试用"惯例
- **Zhao** — "投资工具 = 看截图判断专业度"。破局：嵌入 GuShen 真实截图 + 自然语言策略流程展示
- **Lin** — "起始页 = 打开即用"。破局：比 Chrome 新标签页更好的专业领域精选门户

### Success Criteria

| 标准 | 度量 | 通过条件 |
|------|------|---------|
| 秒懂 | Hero 认知测试 | 5 人中 ≥ 4 人 3s 内理解定位 |
| 能试 | Chat 首次使用流程 | 看到入口到发消息 ≤ 2 步 |
| 可信 | 产品卡片证据密度 | 每卡 ≥ 1 可验证证据 |
| 直达 | 门户到达时间 | 回访用户 ≤ 3s 点击首个链接 |
| 记住 | 品牌印象 | 离开后能回忆"手绘风格" |

### Novel UX Patterns

- **分层 Hero**（已有模式创新组合）— 多 Persona 同时命中的分层信息首屏
- **Chat = 产品试驾**（半新模式）— 官网嵌入 Chat 用于产品体验而非客服
- **门户嵌入品牌官网**（新组合）— 知识导航门户与品牌官网合一，形成回访引力
- **手绘开发者工具**（视觉创新）— 行业独一无二，需精准克制使用
- 用户教育需求极低 — 交互模式均已熟悉，创新在组合不在操作

### Experience Mechanics

**流程 A — Hero → CTA 转化：**
着陆 → 3s 分层扫描（主标题 + 利益点 + Persona 标签）→ 滚动叙事式证据 → CTA + 信任徽章 → 跨域着陆

**流程 B — AI Chat 零门槛试驾（峰值）：**
Chat 入口（非客服样式）→ Quick Prompts 消除焦虑 → 流式输出超预期回复 → 面板底部柔和 CTA 自然转化

**流程 C — 门户日活回访（工具流）：**
页面加载（< 1.5s 缓存）→ Navbar/锚点直达 #portal → 6 分类即时可见 → 点击链接新标签 → 完成（< 5s）

## Visual Design Foundation

### Color System

**核心色板（CSS 自定义属性）：**

| Token 组 | 色值范围 | 语义用途 |
|---------|---------|---------|
| `cream-50` #FFFDF7 → `cream-300` #F5E6B8 | 暖白到浅金 | 页面背景(50)、卡片背景(100)、悬停态(200)、边框(300) |
| `ink-900` #2C2416 → `ink-100` #D4CCC0 | 深棕到浅灰 | 主文字(900)、次文字(700)、弱文字(500)、占位符(300)、禁用(100) |
| `ochre` #C9A227 | 金色 | 主强调色、CTA 按钮、焦点环、品牌标识 |

**产品色：**

| Token | 色值 | 产品 |
|-------|------|------|
| `product-api` | #6B8BA4 石板蓝 | Lurus API 网关 |
| `product-gushen` | #7D8B6A 鼠尾草绿 | GuShen 量化 |
| `product-switch` | #C67B5C 赤陶橙 | Switch 桌面 |
| `product-docs` | #C9A227 赭金 | Lurus Docs |

**门户分类色：**

| Token | 色值 | 分类 |
|-------|------|------|
| `portal-academic` | #8B6B7D | 学术 |
| `portal-finance` | #7D8B6A | 金融 |
| `portal-ai` | #6B8BA4 | AI |
| `portal-engineering` | #C67B5C | 工程 |
| `portal-medical` | #4A8B6A | 医学 |
| `portal-legal` | #8B4A6A | 法律 |

**色彩使用规则：**
- 禁止 Tailwind 默认调色板（`bg-blue-500` 等）
- 禁止硬编码十六进制值（`bg-[#FFFDF7]`）
- 所有色彩通过 token 引用
- 对比度遵循 WCAG 2.1 AA：正文 ≥ 4.5:1，大标题 ≥ 3:1

**状态色：**

| 场景 | 色彩 | 说明 |
|------|------|------|
| 成功/在线 | `portal-medical` #4A8B6A | 柔和绿 |
| 警告/注意 | `ochre` #C9A227 | 复用品牌金色 |
| 错误/离线 | `product-switch` #C67B5C + 手绘风格 | 赤陶橙 + 温暖插图 |
| 信息/提示 | `product-api` #6B8BA4 | 石板蓝 |

### Typography System

**字体配对：**

| 字体 | 用途 | 加载策略 |
|------|------|---------|
| **Caveat** | 手写品牌装饰 — 仅 Logo、Hero 装饰、Footer 签名（≤ 3 处） | 预加载，font-display: swap |
| **Noto Sans SC** | 中文正文、所有功能性文字 | 预加载，font-display: swap |
| 系统 sans-serif | 英文正文回退 | 无需加载 |

**Golden Ratio (φ = 1.618) 排版尺度：**

| Token | 尺寸 | 行高 | 用途 |
|-------|------|------|------|
| `phi-3xl` | 68px | 1.3 | Hero 主标题 |
| `phi-2xl` | 42px | 1.4 | 页面标题 |
| `phi-xl` | 26px | 1.6 | Section 标题 |
| `phi-lg` | 20px | 1.65 | 小标题、导航 |
| `phi-base` | 16px | 1.75 | 正文、段落 |
| `phi-sm` | 14px | 1.7 | 辅助文字、标签 |
| `phi-xs` | 12px | 1.6 | 徽章、注释 |

**排版规则：**
- Caveat 仅装饰性使用，不用于精确阅读文字
- 正文行宽 ≤ 75 字符（中文约 37 字）
- 每个视窗高度文字层级 ≤ 3 级
- 代码展示区使用等宽字体

### Spacing & Layout Foundation

**Fibonacci 间距系统：**

| Token | 值 | 用途 |
|-------|-----|------|
| `fib-1` | 5px | 图标与标签间距 |
| `fib-2` | 8px | 紧凑元素间距 |
| `fib-3` | 13px | 组件内部填充 |
| `fib-4` | 21px | 组件之间间距 |
| `fib-5` | 34px | 区块内部间距 |
| `fib-6` | 55px | 小区段间距 |
| `fib-7` | 89px | 大区段间距（Section 之间 ≥ 80px）|

**布局原则：**
- 大面积留白为核心高端感载体 — Section 间距 ≥ 80px
- 内容居中最大宽度：桌面 1200px / 平板 768px / 移动 100%
- 每个视窗 1 核心信息，不在同一屏幕高度内堆叠多个主题
- Mobile-first 响应式，`sm:`/`md:`/`lg:` 断点递进

**网格系统：**
- 12 列网格（桌面），gap = fib-4 (21px)
- 卡片网格：桌面 3 列 / 平板 2 列 / 移动 1 列
- 门户区：桌面 4 列 × 2 行每分类 / 平板 2 列 / 移动 1 列
- Hero 区：全宽，内容居中，最大宽度 960px

### Accessibility Considerations

| 要求 | 实现 |
|------|------|
| 色彩对比度 | ink-900 on cream-50 ≥ 4.5:1；ink-700 on cream-50 ≥ 3:1 |
| 键盘导航 | 所有交互元素可 Tab 聚焦，ochre 焦点环 |
| 屏幕阅读器 | 所有交互元素 aria-label / aria-labelledby |
| 语义化 HTML | `<nav>`、`<main>`、`<section>`、`<article>` |
| 减弱动效 | `prefers-reduced-motion: reduce` 禁用所有动画 |
| 字体缩放 | rem 单位，支持浏览器缩放 200% |
| 图片替代 | 所有图片 `alt` 属性，装饰性 `alt=""` |
| 外部链接 | `target="_blank" rel="noopener noreferrer"` + 视觉标记 |

**手绘风格无障碍注意：**
- sketchy 边框不作为唯一交互状态指示（需配合色彩/图标）
- Caveat 字体不用于辅助文字（视觉辨识度较低）
- 纸质纹理 opacity 不影响文字对比度

## Design Direction Decision

### Design Directions Explored

在"Artisanal Premium"视觉框架内探索了 4 个页面编排方向：
- **A 叙事卷轴** — 经典线性叙事，节奏清晰但门户直达差
- **B 双入口** — Hero 左叙事右 Chat 预览，Navbar 双入口兼顾首次和回访
- **C 门户优先** — 门户紧跟 Hero，回访极速但转化叙事被压缩
- **D 沉浸 Chat** — 首屏即对话，差异化最强但依赖后端且非常规

### Chosen Direction

**Direction B "双入口"** — 兼顾首次转化与回访直达的平衡方案。

**页面编排：**

```
[Navbar] — 固定顶部
  左：Logo（Caveat）
  中：页面导航（Products / Portal / Pricing / About）
  右：[门户链接] 快速入口按钮 + [获取 API Key] 主 CTA

[Hero] — 左右分栏
  左 60%：主标题（phi-3xl）+ 利益点副标题 + 产品色点标签行 + 主 CTA + 次 CTA
  右 40%：AI Chat 预览窗口（Quick Prompts 可见，可展开为完整面板）
  V1 降级：右侧替换为产品界面截图轮播

[Products] — 左图右文交替排列
  API 卡片：左侧 curl 代码块（.code-showcase）+ 右侧说明 + "复制"按钮
  GuShen 卡片：左侧说明 + 右侧产品截图
  其他产品：sketchy 卡片网格

[Stats] — 横向数据条
  4 个核心指标（scroll-triggered 计数动画）
  每个指标附带一句信任说明

[Portal] — 全宽分类网格
  6 分类标签（sticky 或 tab 切换）× 8 链接每分类
  URL 锚点 #portal 支持直达

[Pricing] — 并排定价卡片
  sketchy 边框，ochre 强调推荐方案

[Footer] — 终值时刻
  Caveat 品牌签名 + 极简链接 + "匠心"品牌印记

[AI Chat] — 双形态
  Hero 内：预览窗口（Quick Prompts + 输入框）
  滚动离开 Hero 后：右侧浮动按钮，点击展开完整面板
```

### Design Rationale

1. **Navbar 双入口** — [门户链接] 让 Lin 一键直达 #portal，[获取 API Key] 让 Chen 随时可转化
2. **Hero 左右分栏** — 左侧承载转化叙事，右侧暴露 AI Chat 预览，二者不互相干扰
3. **AI Chat 双形态** — Hero 内嵌预览 → 滚动后浮动按钮，解决 Chat 发现性问题，且不占用非 Hero 区视觉空间
4. **V1 降级设计** — 若 AI Chat 后端不可用，右侧降级为产品截图轮播，不影响页面完整性
5. **Products 左右交替** — 避免单调卡片网格，创造阅读节奏感
6. **Portal 锚点直达** — #portal URL + Navbar 快速按钮，Lin 回访 < 3s 到达目标

### Implementation Approach

**开发优先级：**
1. Navbar（含门户快速入口按钮）→ Hero 左侧（文案 + CTA）→ Hero 右侧（V1 降级为截图轮播）
2. Products 区（curl 示例优先）→ Stats 区 → Portal 区
3. Pricing → Footer
4. AI Chat 双形态（当后端端点就绪时接入）
5. Scroll-triggered 动效（最后打磨层）

**关键组件开发顺序：**
- `.code-showcase` 代码展示卡片（Products 区核心）
- Hero 左右分栏响应式布局（移动端堆叠为上下）
- Portal 分类标签 + 网格（含 #portal 锚点）
- AI Chat 预览窗口 ↔ 浮动面板切换逻辑
- scroll-triggered `.fade-in-up` 动效系统

## User Journey Flows

### Journey 1: Developer Chen — API 评估转化流

**入口：** 搜索引擎/技术社区链接 → lurus.cn
**心理模式：** "API 选型 = 文档 + Playground + 定价"
**破局点：** 把 Playground 前置到官网（AI Chat），打破"先注册后试用"惯例

```mermaid
flowchart TD
    A[着陆 lurus.cn] --> B{Hero 左侧<br/>3s 分层扫描}
    B -->|读到 统一AI网关<br/>50+ 模型| C[认知形成 ✓]
    B -->|信息不清晰| X1[跳出 ✗]

    C --> D{下一步行为}
    D -->|注意到右侧<br/>AI Chat 预览| E[点击 Quick Prompt<br/>或输入问题]
    D -->|继续向下滚动| F[Products 区<br/>curl 代码示例]
    D -->|点击 Navbar<br/>获取 API Key| G[跨域 → api.lurus.cn]

    E --> H[AI Chat 展开<br/>为完整面板]
    H --> I{首条回复质量}
    I -->|延迟低 质量好| J[峰值时刻 ✓<br/>"这就是我要的"]
    I -->|无响应/质量差| K[关闭 Chat<br/>继续滚动浏览]

    J --> L[面板底部柔和 CTA<br/>"获取你自己的 API Key"]
    L --> G

    F --> M[看到 curl 示例<br/>OpenAI 兼容格式]
    M --> N{信任判断}
    N -->|curl 可复制验证<br/>+ 真实端点格式| O[技术信任建立 ✓]
    N -->|纯文字描述| X2[怀疑 ✗]

    O --> P[继续滚动<br/>→ Stats 区]
    P --> Q[看到 50+ 模型<br/>680+ 测试<br/>99.9% 可用性]
    Q --> R[信任强化 ✓]

    R --> S{CTA 决策}
    S -->|点击 主CTA<br/>+ 信任徽章可见| G
    S -->|点击 次CTA<br/>查看文档| T[api.lurus.cn/docs]

    K --> F

    G --> U[api.lurus.cn 着陆<br/>视觉一致性 ✓]
    U --> V[注册 → 获取 Key<br/>→ 集成到项目]

    style J fill:#C9A227,color:#2C2416
    style X1 fill:#C67B5C,color:#fff
    style X2 fill:#C67B5C,color:#fff
```

**关键决策点与设计应对：**

| 决策点 | 用户内心 | 设计应对 |
|--------|---------|---------|
| Hero 3s 扫描 | "这是什么？跟我有关吗？" | 主标题聚焦 API 网关 + 产品色点标签让 Chen 立刻定位 |
| Chat 预览 vs 滚动 | "右边那个能试吗？" | Quick Prompts 降低启动焦虑，视觉传达"产品体验"非"客服" |
| Chat 首条回复 | "延迟多少？质量如何？" | < 2s 首 token，流式输出，Markdown 渲染 |
| curl 示例 | "兼容 OpenAI 吗？" | 展示完整 curl 命令 + 响应 JSON，一键复制 |
| CTA 跨域 | "api.lurus.cn 靠谱吗？" | CTA 旁信任徽章 + 跨域视觉一致 |

**V1 降级路径：** AI Chat 后端不可用时，右侧显示产品截图轮播 + "AI Chat 即将开放" Badge。Chen 转为滚动浏览路径，curl 示例承载主要说服力。

### Journey 2: Trader Zhao — 量化产品探索流

**入口：** 朋友分享链接 / 论坛帖子 → lurus.cn
**心理模式：** "投资工具 = 看截图判断专业度"
**破局点：** 嵌入 GuShen 真实截图 + 自然语言策略流程展示

```mermaid
flowchart TD
    A[点击分享链接<br/>着陆 lurus.cn] --> B{Hero 左侧<br/>分层扫描}
    B -->|看到 量化交易<br/>产品色点标签| C[注意到 AI 量化<br/>关键词命中]
    B -->|只看到 API 网关<br/>无共鸣| D{向下滚动<br/>或离开}
    D -->|离开| X1[跳出 ✗]
    D -->|继续滚动| E

    C --> E[滚动到<br/>Products 区]

    E --> F{GuShen 产品卡}
    F -->|看到真实截图<br/>+ 策略示例| G[产品可信度 ✓<br/>"有截图 = 真做了"]
    F -->|只有文字描述| X2[怀疑 ✗<br/>"又是画饼"]

    G --> H[看到自然语言<br/>策略描述示例]
    H --> I{理解判断}
    I -->|"不用写代码<br/>也能量化"| J[核心价值命中 ✓]
    I -->|看不懂流程| K[继续向下<br/>寻找更多信息]

    J --> L{下一步行为}
    L -->|点击 GuShen<br/>产品详情 CTA| M[跨域 → gushen.lurus.cn]
    L -->|尝试 AI Chat<br/>问量化问题| N[Chat 面板展开]

    N --> O{Chat 回复<br/>包含策略示例?}
    O -->|是 — 具体可行| P[行动勇气 ✓<br/>"真能帮我做"]
    O -->|否 — 泛泛而谈| Q[失望 → 关闭 Chat]

    P --> M

    K --> R[Stats 区<br/>680+ 回测测试]
    R --> S[安全感 ✓<br/>"有人认真在做"]
    S --> L

    M --> T[GuShen 平台<br/>注册 → 创建策略]

    style J fill:#C9A227,color:#2C2416
    style P fill:#C9A227,color:#2C2416
    style X1 fill:#C67B5C,color:#fff
    style X2 fill:#C67B5C,color:#fff
```

**关键决策点与设计应对：**

| 决策点 | 用户内心 | 设计应对 |
|--------|---------|---------|
| Hero 多 Persona 扫描 | "这跟量化有关吗？" | 产品色点标签含 GuShen 鼠尾草绿标签 |
| 产品卡视觉 | "做到什么程度了？" | 左侧说明 + 右侧 GuShen 真实截图（非 mockup） |
| 策略理解 | "我不会编程也行？" | 自然语言输入 → AI 输出策略代码的示例流程图 |
| 信任建立 | "回测数据可靠吗？" | 680+ 测试覆盖 + 可视化的回测曲线截图 |

**移动端适配：** Zhao 可能手机首次发现 → 桌面深入。移动端 Hero 精简为单行标题 + GuShen 标签突出，产品区堆叠为上下布局。

### Journey 3: Professional Lin — 门户日活回访流

**入口分为两条路径：首次发现 vs 日活回访**
**心理模式：** "起始页 = 打开即用"
**破局点：** 比 Chrome 新标签页更好的专业领域精选门户

```mermaid
flowchart TD
    subgraph 首次发现
        A1[搜索/同事分享<br/>着陆 lurus.cn] --> B1{Hero 区<br/>快速扫描}
        B1 -->|看到 Navbar<br/>门户链接 按钮| C1[点击直达<br/>#portal 锚点]
        B1 -->|滚动浏览<br/>经过营销区段| D1[到达 Portal 区]

        C1 --> E1
        D1 --> E1[门户区可见<br/>6 分类 × 48 链接]

        E1 --> F1{链接价值判断}
        F1 -->|精选且分类清晰| G1[实用价值 ✓<br/>"这些正好需要"]
        F1 -->|链接杂乱| X1[离开 ✗]

        G1 --> H1[点击 2-3 个链接<br/>验证质量]
        H1 --> I1{加入书签?}
        I1 -->|是| J1[添加书签/固定标签]
        I1 -->|否| K1[记住但不收藏]
    end

    subgraph 日活回访
        A2[打开书签/固定标签<br/>lurus.cn#portal] --> B2[页面加载<br/>缓存 < 1s]
        B2 --> C2[Navbar 门户链接<br/>快速入口 + 锚点<br/>跳过所有营销区段]
        C2 --> D2[Portal 区<br/>即时可见]
        D2 --> E2[点击目标链接<br/>新标签打开]
        E2 --> F2[完成 ✓<br/>全程 < 5s]
    end

    subgraph 转化跨越
        J1 --> A2
        K1 -.->|下次需要时| A2
        F2 -.->|偶然注意到<br/>AI Chat 浮动按钮| G2[点击展开 Chat]
        G2 --> H2[问一个专业问题]
        H2 --> I2{回复有用?}
        I2 -->|是| J2[惊喜 ✓<br/>"还能问 AI"]
        I2 -->|否| K2[关闭 返回门户]
        J2 -.->|逐步发现<br/>更多功能| L2[注册 API/GuShen<br/>从门户用户 → 付费用户]
    end

    style F2 fill:#C9A227,color:#2C2416
    style J2 fill:#C9A227,color:#2C2416
    style X1 fill:#C67B5C,color:#fff
```

**关键设计要求 — 极速通道：**

| 要求 | 实现 | 度量 |
|------|------|------|
| 缓存加载 | Service Worker / HTTP 缓存 → LCP < 1s | Web Vitals |
| 跳过营销 | `#portal` 锚点 + Navbar 一键跳转 | 到达时间 < 3s |
| 零干扰 | 无弹窗、无动效阻拦（回访用户跳过 scroll-triggered 动效）| 主观评估 |
| 新标签打开 | `target="_blank" rel="noopener noreferrer"` | 功能测试 |
| 分类清晰 | 6 分类标签 sticky 固定，视觉层级明确 | 用户测试 |

### Journey Patterns

**导航模式：**
- **Navbar 双入口分流** — 门户按钮 → #portal（工具用户）；主 CTA → 注册（营销用户）。一个 Navbar 同时服务两种心态
- **锚点直达** — #portal、#products、#pricing 支持外部链接直达特定区段
- **渐进式向下滚动** — 首次访客沿 Hero → Products → Stats → Portal → Pricing → Footer 自然阅读

**决策模式：**
- **证据驱动决策** — 每个决策点附近至少 1 个可验证证据（curl 结果、截图、数据）
- **双 CTA 降压** — 主 CTA（高承诺：注册）+ 次 CTA（低承诺：看文档），减轻决策压力
- **Chat 内自然转化** — Chat 面板底部柔和 CTA，对话中自然推荐相关产品

**反馈模式：**
- **视觉进度** — scroll-triggered 渐入让用户感知"在前进"，不是无尽滚动
- **微交互确认** — 按钮点击弹性反馈、复制成功 toast、Chat 打字指示器
- **跨域一致性** — www → api.lurus.cn / gushen.lurus.cn 保持色彩/字体/间距视觉延续

**错误恢复模式：**
- **Chat 降级** — 后端不可用 → 产品截图轮播 + "即将开放" Badge（不给空白框）
- **网络中断** — 手绘风格提示页（温暖感）+ 重试按钮
- **链接失效** — 门户链接 404 → 优雅提示 + 同分类替代推荐

### Flow Optimization Principles

1. **最短路径到价值** — Chen 最快 2 步到 AI Chat（看到 → 点击 Quick Prompt）；Lin 最快 1 步到门户（打开 → 锚点跳转）。移除所有不必要中间步骤
2. **认知负载最小化** — 每个视窗高度只传达 1 个决策。Hero 不同时要求"理解定位 + 选择产品 + 开始 Chat"
3. **失败不卡死** — 任何节点失败都有旁路：Chat 不可用 → 滚动浏览；截图未加载 → 文字描述仍可理解；跨域加载慢 → 进度指示
4. **回访零摩擦** — 日活用户不被首次访客的营销流程"惩罚"。门户加载独立、动效跳过、缓存极速
5. **峰值体验唯一** — AI Chat 首次对话是唯一刻意设计的峰值，不在每个区段都追求"惊喜"。中间区段允许平稳节奏

## Component Strategy

### Design System Components

**已有基础层（保持不变）：**

| 组件/Token | 类型 | 当前状态 | 覆盖旅程 |
|-----------|------|---------|---------|
| `card-sketchy` | CSS 类 | 生产可用 | 产品卡、门户卡 |
| `btn-hand` | CSS 类 | 生产可用 | CTA 按钮 |
| `rounded-sketchy` | CSS 类 | 生产可用 | 卡片容器 |
| Cream/Ink/Ochre tokens | CSS 变量 | 生产可用 | 全站 |
| Product/Portal 色彩 | CSS 变量 | 生产可用 | Products/Portal 区 |
| Golden Ratio 排版 | CSS 变量 | 生产可用 | 全站 |
| Fibonacci 间距 | CSS 变量 | 生产可用 | 全站 |
| `float` / `wiggle` 动画 | CSS 动画 | 需替换为 scroll-triggered | 装饰元素 |

**已有组件架构（需改造/扩展）：**

| 目录 | 组件 | 状态 | 改造需求 |
|------|------|------|---------|
| `Layout/` | Navbar, Footer | 生产可用 | Navbar 增加门户快速入口 + 双 CTA；Footer 增加品牌签名 |
| `Hero/` | HeroSection | 需重构 | 从打字动画重构为左右分栏 + 分层信息 |
| `Chat/` | 7 个子组件 | 生产可用 | 增加 Hero 预览模式 + 浮动按钮模式 |
| `Products/` | ProductShowcase | 需增强 | 增加 curl 代码展示 + 产品截图 |
| `Portal/` | 门户链接网格 | 生产可用 | 增加 sticky 分类标签 + #portal 锚点 |
| `Features/` | 特性网格 | 保持 | 微调间距对齐新规范 |
| `Pricing/` | 定价卡片 | 保持 | 微调 sketchy 样式 |
| `Download/` | 下载区 | 保持 | 无改动 |

### Custom Components

#### CodeShowcase — 代码展示卡片

**Purpose：** 展示 curl API 调用示例，让 Developer Chen 验证 OpenAI 兼容性。
**Usage：** Products 区 API 卡片内，作为核心说服元素。

```
┌─────────────────────────────────────┐ ← 深色背景 (ink-900)
│ $ curl                    [Copy] 📋 │ ← 语言标签 + 复制按钮
│ ─────────────────────────────────── │
│ curl https://api.lurus.cn/v1/chat  │ ← 语法高亮
│   -H "Authorization: Bearer $KEY"  │
│   -d '{"model": "gpt-4o",         │
│        "messages": [...]}'         │
│                                     │
│ Response:                           │
│ {"choices": [{"message": {...}}]}   │ ← 响应 JSON
└─────────────────────────────────────┘
```

| 属性 | 规格 |
|------|------|
| **States** | default, hover（Copy 按钮高亮）, copied（"Copied!" toast 2s） |
| **Variants** | compact（3 行，Products 卡内）, expanded（完整请求+响应） |
| **Accessibility** | `role="code"`, `aria-label="API 调用示例"`, Tab 聚焦 Copy 按钮 |
| **Interaction** | 点击 Copy → 复制完整命令到剪贴板 → toast 反馈 |
| **Styling** | `bg-ink-900 text-cream-50 font-mono rounded-lg`，非 sketchy 圆角（代码块禁用手绘风格） |

#### HeroSplit — 左右分栏 Hero

**Purpose：** 左右分栏 Hero 布局，左侧承载转化叙事，右侧 AI Chat 预览或产品截图轮播。
**Usage：** 首页 Hero 区，作为全站第一屏。

```
Desktop (≥ 1024px):
┌────────────────────────────────────────────────────────┐
│  左 60%                      │  右 40%                  │
│                              │                          │
│  phi-3xl 主标题               │  ┌──────────────────┐   │
│  phi-lg 利益点副标题           │  │ ChatPreview      │   │
│                              │  │ Quick Prompts    │   │
│  [产品色点标签行]              │  │ ────────────     │   │
│                              │  │ 输入框           │   │
│  [主 CTA]  [次 CTA]          │  └──────────────────┘   │
└────────────────────────────────────────────────────────┘

Mobile (< 768px):
┌──────────────────────┐
│  主标题（精简版）       │
│  利益点               │
│  [主 CTA]             │
│  ──────              │
│  产品截图（非 Chat）   │
└──────────────────────┘
```

| 属性 | 规格 |
|------|------|
| **States** | default, chat-available（右侧显示 ChatPreview）, chat-unavailable（右侧显示截图轮播） |
| **Responsive** | Desktop: 60/40 分栏 → Tablet: 55/45 → Mobile: 堆叠，右侧收起 |
| **Accessibility** | `<section aria-label="Hero">`, 主标题 `<h1>`, CTA 为 `<a>` 或 `<button>` |
| **Interaction** | 左侧纯展示 + CTA 点击；右侧 ChatPreview 可交互展开为完整面板 |
| **Styling** | 最大宽度 1200px 居中，左侧 `fib-7` 上下内边距，右侧带 `card-sketchy` 容器 |

#### ChatPreview — Chat 预览窗口

**Purpose：** Hero 区内嵌的 AI Chat 预览窗口，传达"产品体验"非"客服 widget"。
**Usage：** HeroSplit 右侧 40% 区域，作为 Chat 发现入口。

| 属性 | 规格 |
|------|------|
| **Content** | 2-3 个 Quick Prompts 卡片 + 输入框 + "由 Lurus AI 驱动" 微标签 |
| **States** | idle（显示 Quick Prompts）, active（用户输入，触发展开为完整面板）, unavailable（显示截图 + Badge） |
| **Accessibility** | `aria-label="AI 对话体验"`, Quick Prompts 为 `<button>`, 输入框有 `placeholder` + `aria-label` |
| **Interaction** | 点击 Quick Prompt → 展开为完整 Chat 面板（复用 AIChatSidebar）；点击输入框 → 同上 |
| **Styling** | `card-sketchy` 容器，`bg-cream-50` 背景，高度固定适配 Hero |
| **V1 降级** | `unavailable` 状态：替换为产品截图轮播 + "AI Chat 即将开放" `TrustBadge` |

#### ChatFloatingTrigger — 浮动触发按钮

**Purpose：** 用户滚动离开 Hero 后，右下角浮动按钮作为 Chat 持续入口。
**Usage：** 滚动超过 Hero 区后出现，点击展开完整 Chat 面板。

| 属性 | 规格 |
|------|------|
| **States** | hidden（Hero 区可见时）, visible（Hero 不可见时，带 fade-in 过渡）, expanded（Chat 面板展开后隐藏） |
| **Accessibility** | `aria-label="打开 AI 对话"`, `<button>`, 键盘 Tab 可聚焦 |
| **Interaction** | 点击 → 展开 AIChatSidebar → 按钮隐藏；关闭 Chat → 按钮重新出现 |
| **Styling** | 固定右下 `fib-5` 偏移，`ochre` 背景 + Chat 图标，`hover-breathe` 微动效 |
| **Implementation** | `IntersectionObserver` 监听 Hero 区离开视口，控制按钮 visible/hidden |

#### StatsCounter — 数据计数动画

**Purpose：** 数据指标展示，scroll-triggered 计数动画从 0 递增到目标值。
**Usage：** Stats 区，横向排列 4 个核心指标。

| 属性 | 规格 |
|------|------|
| **Content** | 数字（动画计数）+ 单位后缀 + 一句信任说明 |
| **States** | pending（进入视口前，显示 0）, animating（计数递增，800ms）, complete（显示最终数字） |
| **Variants** | 4 种预设：模型数(50+)、测试数(680+)、可用性(99.9%)、响应时间(<200ms) |
| **Accessibility** | `aria-live="polite"` 动画完成后播报最终值；`prefers-reduced-motion` 下直接显示最终值 |
| **Styling** | `phi-2xl` 数字 + `ink-900`，说明文字 `phi-sm` + `ink-500` |

#### TrustBadge — 信任徽章

**Purpose：** CTA 按钮附近的信任信号徽章，降低跨域跳转犹豫。
**Usage：** Hero CTA 下方、Products CTA 旁、Pricing CTA 旁。

| 属性 | 规格 |
|------|------|
| **Content** | 图标 + 短文字（如 "99.9% Uptime"、"680+ Tests"、"Open API"） |
| **States** | default（静态展示） |
| **Variants** | inline（CTA 下方横排）, stacked（卡片内竖排） |
| **Accessibility** | `role="status"`, `aria-label` 描述信任信号 |
| **Styling** | `phi-xs` 文字 + `ink-500`，图标 `ochre`，间距 `fib-2` |

#### SectionTransition — 区段装饰分隔

**Purpose：** 页面区段之间的手绘风格装饰分隔线，标记情感节奏转折点。
**Usage：** Hero→Products、Products→Stats、Stats→Portal 等区段过渡处。

| 属性 | 规格 |
|------|------|
| **Variants** | wave（波浪 SVG）, dots（手绘圆点排列）, line（sketchy 水平线） |
| **Accessibility** | `role="separator"`, `aria-hidden="true"`（纯装饰） |
| **Styling** | `cream-300` 色调，高度 `fib-5`，`opacity: 0.6`，Caveat 风格 SVG |

#### StateIllustration — 错误/空状态插图

**Purpose：** 错误/空状态的手绘风格插图，将冷场景转化为温暖品牌触点。
**Usage：** 404 页面、Chat 无响应、网络断开、门户链接失效。

| 属性 | 规格 |
|------|------|
| **Variants** | error-404, network-offline, chat-unavailable, empty-results |
| **Content** | 手绘 SVG 插图 + 主标题 + 说明文字 + 操作按钮 |
| **Accessibility** | 插图 `aria-hidden="true"` + `alt=""`；操作按钮有明确 `aria-label` |
| **Styling** | Caveat 标题，`ink-700` 说明文字，`ochre` 操作按钮 |

#### ProductScreenshot — 产品截图容器

**Purpose：** 产品真实截图展示容器，带 sketchy 边框和悬停放大效果。
**Usage：** Products 区 GuShen 卡片右侧、V1 降级时 Hero 右侧。

| 属性 | 规格 |
|------|------|
| **States** | default, hover（微放大 scale 1.02 + 阴影增强）, loading（skeleton 占位） |
| **Accessibility** | `<img alt="GuShen 策略编辑器界面">` 有描述性 alt 文字 |
| **Styling** | `card-sketchy` 外框，图片 `object-cover`，WebP/AVIF 格式 |

### Animation System

#### ScrollReveal Composable

```typescript
// src/composables/useScrollReveal.ts
// IntersectionObserver 封装，支持 threshold + rootMargin 配置
// 返回 { isVisible: Ref<boolean> } 用于模板 v-if/v-show + CSS transition
```

**支持的 CSS 动效类：**

| 类名 | 效果 | 持续时间 | 使用场景 |
|------|------|---------|---------|
| `.reveal-up` | 从下方 20px 渐入 | 500ms | 卡片、段落 |
| `.reveal-left` | 从左侧 30px 渐入 | 500ms | 左右交替布局的左侧 |
| `.reveal-right` | 从右侧 30px 渐入 | 500ms | 左右交替布局的右侧 |
| `.reveal-scale` | 从 0.95 缩放到 1.0 | 400ms | Hero CTA、Stats 数字 |

#### MicroInteraction CSS Classes

| 类名 | 效果 | 持续时间 | 使用场景 |
|------|------|---------|---------|
| `.hover-breathe` | 悬停时 scale 1.03 + shadow 增强 | 200ms | 卡片、ChatFloatingTrigger |
| `.click-elastic` | 点击 scale 0.97 → 1.0 弹性 | 150ms | CTA 按钮 |
| `.focus-ring` | ochre 焦点环 + 2px offset | instant | 所有可聚焦元素 |
| `.copy-flash` | 背景闪烁确认 | 300ms | CodeShowcase 复制按钮 |

#### ReducedMotion Global Handler

```css
@media (prefers-reduced-motion: reduce) {
  .reveal-up, .reveal-left, .reveal-right, .reveal-scale {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .hover-breathe, .click-elastic { transition: none !important; }
  .stats-counter { /* 直接显示最终值，跳过计数动画 */ }
}
```

### Component Implementation Strategy

**原则：**
1. 所有自定义组件使用现有设计 token（cream/ink/ochre/fib-*），不引入新色彩
2. 遵循 Vue 3 `<script setup lang="ts">` 规范，scoped 样式 + `@reference`
3. 组件按目录归类：`src/components/<Category>/`
4. 动效逻辑抽到 composable（`useScrollReveal`），组件只负责展示
5. 所有交互元素必须有 `aria-label`，`prefers-reduced-motion` 全局兼容

**新增目录结构：**

```
src/components/
├── Hero/
│   ├── HeroSplit.vue         # 新：左右分栏 Hero
│   └── HeroSection.vue       # 现有：保留作为 V1 降级回退
├── Chat/
│   ├── ChatPreview.vue       # 新：Hero 内嵌预览
│   ├── ChatFloatingTrigger.vue # 新：浮动触发按钮
│   └── ... (现有 7 个子组件)
├── Products/
│   ├── CodeShowcase.vue      # 新：curl 代码展示
│   ├── ProductScreenshot.vue # 新：截图容器
│   └── ProductShowcase.vue   # 现有：增强
├── Stats/
│   └── StatsCounter.vue      # 新：计数动画
├── Shared/
│   ├── TrustBadge.vue        # 新：信任徽章
│   ├── SectionTransition.vue # 新：区段装饰分隔
│   └── StateIllustration.vue # 新：错误/空状态
└── ...

src/composables/
├── useScrollReveal.ts        # 新：IntersectionObserver 封装
├── useAIChat.ts              # 现有
├── useChatApi.ts             # 现有
├── useChatPersist.ts         # 现有
└── useNetworkStatus.ts       # 现有
```

### Implementation Roadmap

**Phase 1 — 核心流程组件（P0，支撑 Chen 转化旅程）：**

| 组件 | 关联旅程 | 依赖 |
|------|---------|------|
| `HeroSplit` | All: 首屏 3s 认知 | Layout/Navbar 改造 |
| `CodeShowcase` | Chen: curl 验证 | 无 |
| `useScrollReveal` + CSS 动效类 | All: 视觉进度 | 无 |
| ReducedMotion 全局 | All: 无障碍 | useScrollReveal |
| Navbar 改造（双入口） | Lin: 门户直达 / Chen: CTA | 无 |

**Phase 2 — Chat + 信任组件（P0/P1，支撑峰值时刻）：**

| 组件 | 关联旅程 | 依赖 |
|------|---------|------|
| `ChatPreview` | Chen: AI Chat 入口 | HeroSplit 右侧插槽 |
| `ChatFloatingTrigger` | All: 滚动后 Chat 入口 | useScrollReveal |
| `TrustBadge` | Chen: CTA 信任 | 无 |
| `StatsCounter` | Chen/Zhao: 数据信任 | useScrollReveal |

**Phase 3 — 视觉增强组件（P1/P2，打磨体验）：**

| 组件 | 关联旅程 | 依赖 |
|------|---------|------|
| `ProductScreenshot` | Zhao: 视觉信任 | 截图资产 |
| `SectionTransition` | All: 情感节奏 | SVG 资产 |
| `StateIllustration` | All: 错误温暖化 | SVG 资产 |
| MicroInteraction CSS | All: 触感品质 | 无 |
| Footer 品牌签名改造 | All: 终值时刻 | 无 |

## UX Consistency Patterns

### Button Hierarchy

| 层级 | 类名 | 视觉 | 使用场景 | 每页最多 |
|------|------|------|---------|---------|
| **Primary** | `.btn-hand.btn-primary` | `bg-ochre text-cream-50` + sketchy 圆角 + `click-elastic` | 主 CTA（获取 API Key）、Chat 发送 | 2 |
| **Secondary** | `.btn-hand.btn-secondary` | `border-ochre text-ochre bg-transparent` + sketchy 圆角 | 次 CTA（查看文档）、Chat Quick Prompts | 不限 |
| **Ghost** | `.btn-ghost` | `text-ink-700 hover:text-ink-900` 无边框 | Navbar 导航项、门户分类标签 | 不限 |
| **Icon** | `.btn-icon` | 圆形 `bg-ochre/10 hover:bg-ochre/20` | ChatFloatingTrigger、复制按钮、关闭按钮 | 不限 |

**按钮规则：**
- Primary 按钮每个视窗高度最多 1 个（避免注意力竞争）
- CTA 文案必须指向具体行动（"获取 API Key" 非 "开始使用"、"了解更多"）
- 所有按钮 `min-height: 44px`（触控友好）、`focus-ring` 焦点环
- 禁用态：`opacity: 0.5 cursor-not-allowed`，保留原色（不变灰）
- 外链按钮附加 `↗` 图标标记（`aria-label` 包含"在新标签打开"）

**CTA 放置规则（Fogg 模型）：**
- 仅在同时满足"动机 + 能力 + 触发"三要素时放置 CTA
- 动机：上方已有证据/价值主张
- 能力：CTA 文案清晰、路径单一
- 触发：视觉突出（Primary 按钮 + TrustBadge）

### Feedback Patterns

| 场景 | 反馈方式 | 持续时间 | 视觉 |
|------|---------|---------|------|
| **复制成功** | Toast 弹出 "Copied!" | 2s 自动消失 | `bg-portal-medical/10 text-portal-medical`（柔和绿）+ `.copy-flash` |
| **Chat 发送** | 气泡即时出现 + 打字指示器 | 直到回复 | 用户气泡 `bg-cream-200`，AI 打字 3 点动画 |
| **Chat 回复** | 流式逐字渐显 | 实时 | AI 气泡 `bg-cream-50 border-cream-300` |
| **链接点击** | 新标签打开 + 原页面无变化 | 即时 | 无额外反馈（标准浏览器行为） |
| **CTA 点击** | `click-elastic` 弹性 → 页面跳转 | 150ms + 导航 | ochre 按钮弹性效果 |
| **Scroll 进度** | 区段渐入 + Navbar 当前区段高亮 | 500ms 渐入 | `.reveal-up` 动效 |
| **Chat 错误** | 气泡内错误提示 + 重试按钮 | 持续 | `text-product-switch`（赤陶橙）+ 手绘风格 |
| **网络断开** | 全局顶部 banner | 持续到恢复 | `bg-product-switch/10 text-product-switch` |

**反馈规则：**
- 成功反馈用色彩（绿色调），不用弹窗
- 错误反馈在发生位置就地显示（inline），不用全局 alert
- Toast 最多同时 1 个，新 Toast 替换旧 Toast
- 所有反馈 `aria-live="polite"`（成功）或 `aria-live="assertive"`（错误）

### Navigation Patterns

**Navbar 行为：**

| 状态 | 行为 | 视觉 |
|------|------|------|
| 页面顶部 | 透明背景，品牌色文字 | `bg-transparent text-ink-900` |
| 滚动后 | 固定顶部 + 背景模糊 | `bg-cream-50/90 backdrop-blur-sm shadow-sm` |
| 当前区段 | 对应导航项下划线高亮 | `border-b-2 border-ochre` |
| 移动端 | 汉堡菜单 → 全屏覆盖 | `bg-cream-50` 全屏，Caveat Logo 居中 |

**滚动行为：**
- 平滑滚动：`scroll-behavior: smooth`（全局），锚点跳转带 Navbar 高度偏移
- 区段检测：`IntersectionObserver` 监听各 `<section>` 进入视口，更新 Navbar 高亮
- Hash 导航：`#portal`、`#products`、`#pricing` 支持外部直链

**页面间导航（Vue Router）：**
- 单页应用内页面切换：无全刷新，Vue Router 切换
- 外部链接（api.lurus.cn、gushen.lurus.cn）：新标签打开
- 跨域跳转前：视觉过渡保持一致性（同色系、同字体）

### Loading & Empty States

**加载状态：**

| 场景 | 加载方式 | 视觉 |
|------|---------|------|
| 首次页面加载 | 字体预加载 + 关键 CSS 内联 | `font-display: swap` |
| 图片懒加载 | `loading="lazy"` + skeleton 占位 | `bg-cream-200 animate-pulse rounded-sketchy` |
| Chat 面板展开 | 300ms CSS transition | `opacity 0→1 + translateX` |
| Chat 等待回复 | 打字指示器（3 点） | `ink-500` 三点跳动 |
| Stats 计数动画 | scroll-triggered 800ms | 数字从 0 递增，`ease-out` |
| 产品截图加载 | skeleton → 图片渐显 | `ProductScreenshot` loading 态 |

**空状态与错误状态：**

| 场景 | 组件 | 内容 | 操作 |
|------|------|------|------|
| 404 页面 | `StateIllustration.error-404` | 手绘迷路插图 + "页面走丢了" | "回到首页" 按钮 |
| Chat 不可用 | `StateIllustration.chat-unavailable` | 手绘气泡插图 + "AI 正在准备中" | "即将开放" Badge |
| 网络断开 | `StateIllustration.network-offline` | 手绘断线插图 + "网络连接中断" | "重试" 按钮 |
| 门户链接失效 | inline 提示 | "该链接暂时不可用" | 同分类其他链接推荐 |
| Chat 空对话 | Quick Prompts | 预设提示卡片消除空白焦虑 | 点击提示开始对话 |

**规则：**
- 首屏零 skeleton — Hero 文字即时渲染
- 非首屏图片全部 `loading="lazy"`
- skeleton 颜色统一 `bg-cream-200`，形状跟随目标组件
- 所有错误状态使用手绘风格插图（冷场景温暖化）
- 错误文案禁止技术术语，用人话描述
- 每个错误状态必须有至少 1 个可操作按钮

### Link Patterns

| 链接类型 | 视觉 | 行为 | 示例 |
|---------|------|------|------|
| **内部导航** | `text-ink-900 hover:text-ochre` 无下划线 | SPA 路由跳转 | Navbar 导航项 |
| **内部锚点** | `text-ink-700 hover:text-ochre` 无下划线 | 平滑滚动到锚点 | Navbar "门户链接" |
| **外部链接** | `text-ink-700 hover:text-ochre` + `↗` 图标 | 新标签打开 | CTA → api.lurus.cn |
| **门户链接** | `text-portal-* hover:underline` + 分类色 | 新标签打开 | Portal 区 48 个链接 |
| **Chat 内链接** | `text-product-api underline` | 新标签打开 | AI 回复中的 URL |
| **Footer 链接** | `text-ink-500 hover:text-ink-700` | 按类型决定 | 底部导航 |

**链接规则：**
- 所有外部链接：`target="_blank" rel="noopener noreferrer"`
- 外部链接必须有 `↗` 图标或 `aria-label` 标注"新标签打开"
- 门户链接色彩跟随分类（academic 紫、finance 绿、ai 蓝等）

### Overlay & Panel Patterns

| 场景 | 类型 | 打开/关闭 | 背景处理 |
|------|------|---------|---------|
| AI Chat 面板 | 右侧滑入面板 | ChatFloatingTrigger / ChatPreview 展开 → ESC/X 关闭 | 无遮罩，页面可滚动 |
| 移动端导航 | 全屏覆盖 | 汉堡按钮切换 → 点击链接/X 关闭 | 全屏 `bg-cream-50` |

**面板规则：**
- Chat 面板不阻塞页面操作（无 backdrop overlay）
- ESC 键关闭所有面板（Chat + 移动端导航）
- 面板打开/关闭动画 300ms CSS transition
- 面板内焦点锁定（trap focus），关闭后焦点回到触发元素
- `aria-expanded` 标记面板状态

### Design System Integration

**Token 映射：**

| 模式层 | 使用 Token | 禁止 |
|--------|-----------|------|
| 按钮 | `ochre`(primary), `cream-*`(hover), `ink-*`(text) | Tailwind 默认色 |
| 反馈 | `portal-medical`(成功), `product-switch`(错误), `product-api`(信息) | 红/绿 默认色 |
| 导航 | `cream-50/90`(背景), `ochre`(高亮), `ink-900/700`(文字) | 固定 px 尺寸 |
| 加载 | `cream-200`(skeleton), `ink-500`(indicator) | 灰色默认 |

**手绘风格分界线：**
- **使用 sketchy**：卡片容器、CTA 按钮、Chat 气泡、错误状态插图、区段分隔
- **禁止 sketchy**：Navbar、代码块、表单控件、数据表格、Toast 通知、Loading skeleton

## Responsive Design & Accessibility

### Responsive Strategy

**设备优先级：**

| 设备 | 流量预估 | 主要 Persona | 策略 |
|------|---------|------------|------|
| Desktop (≥ 1024px) | ~70% | Chen, Lin | **主设计目标**：完整功能、多列布局、AI Chat 面板 |
| Tablet (768-1023px) | ~10% | 混合 | 适配：简化分栏、触控优化 |
| Mobile (< 768px) | ~20% | Zhao（首次发现）| 基础适配：堆叠布局、Hero 精简、Chat 收起 |

**桌面策略（主目标）：**
- HeroSplit 60/40 分栏完整展示
- Products 左右交替布局
- Portal 4 列网格 × 6 分类
- AI Chat 面板右侧滑入，不遮挡页面
- Stats 横向 4 列
- Navbar 完整导航项 + 双入口按钮

**平板策略：**
- HeroSplit 55/45 分栏，ChatPreview 尺寸缩小
- Products 堆叠为上下（图+文）
- Portal 2 列网格
- Stats 2×2 网格
- Chat 面板全宽覆盖
- Navbar 保持完整导航项（空间允许）

**移动端策略：**
- Hero 堆叠：标题 + CTA + 产品截图（非 Chat 预览）
- Products 单列，CodeShowcase 全宽
- Portal 单列，分类标签横向滚动
- Stats 单列堆叠
- Chat 仅 ChatFloatingTrigger，展开为全屏面板
- Navbar 汉堡菜单

### Breakpoint Strategy

使用 Tailwind CSS v4 默认断点，Mobile-first 编写（基础样式 = 移动端）：

| 断点 | Tailwind 前缀 | 宽度 | 布局变化 |
|------|-------------|------|---------|
| Base | 无前缀 | < 640px | 单列堆叠，Hero 精简 |
| `sm:` | 小屏 | ≥ 640px | 微调间距，2 列卡片网格开始 |
| `md:` | 平板 | ≥ 768px | HeroSplit 分栏，Portal 2 列，Stats 2×2 |
| `lg:` | 桌面 | ≥ 1024px | 完整布局，HeroSplit 60/40，Portal 4 列 |
| `xl:` | 宽屏 | ≥ 1280px | 内容区最大 1200px 居中，增加侧边留白 |

**关键组件断点行为：**

| 组件 | Base (Mobile) | md: (Tablet) | lg: (Desktop) |
|------|--------------|-------------|---------------|
| HeroSplit | 堆叠：标题→CTA→截图 | 55/45 分栏 | 60/40 分栏 + ChatPreview |
| ChatPreview | 隐藏（改为 FloatingTrigger） | 缩小预览 | 完整预览 |
| ChatFloatingTrigger | 底部全宽按钮 | 右下浮动 | 右下浮动 |
| Chat 面板 | 全屏覆盖 | 全宽侧面板 | 右侧 400px 面板 |
| CodeShowcase | 全宽，横向滚动代码 | 全宽 | Products 卡片内嵌 |
| Products 布局 | 单列堆叠 | 单列（图+文上下） | 左右交替 |
| Portal 网格 | 1 列 + 标签横滚 | 2 列 | 4 列 |
| Stats | 单列堆叠 | 2×2 网格 | 横向 4 列 |
| Navbar | Logo + 汉堡 | 完整导航 | 完整导航 + 双入口 |

**特殊移动端处理：**
- Hero 主标题从 `phi-3xl`(68px) 降级为 `phi-2xl`(42px)
- 门户分类标签横向滚动（`overflow-x: auto`），无需折叠
- CodeShowcase 代码区横向滚动（`overflow-x: auto`），保持代码完整性
- 所有触控目标 ≥ 44×44px，间距 ≥ 8px

### Accessibility Strategy

**合规目标：WCAG 2.1 Level AA**

**色彩对比度：**

| 组合 | 对比度 | 达标 |
|------|--------|------|
| ink-900 (#2C2416) on cream-50 (#FFFDF7) | ~14:1 | AA+AAA |
| ink-700 on cream-50 | ~8:1 | AA+AAA |
| ink-500 on cream-50 | ~5.5:1 | AA |
| ochre (#C9A227) on cream-50 | ~3.5:1 | AA 大文字 |
| cream-50 on ink-900 | ~14:1 | AA+AAA |

**注意：** ochre 作为按钮背景时，文字使用 `cream-50`（大文字 3:1 通过）。ochre 文字用于辅助信息时需 ≥ `phi-lg`(20px)。

**键盘导航：**

| 区域 | Tab 顺序 | 操作 |
|------|---------|------|
| Navbar | Logo → 导航项 → 门户按钮 → 主 CTA | Enter 触发导航 |
| Hero | 主 CTA → 次 CTA → ChatPreview Quick Prompts → 输入框 | Enter 触发按钮/展开 Chat |
| Products | 产品卡片 → CodeShowcase Copy 按钮 → 产品 CTA | Enter 复制/跳转 |
| Stats | 非交互，Tab 跳过 | — |
| Portal | 分类标签 → 门户链接（按分类分组） | Enter 打开新标签 |
| Chat 面板 | Quick Prompts → 输入框 → 发送按钮 → 关闭按钮 | ESC 关闭面板 |

**Skip Links：**
```html
<a href="#main-content" class="sr-only focus:not-sr-only">跳转到主要内容</a>
<a href="#portal" class="sr-only focus:not-sr-only">跳转到门户链接</a>
```

**语义化 HTML 结构：**
```html
<header> <!-- Navbar -->
<main id="main-content">
  <section aria-label="Hero">
  <section aria-label="产品展示" id="products">
  <section aria-label="平台数据">
  <section aria-label="门户链接" id="portal">
  <section aria-label="定价方案" id="pricing">
</main>
<footer>
<aside aria-label="AI 对话"> <!-- Chat 面板 -->
```

**手绘风格无障碍注意事项：**

| 风险 | 缓解措施 |
|------|---------|
| sketchy 边框不作为唯一状态指示 | 始终配合色彩变化 + 图标 + 文字 |
| Caveat 字体可读性较低 | 仅装饰性大字，不用于辅助文字、表单标签、错误信息 |
| 纸质纹理可能影响对比度 | 纹理 opacity ≤ 0.05，不影响 ink-on-cream 对比度计算 |
| 手绘 SVG 插图无法被屏幕阅读器理解 | 所有插图 `aria-hidden="true"`，信息由文字承载 |
| 动画干扰认知障碍用户 | `prefers-reduced-motion: reduce` 禁用所有动画 |

### Testing Strategy

**响应式测试：**

| 层级 | 工具 | 测试内容 |
|------|------|---------|
| 开发时 | Chrome DevTools + Playwright | 每个断点布局验证 |
| CI | Playwright 截图对比 | 关键页面 3 断点（375px, 768px, 1280px）|
| 手动 | 真实设备 | iPhone 15, iPad Air, MacBook |

**无障碍测试：**

| 层级 | 工具 | 测试内容 |
|------|------|---------|
| 自动化 | axe-core (Playwright 集成) | WCAG AA 自动检测 |
| 手动 | 键盘 | 全站 Tab 遍历 + ESC 关闭面板 |
| 手动 | VoiceOver (macOS) | 屏幕阅读器体验 |
| 手动 | 色彩对比检查器 | 所有文字/背景组合 |

**部署前 Checklist：**
- [ ] axe-core 零 critical/serious 违规
- [ ] Tab 键可到达所有交互元素
- [ ] ESC 可关闭 Chat 面板和移动端导航
- [ ] `prefers-reduced-motion` 下无动画
- [ ] 浏览器缩放 200% 布局不崩
- [ ] 所有图片有 `alt` 属性
- [ ] 所有外部链接有 `rel="noopener noreferrer"`

### Implementation Guidelines

**响应式开发规则：**
1. **Mobile-first CSS** — 基础样式 = 移动端，`md:`/`lg:` 断点递进增强
2. **相对单位** — `rem` 字号、`%` 宽度、`vw/vh` 视口、禁止固定 `px` 宽度（间距用 Fibonacci token）
3. **灵活图片** — `max-width: 100%` + `object-fit: cover` + `loading="lazy"`
4. **触控安全** — 所有可点击区域 ≥ 44×44px，相邻可点击元素间距 ≥ 8px
5. **横向滚动** — 仅限代码块和门户标签，其他区域禁止出现横向滚动条

**无障碍开发规则：**
1. **语义优先** — 使用 `<nav>`、`<main>`、`<section>`、`<button>`（非 `<div onclick>`）
2. **ARIA 最小化** — 语义 HTML 够用时不加 ARIA；需要时使用 `aria-label`、`aria-expanded`、`aria-live`
3. **焦点管理** — 面板打开 → 焦点移入；面板关闭 → 焦点回到触发元素
4. **Skip Links** — 页面顶部隐藏跳转链接，聚焦时可见
5. **色彩不是唯一信息载体** — 错误状态必须有图标+文字，不仅仅是红色
6. **动效可控** — `prefers-reduced-motion` 媒体查询全局禁用动画
7. **字体缩放** — `rem` 单位，支持浏览器缩放至 200% 不破版
