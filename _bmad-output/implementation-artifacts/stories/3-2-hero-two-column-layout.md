# Story 3.2: Hero 双列布局

Status: done

## Story

As a 访客,
I want 看到清晰的首屏布局，左侧是价值主张，右侧是技术演示,
So that 我可以在 3 秒内理解 Lurus 是什么并看到它的能力。

## Acceptance Criteria

1. **双列布局**: Hero 区段显示双列布局 — 左侧：主标题 (phi-3xl/68px) + 副标题 (phi-lg) + CTA 按钮组；右侧：技术演示区（CodeShowcase 或 ChatPreview slot）。
2. **桌面端响应式**: 桌面视口 (>= 1024px) 左右两列并排，比例约 60:50（UX 规范 60/40）。
3. **移动端响应式**: 移动视口 (< 768px) 堆叠布局，标题在上，演示区在下。主标题从 phi-3xl 缩小至 phi-2xl。
4. **平板响应式**: 平板视口 (768-1023px) 55/45 分栏。
5. **Hero 内容**: 主标题传达"统一 AI 网关"定位，副标题说明 OpenAI 兼容 + 50+ 模型。
6. **右侧 Slot 机制**: HeroSection 右侧使用 slot 或条件渲染，可接受不同内容组件（CodeShowcase、ChatPreview、产品截图）。Wave 1 默认渲染 CodeShowcase。
7. **语义化 HTML**: 使用 `<section aria-label="Hero">` 包裹，主标题为 `<h1>`，CTA 为 `<a>` 或 `<button>`。

## Tasks / Subtasks

- [x] Task 1: 重构 HeroSection.vue 为双列布局 (AC: #1, #2, #3, #4, #7)
  - [x] 1.1 保留 `src/components/Hero/HeroSection.vue` 文件（重构，非新建），移除现有居中单列布局
  - [x] 1.2 实现双列 flexbox/grid 布局：左侧内容区 + 右侧 slot 区
  - [x] 1.3 桌面端 (lg:) 60/40 分栏并排
  - [x] 1.4 平板端 (md:) 55/45 分栏
  - [x] 1.5 移动端 (base) 堆叠：标题 -> CTA -> 右侧内容在下
  - [x] 1.6 语义化结构: `<section aria-label="Hero">` + `<h1>` 主标题
  - [x] 1.7 保留现有装饰元素（notebook grid pattern, corner doodles, floating dots）
- [x] Task 2: 实现左侧内容区 (AC: #5)
  - [x] 2.1 主标题: phi-3xl (68px) 桌面端，phi-2xl (42px) 移动端，传达"统一 AI 网关"定位
  - [x] 2.2 副标题: phi-lg，说明 OpenAI 兼容 + 50+ 模型
  - [x] 2.3 CTA 按钮组: 主 CTA "获取 API Key" (btn-hand-primary) + 次 CTA "查看文档" (btn-hand)
  - [x] 2.4 产品色点标签行: 保留现有 product tags（Lurus API, GuShen, Switch, Docs, Deaigc）
  - [x] 2.5 左侧内容左对齐（非居中），`fib-7` 上下内边距
- [x] Task 3: 实现右侧 Slot 机制 (AC: #6)
  - [x] 3.1 定义 named slot `#right` 或使用默认 slot，允许父组件传入任意内容
  - [x] 3.2 Wave 1 默认渲染: 在 Home.vue 中传入 CodeShowcase 组件（使用已有的 `curl https://api.lurus.cn/v1/models` 命令）
  - [x] 3.3 右侧容器使用 `card-sketchy` 样式 + `bg-cream-50` 背景
  - [x] 3.4 确保右侧区域在移动端 < 768px 下正常堆叠显示
- [x] Task 4: 更新 Home.vue 集成 (AC: all)
  - [x] 4.1 修改 Home.vue 中 HeroSection 使用方式，传入右侧 slot 内容
  - [x] 4.2 引入 CodeShowcase 组件作为 Hero 右侧默认内容
  - [x] 4.3 CodeShowcase 使用免认证端点 `curl https://api.lurus.cn/v1/models`
- [x] Task 5: 编写测试 (AC: all)
  - [x] 5.1 创建 `src/components/Hero/__tests__/HeroSection.test.ts`
  - [x] 5.2 测试: 双列布局渲染 — 左侧内容区 + 右侧 slot 区同时存在
  - [x] 5.3 测试: 主标题 `<h1>` 包含"统一 AI 网关"相关文案
  - [x] 5.4 测试: CTA 按钮渲染 — 主 CTA 链接到 api.lurus.cn，次 CTA 链接到 docs.lurus.cn
  - [x] 5.5 测试: slot 机制 — 传入自定义内容能正确渲染到右侧区域
  - [x] 5.6 测试: `aria-label="Hero"` 存在于 section 元素
  - [x] 5.7 测试: 产品色点标签渲染所有产品项

## Dev Notes

### 规范冲突记录

- **AC2 桌面端比例**: Epic AC2 写 "比例约 50:50"，但 UX 设计规范 HeroSplit 明确写 "60/40 split"。实现遵循 UX 规范 (3fr:2fr = 60/40)，因为 UX 规范是视觉设计的权威来源。Epic AC2 应更新为 "比例约 60:40"。

### 架构约束

- **CSS-first, JS-last** (Architecture Key Principle #2): 布局用纯 CSS flexbox/grid，响应式用 Tailwind 断点前缀，禁止 JS 计算布局
- **组件 a11y 接口** (ADR-012): section 需 `aria-label`，CTA 按钮需 accessible name
- **设计系统 token** (project-context 8.3): 使用 cream/ink/ochre 色彩体系，禁止 Tailwind 默认调色板
- **零重型库原则**: 纯 Tailwind 响应式，无 CSS-in-JS 库
- **首屏极简原则** (Architecture Key Principle #3): HeroSection 是同步渲染组件（非 defineAsyncComponent），关键渲染路径的一部分

### 现有代码分析

**HeroSection.vue 当前结构：**
- 居中单列布局 (`text-center`)，需重构为左右分栏
- 已有元素：Logo Badge、主标题、副标题、CTA 按钮组、产品色点标签、滚动指示器、装饰元素
- 产品数据硬编码在组件内（`products` 数组） — Epic 1 已将数据集中化，但此组件尚未迁移。本 story 保持现状，数据迁移留给后续 story
- 已正确使用 `<style scoped>` + `@reference`

**Home.vue 当前结构：**
- 直接引入 `<HeroSection />`，无 slot 传入
- 需修改为传入右侧内容

**CodeShowcase 组件 (Story 3-1 已完成)：**
- 路径: `src/components/TechDemo/CodeShowcase.vue`
- Props: `{ code, language, showLineNumbers, ariaLabel, showAuthTag }`
- 可直接在 Hero 右侧 slot 中使用

### UX 规范要点

- **Desktop (>= 1024px)**: 60/40 分栏，左侧左对齐，最大宽度 1200px 居中
- **Tablet (768-1023px)**: 55/45 分栏，ChatPreview 尺寸缩小
- **Mobile (< 768px)**: 堆叠布局 — 标题 -> CTA -> 演示区在下，主标题从 phi-3xl 降为 phi-2xl
- **左侧内容**: fib-7 (89px) 上下内边距
- **右侧容器**: `card-sketchy` 容器 + `bg-cream-50` 背景
- **Wave 1 降级**: Chat 后端不可用时右侧显示 CodeShowcase（本 story 默认就是 CodeShowcase）

### 响应式断点参考 (Tailwind)

| 断点 | 前缀 | 宽度 | Hero 行为 |
|------|------|------|---------|
| Base | 无 | < 640px | 堆叠，phi-2xl 标题 |
| sm: | >= 640px | 微调间距 |
| md: | >= 768px | 55/45 分栏 |
| lg: | >= 1024px | 60/40 分栏，完整布局 |
| xl: | >= 1280px | 内容区最大 1200px 居中，增加侧边留白 |

### 文件修改清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/Hero/HeroSection.vue` | 修改 | 从居中单列重构为左右分栏 + slot |
| `src/pages/Home.vue` | 修改 | HeroSection 传入右侧 slot 内容 (CodeShowcase) |
| `src/components/Hero/__tests__/HeroSection.test.ts` | 新建 | 组件测试 |

### Slot 设计参考

```vue
<!-- HeroSection.vue -->
<template>
  <section aria-label="Hero" class="...">
    <div class="grid ... lg:grid-cols-[3fr_2fr] md:grid-cols-[55fr_45fr]">
      <!-- Left: Value Proposition -->
      <div class="...">
        <h1>...</h1>
        <p>...</p>
        <div><!-- CTAs --></div>
        <div><!-- Product Tags --></div>
      </div>
      <!-- Right: Tech Demo -->
      <div class="...">
        <slot name="right">
          <!-- Default fallback content if no slot provided -->
        </slot>
      </div>
    </div>
  </section>
</template>
```

```vue
<!-- Home.vue usage -->
<HeroSection>
  <template #right>
    <CodeShowcase
      code="curl https://api.lurus.cn/v1/models"
      language="bash"
      aria-label="API 调用示例"
    />
  </template>
</HeroSection>
```

### Previous Story Intelligence (3-1)

- CodeShowcase 组件已完成，有 23 个测试全部通过
- clipboard utility (`src/utils/clipboard.ts`) 已封装
- CSS token 着色策略: `.token-keyword`, `.token-url`, `.token-string`, `.token-flag`
- 组件正确使用 `<style scoped>` + `@reference`
- 测试使用 `@vue/test-utils` mount

### 测试策略

- **HeroSection.test.ts**: 使用 `@vue/test-utils` mount/shallowMount
  - 验证双列布局结构（左右两个主要区域 DOM 节点存在）
  - 验证 `<h1>` 标签和核心文案
  - 验证 CTA 按钮 href 正确
  - 验证 slot 内容传入后渲染在右侧区域
  - 验证 `aria-label="Hero"` 属性
  - 验证产品标签渲染

### Project Structure Notes

- `src/components/Hero/` 目录已存在，HeroSection.vue 已有
- `src/components/Hero/__tests__/` 需新建
- 遵循 co-location 测试文件组织模式

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2: Hero 双列布局] — AC 定义
- [Source: _bmad-output/planning-artifacts/architecture.md#Hero Right Side Decision] — ChatPreview 为主, 降级为截图轮播
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-001] — 首屏静态同步渲染
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — a11y 接口规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#HeroSplit] — 60/40 分栏、响应式断点、样式规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Chosen Direction] — Direction B 双入口
- [Source: _bmad-output/planning-artifacts/project-context.md#§7.2] — Vue 3 Composition API 组件模式
- [Source: _bmad-output/planning-artifacts/project-context.md#§8.3] — 设计系统 token
- [Source: src/components/Hero/HeroSection.vue] — 现有组件，需重构
- [Source: src/pages/Home.vue] — 现有页面，需更新 HeroSection 使用
- [Source: src/components/TechDemo/CodeShowcase.vue] — Story 3-1 产出，右侧 slot 内容

## Dev Agent Record

### Agent Model Used

N/A

### Debug Log References

- TypeScript type check: `npx vue-tsc --noEmit` — PASS
- Vitest run: 7 test files, 64 tests all PASS (0 regressions)
- Build: pre-existing `@/utils/clipboard` alias issue in vite.config.ts (not introduced by this story)

### Completion Notes List

- Refactored HeroSection.vue from centered single-column to CSS Grid two-column layout
- Desktop (lg:): 3fr/2fr (60/40) split; Tablet (md:): 55fr/45fr split; Mobile: stacked layout
- Left column: h1 headline ("统一接入全球 AI 模型"), subtitle (OpenAI compatible + 50+ models), CTA buttons, product tags — all left-aligned
- Right column: named slot `#right` with `card-sketchy bg-cream-50` wrapper
- Home.vue updated to pass CodeShowcase into HeroSection's right slot with `curl https://api.lurus.cn/v1/models`
- Semantic HTML: `<section aria-label="Hero">` + `<h1>` + `<a>` CTAs
- All decorative elements preserved (notebook grid, corner doodles, floating dots, scroll indicator)
- 11 new tests covering: layout structure, a11y, CTA links, slot mechanism, product tags

### Change Log

- 2026-02-06: Implemented Story 3.2 — HeroSection refactored to two-column layout with right slot, Home.vue integrated with CodeShowcase, 11 tests added
- 2026-02-06: Code Review fixes — replaced hardcoded products with centralized data import (ADR-006), replaced Math.random() with static values (SSR-safe), added target="_blank" + rel to external CTA links, strengthened h1 test assertion, refactored max-width media query to mobile-first

### File List

- `src/components/Hero/HeroSection.vue` (modified) — refactored from centered single-column to two-column grid layout with named slot
- `src/pages/Home.vue` (modified) — added CodeShowcase import, passes it into HeroSection #right slot
- `src/components/Hero/__tests__/HeroSection.test.ts` (new) — 11 tests for layout, a11y, CTAs, slot, product tags
- `_bmad-output/sprint-status.yaml` (modified) — story status updated
