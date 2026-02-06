# Story 3.1: CodeShowcase 组件

Status: done

## Story

As a 开发者访客,
I want 看到语法高亮的 curl 命令并一键复制,
So that 我可以立即在终端验证 API 能力。

## Acceptance Criteria

1. **CSS-only 语法着色**: CodeShowcase 使用深色背景 + CSS-only 语法着色，关键词 (curl, https, Bearer) 有不同颜色高亮。禁止引入 Prism.js 或其他语法高亮库（ADR 零重型库原则）。
2. **一键复制**: 访客点击复制按钮，命令文本复制到剪贴板，按钮显示"已复制"反馈（copy-flash 动效），复制操作延迟 < 100ms。
3. **Clipboard 封装**: 使用 navigator.clipboard.writeText API，封装在 `src/utils/clipboard.ts`。navigator.clipboard 不可用时（HTTP 或旧浏览器）回退到 document.execCommand('copy')。
4. **端点选择**: 默认使用 `curl https://api.lurus.cn/v1/models`（免认证端点）。如使用需认证端点，显示"需 API Key"标注。
5. **组件 Props 接口**: 支持 `code: string`, `language: string`, `showLineNumbers?: boolean`, `ariaLabel: string`（ADR-012 a11y 接口规范）。
6. **ReducedMotion**: copy-flash 动效在 `prefers-reduced-motion: reduce` 下禁用或缩短至瞬时。

## Tasks / Subtasks

- [x] Task 1: 创建 clipboard 工具函数 (AC: #3)
  - [x] 1.1 创建 `src/utils/clipboard.ts`，导出 `copyToClipboard(text: string): Promise<boolean>`
  - [x] 1.2 主路径: `navigator.clipboard.writeText(text)` 返回 true
  - [x] 1.3 回退路径: 创建临时 textarea + `document.execCommand('copy')`，成功返回 true，失败返回 false
  - [x] 1.4 创建 `src/utils/__tests__/clipboard.test.ts` 单元测试（mock navigator.clipboard）
- [x] Task 2: 创建 CodeShowcase 组件 (AC: #1, #4, #5, #6)
  - [x] 2.1 创建目录 `src/components/TechDemo/`
  - [x] 2.2 创建 `src/components/TechDemo/CodeShowcase.vue`
  - [x] 2.3 实现 props 接口: `{ code: string; language: string; showLineNumbers?: boolean; ariaLabel: string; showAuthTag?: boolean }`
  - [x] 2.4 实现 CSS-only 语法着色: 将 code 字符串解析为 token 数组，每个 token 对应 CSS class（`.token-keyword`, `.token-url`, `.token-string`, `.token-flag`, `.token-comment`）
  - [x] 2.5 深色背景容器: `bg-ink-900 text-cream-100 rounded-lg` + 可选行号
  - [x] 2.6 实现"需 API Key"标注: `showAuthTag` prop 控制，右上角小标签
  - [x] 2.7 实现 ReducedMotion: copy-flash 动效 `@media (prefers-reduced-motion: reduce)` 下禁用
- [x] Task 3: 实现复制功能 (AC: #2)
  - [x] 3.1 引入 `copyToClipboard` from `@/utils/clipboard`
  - [x] 3.2 复制按钮: 右上角图标按钮，idle 态显示剪贴板图标，success 态显示对勾 + "已复制"
  - [x] 3.3 copy-flash 动效: 按钮短暂高亮 + 文字变化，2 秒后恢复
  - [x] 3.4 防抖: 连续点击 300ms 内只触发一次
- [x] Task 4: 编写测试 (AC: all)
  - [x] 4.1 创建 `src/components/TechDemo/__tests__/CodeShowcase.test.ts`
  - [x] 4.2 测试: 组件渲染 + props 正确传递
  - [x] 4.3 测试: 语法着色 token 正确生成（curl 关键词高亮）
  - [x] 4.4 测试: 复制按钮点击 → 调用 clipboard API
  - [x] 4.5 测试: showAuthTag 显示/隐藏"需 API Key"标注
  - [x] 4.6 测试: ariaLabel prop 传递到 code 容器

## Dev Notes

### 架构约束

- **零重型库原则** (Architecture ADR): 禁止引入 Prism.js、highlight.js、Shiki 等语法高亮库。用 CSS-only token 着色，只需 ~5 种 token 类型
- **CSS-first, JS-last** (Architecture Key Principle #2): 动效用纯 CSS transition，语法着色用 CSS class
- **组件 a11y 接口** (ADR-012): 交互组件 props 必须包含 `ariaLabel: string`
- **设计系统 token** (project-context §8.3): 使用 cream/ink/ochre 色彩体系，禁止 Tailwind 默认调色板

### CSS-only 语法着色策略

不使用任何第三方语法高亮库。实现方式：

1. 在 `<script setup>` 中定义简单的 tokenizer 函数，用正则匹配将 code 字符串拆分为 typed token 数组
2. Token 类型映射:
   - `keyword`: curl, GET, POST, PUT, DELETE → `text-ochre` (赭金色)
   - `url`: https://... → `text-[#7DD3FC]` (浅蓝)
   - `string`: 引号内内容 → `text-[#86EFAC]` (浅绿)
   - `flag`: -H, -d, -X 等命令行标志 → `text-cream-300` (浅奶色)
   - `plain`: 其他 → `text-cream-100` (默认文字色)
3. 模板中用 `v-for` 渲染 token，每个 `<span>` 绑定对应 class
4. 保持 `<pre><code>` 语义化 HTML 结构

### 现有代码复用

- **ProductShowcase.vue 已有复制逻辑**: 当前 `copyCurl` 函数直接使用 `navigator.clipboard.writeText`，无回退。Story 3.1 需要提取并增强为 `src/utils/clipboard.ts` 工具函数
- **curlExample 数据已存在**: `src/data/products.ts` 已导出 `curlExample` 常量（认证端点），可复用。Hero 区需要的免认证端点 `curl https://api.lurus.cn/v1/models` 需新增到 data 文件或直接在使用处传入
- **copy-flash 动效**: `src/styles/main.css` 目前无 copy-flash class，需新增

### 文件创建清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/utils/clipboard.ts` | 新建 | Clipboard 工具函数，含 writeText + execCommand 回退 |
| `src/utils/__tests__/clipboard.test.ts` | 新建 | clipboard 单元测试 |
| `src/components/TechDemo/CodeShowcase.vue` | 新建 | 核心组件 |
| `src/components/TechDemo/__tests__/CodeShowcase.test.ts` | 新建 | 组件测试 |
| `src/styles/main.css` | 修改 | 新增 `.copy-flash` 动效 class + 语法着色 token 颜色 |

### 组件接口定义

```typescript
// CodeShowcase.vue props
interface CodeShowcaseProps {
  code: string           // raw code string to display
  language: string       // 'bash' | 'json' | 'typescript' etc.
  showLineNumbers?: boolean  // default: false
  ariaLabel: string      // required for a11y (ADR-012)
  showAuthTag?: boolean  // show "需 API Key" badge
}
```

### 设计规范

- **深色容器**: `bg-ink-900` 背景 + `rounded-lg` + 微 padding（`p-fib-4`）
- **字体**: `font-mono` (系统等宽字体)
- **复制按钮**: 右上角绝对定位，`text-cream-300 hover:text-ochre` 过渡
- **行号**: 左侧灰色行号列，`text-ink-500` + `border-r border-ink-700` 分隔
- **"需 API Key" 标签**: 右上角（复制按钮左侧），`bg-ochre/20 text-ochre text-xs px-2 py-0.5 rounded`
- **copy-flash**: 按钮点击后 `bg-ochre/20` 短暂闪烁 + 图标切换为对勾 + 文字"已复制" → 2s 后恢复
- **ReducedMotion**: `@media (prefers-reduced-motion: reduce)` 下 copy-flash transition-duration 设为 0ms

### Clipboard 工具函数签名

```typescript
// src/utils/clipboard.ts

/**
 * Copy text to clipboard with fallback for older browsers.
 * Returns true if copy succeeded, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Primary: navigator.clipboard.writeText
  // Fallback: document.execCommand('copy') via temp textarea
}
```

### 测试策略

- **clipboard.test.ts**: mock `navigator.clipboard.writeText`，验证成功/失败路径；mock `document.execCommand` 验证回退
- **CodeShowcase.test.ts**: 使用 `@vue/test-utils` mount 组件，验证:
  - 渲染 code 内容
  - 语法 token 高亮 class 正确应用
  - 复制按钮 click → 调用 clipboard API
  - ariaLabel 传递到 `<code>` 元素
  - showAuthTag 控制标签显隐
  - showLineNumbers 控制行号显隐

### Project Structure Notes

- `src/components/TechDemo/` 目录不存在，需新建。Architecture 文档明确指定此目录用于技术演示组件 (FR12-18)
- `src/utils/` 目录不存在，需新建。Architecture 文档指定纯函数工具放在此目录（vs composables 放有 ref/computed 的逻辑）
- 遵循现有组件模式: `<script setup lang="ts">` + `<template>` + `<style scoped>` with `@reference`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1: CodeShowcase 组件] — Acceptance Criteria 和 FR 映射
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口规范
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-001] — 首屏静态 + 折叠下方 defineAsyncComponent
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — CSS 动效规则、命名模式、Anti-patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure] — TechDemo/ 目录位置、utils/ 目录位置
- [Source: _bmad-output/planning-artifacts/prd.md#S2 Hero] — curl 命令使用 `/v1/models` 免认证端点
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Micro-Emotions] — 一键复制的即时反馈设计
- [Source: _bmad-output/planning-artifacts/project-context.md#§7.5] — Scoped style 必须 @reference
- [Source: _bmad-output/planning-artifacts/project-context.md#§8.7] — 设计系统色彩 token 用法
- [Source: src/data/products.ts] — 已有 curlExample 常量可参考
- [Source: src/components/Products/ProductShowcase.vue] — 已有 copyCurl 逻辑需重构到 utils/clipboard.ts

## Dev Agent Record

### Agent Model Used

N/A

### Debug Log References

N/A

### Completion Notes List

- Implemented `copyToClipboard` utility with navigator.clipboard primary path and document.execCommand fallback
- Created CodeShowcase component with CSS-only syntax tokenizer (keyword/url/string/flag/plain), no third-party highlighting libs
- Props interface: `code`, `language`, `showLineNumbers`, `ariaLabel`, `showAuthTag` — all implemented per spec
- Copy button with debounce (300ms), 2s feedback ("已复制"), SVG icon toggle (clipboard → checkmark)
- Auth tag badge renders conditionally via `showAuthTag` prop
- ReducedMotion: `@media (prefers-reduced-motion: reduce)` sets transition-duration to 0ms on copy button
- 23 tests total (6 clipboard + 17 component) — all pass, zero regressions across 30 total suite tests
- TypeScript strict check passes for all new files; ESLint passes with zero warnings

### File List

- `src/utils/clipboard.ts` (new) — Clipboard utility with writeText + execCommand fallback
- `src/utils/__tests__/clipboard.test.ts` (new) — 6 unit tests for clipboard utility
- `src/components/TechDemo/CodeShowcase.vue` (new) — CodeShowcase component with CSS-only syntax highlighting
- `src/components/TechDemo/__tests__/CodeShowcase.test.ts` (new) — 17 component tests

### Change Log

- 2026-02-06: Story 3.1 implemented — CodeShowcase component with CSS-only syntax highlighting, clipboard utility, copy-flash feedback, a11y props, ReducedMotion support. 23 new tests added.
- 2026-02-06: Senior Developer Review (AI) — APPROVED. All ACs verified. 35 tests pass, tsc --noEmit zero errors. Cross-project fixes applied during review: model name policy compliance, CSP documentation, CI/test tooling alignment, portal link HTTPS enforcement, type safety consistency.
