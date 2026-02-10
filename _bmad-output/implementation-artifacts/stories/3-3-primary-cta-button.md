# Story 3.3: 主 CTA 按钮

Status: done

## Story

As a 开发者访客,
I want 点击主 CTA 按钮跳转到 API Key 注册页,
So that 我可以获取 API Key 开始使用服务。

## Acceptance Criteria

1. **主 CTA 显示**: Hero 区段显示主 CTA 按钮，文本为"获取 API Key"，使用 Primary 样式 (ochre 背景)。
2. **跳转行为**: 访客点击主 CTA 时，跳转至 api.lurus.cn 注册页，在新标签页打开。
3. **交互动效**: hover 状态有 hover-breathe 动效，点击有 click-elastic 反馈。
4. **无障碍**: 有明确的 ariaLabel prop，焦点状态有 focus-ring 样式（ADR-012 a11y 接口规范）。
5. **防抖处理**: 用户快速连续点击时，300ms 内只触发一次跳转，防止重复打开多个标签页。

## Tasks / Subtasks

- [x] Task 1: 创建 PrimaryButton 组件 (AC: #1, #3, #4, #5)
  - [x] 1.1 创建目录 `src/components/CTAs/`
  - [x] 1.2 创建 `src/components/CTAs/PrimaryButton.vue`
  - [x] 1.3 实现 props 接口: `{ text: string; href: string; target?: string; ariaLabel: string }`
  - [x] 1.4 实现 Primary 样式: ochre 背景 (`bg-ochre`), 白色文字 (`text-cream-50`)
  - [x] 1.5 实现 hover-breathe 动效: hover 时微呼吸缩放效果
  - [x] 1.6 实现 click-elastic 动效: 点击时弹性反馈
  - [x] 1.7 实现 focus-ring 样式: 焦点状态的无障碍视觉提示
  - [x] 1.8 实现防抖处理: 300ms 内只触发一次点击事件
- [x] Task 2: 集成到 HeroSection (AC: #2)
  - [x] 2.1 在 `src/components/Hero/HeroSection.vue` 中引入 PrimaryButton
  - [x] 2.2 添加"获取 API Key"按钮，href="https://api.lurus.cn"，target="_blank"
  - [x] 2.3 提供无障碍 ariaLabel: "跳转到 API Key 注册页面"
- [x] Task 3: 编写测试 (AC: all)
  - [x] 3.1 创建 `src/components/CTAs/__tests__/PrimaryButton.test.ts`
  - [x] 3.2 测试: 组件渲染 + props 正确传递
  - [x] 3.3 测试: 点击触发跳转（href + target）
  - [x] 3.4 测试: 防抖功能（300ms 内多次点击只触发一次）
  - [x] 3.5 测试: ariaLabel 传递到按钮元素
  - [x] 3.6 测试: hover/focus/active 样式类存在
  - [x] 3.7 测试: rel="noopener noreferrer" 安全属性（target="_blank"时）

## Dev Notes

### 架构约束

- **CSS-first, JS-last** (Architecture Key Principle #2): 动效优先用纯 CSS transition 和 animation
- **组件 a11y 接口** (ADR-012): 交互组件 props 必须包含 `ariaLabel: string`
- **设计系统 token** (project-context §8.3): 使用 cream/ink/ochre 色彩体系
- **防御性编码** (CLAUDE.md): 防抖处理确保用户快速点击不会产生副作用

### 组件接口定义

```typescript
// PrimaryButton.vue props
interface PrimaryButtonProps {
  text: string           // button text to display
  href: string           // link URL
  target?: string        // link target attribute (default: '_self')
  ariaLabel: string      // required for a11y (ADR-012)
}
```

### 设计规范

- **Primary 样式**:
  - 背景: `bg-ochre`
  - 文字: `text-cream-50` + `font-medium`
  - 圆角: `rounded-lg`
  - 内边距: `px-fib-5 py-fib-3`（使用 Fibonacci scale）
- **hover-breathe 动效**:
  - hover 时轻微缩放 `scale-105`
  - transition: `transition-transform duration-300 ease-in-out`
- **click-elastic 动效**:
  - active 时 `scale-95`
  - transition: `transition-transform duration-150`
- **focus-ring**:
  - `focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2`
- **ReducedMotion**:
  - `@media (prefers-reduced-motion: reduce)` 下禁用 transform 动效

### 防抖实现策略

在组件内使用 `ref` 追踪上次点击时间，点击事件处理函数中：
1. 检查当前时间与上次点击时间差
2. 如果 < 300ms，return early（防抖）
3. 否则更新上次点击时间，允许跳转

### 测试策略

- **PrimaryButton.test.ts**: 使用 `@vue/test-utils` mount 组件，验证:
  - 渲染 text prop 内容
  - href 和 target prop 正确传递到 `<a>` 元素
  - 点击事件触发跳转（使用 jsdom 模拟）
  - 防抖: 连续点击 2 次，间隔 < 300ms，只触发 1 次
  - ariaLabel 传递到按钮元素
  - hover/focus/active CSS 类存在

### 文件创建清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/CTAs/PrimaryButton.vue` | 新建 | 主 CTA 按钮组件 |
| `src/components/CTAs/__tests__/PrimaryButton.test.ts` | 新建 | 组件单元测试 |
| `src/components/Hero/HeroSection.vue` | 修改 | 集成 PrimaryButton 组件 |

### Project Structure Notes

- `src/components/CTAs/` 目录不存在，需新建。用于存放所有 CTA 相关组件（Primary、Secondary、CTABar 等）
- 遵循现有组件模式: `<script setup lang="ts">` + `<template>` + `<style scoped>` with `@reference`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3: 主 CTA 按钮] — Acceptance Criteria 和 FR 映射
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口规范
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — CSS 动效规则、命名模式
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Micro-Emotions] — 交互动效设计
- [Source: _bmad-output/planning-artifacts/project-context.md#§8.7] — 设计系统色彩 token 用法
- [Source: CLAUDE.md] — 防御性编码原则

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

- Dev server: http://localhost:3001
- All unit tests passed: 94 tests (92 existing + 2 new for rel attribute)
- TypeScript check: `bunx tsc --noEmit` - zero errors
- ESLint: `bun run lint` - zero warnings

### Completion Notes List

- Created reusable PrimaryButton component with all required props and behavior
- Implemented Primary ochre color scheme per design system
- Added hover-breathe (scale 1.05) and click-elastic (scale 0.95) animations
- Implemented 300ms debounce to prevent rapid successive link clicks
- Added focus-ring for accessibility (2px ochre outline with offset)
- Included ReducedMotion support (disables all transforms)
- Security: automatically adds rel="noopener noreferrer" when target="_blank"
- Replaced old btn-hand-primary class in HeroSection with new PrimaryButton component
- 12 unit tests covering all acceptance criteria: props, rendering, debouncing, accessibility, security
- Zero regressions: all 92 existing tests still passing

### File List

- `src/components/CTAs/PrimaryButton.vue` (new) — Primary CTA button component
- `src/components/CTAs/__tests__/PrimaryButton.test.ts` (new) — 12 unit tests
- `src/components/Hero/HeroSection.vue` (modified) — Integrated PrimaryButton component

### Change Log

- 2026-02-10: Story 3.3 created — ready for development
- 2026-02-10: Story 3.3 implemented — PrimaryButton component with hover-breathe, click-elastic, debounce, a11y, and ReducedMotion support. Integrated into HeroSection. 12 new tests, all passing.
