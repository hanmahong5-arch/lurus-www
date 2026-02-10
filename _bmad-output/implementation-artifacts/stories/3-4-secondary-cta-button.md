# Story 3.4: 次级 CTA 按钮

Status: done

## Story

As a 访客,
I want 通过次级按钮访问文档或联系页面,
So that 我可以了解更多信息或寻求帮助。

## Acceptance Criteria

1. **次级 CTA 显示**: Hero 区段或 Final CTA 区段显示次级按钮，使用 Secondary 样式（border-ochre 边框，透明背景）。
2. **跳转行为**: 访客点击次级 CTA 时，跳转至配置的目标页面（如文档站点、联系页面），在新标签页打开。
3. **交互动效**: hover 状态有轻微 hover 效果（比主按钮更 subtle），点击有轻量反馈。
4. **无障碍**: 有明确的 ariaLabel prop，焦点状态有 focus-ring 样式（ADR-012 a11y 接口规范）。
5. **样式层级**: 次级按钮视觉权重低于主 CTA，使用边框样式而非填充背景。

## Tasks / Subtasks

- [ ] Task 1: 创建 SecondaryButton 组件 (AC: #1, #3, #4, #5)
  - [ ] 1.1 创建 `src/components/CTAs/SecondaryButton.vue`
  - [ ] 1.2 实现 props 接口: `{ text: string; href: string; target?: string; ariaLabel: string }`
  - [ ] 1.3 实现 Secondary 样式: 透明背景，ochre 边框 (`border-ochre text-ochre bg-transparent`)
  - [ ] 1.4 实现 sketchy 圆角边框 (`.btn-hand` 手绘美学)
  - [ ] 1.5 实现 subtle hover 动效: hover 时轻微视觉变化（背景色变浅）
  - [ ] 1.6 实现 focus-ring 样式: 焦点状态的无障碍视觉提示
  - [ ] 1.7 实现安全属性: target="_blank" 时自动添加 rel="noopener noreferrer"
- [ ] Task 2: 集成到 HeroSection (AC: #2)
  - [ ] 2.1 在 `src/components/Hero/HeroSection.vue` 中引入 SecondaryButton
  - [ ] 2.2 在主 CTA 旁边添加次级按钮"查看文档"，href="https://docs.lurus.cn"，target="_blank"
  - [ ] 2.3 提供无障碍 ariaLabel: "跳转到文档站点"
  - [ ] 2.4 调整按钮组布局: 主 CTA + 次级 CTA 水平排列，间距合理
- [ ] Task 3: 编写测试 (AC: all)
  - [ ] 3.1 创建 `src/components/CTAs/__tests__/SecondaryButton.test.ts`
  - [ ] 3.2 测试: 组件渲染 + props 正确传递
  - [ ] 3.3 测试: 点击触发跳转（href + target）
  - [ ] 3.4 测试: ariaLabel 传递到按钮元素
  - [ ] 3.5 测试: Secondary 样式类存在（边框、透明背景）
  - [ ] 3.6 测试: hover/focus 样式类存在
  - [ ] 3.7 测试: rel="noopener noreferrer" 安全属性（target="_blank"时）
  - [ ] 3.8 更新 HeroSection.test.ts: 验证次级按钮渲染和 props

## Dev Notes

### 架构约束

- **CSS-first, JS-last** (Architecture Key Principle #2): 动效优先用纯 CSS transition
- **组件 a11y 接口** (ADR-012): 交互组件 props 必须包含 `ariaLabel: string`
- **设计系统 token** (project-context §8.3): 使用 cream/ink/ochre 色彩体系
- **按钮层级** (UX Design §8.3): 每个视窗高度 Primary 按钮最多 1 个，Secondary 不限
- **手绘美学** (UX Design): Secondary 按钮使用 `.btn-hand` 类保持 sketchy 边框一致性

### 组件接口定义

```typescript
// SecondaryButton.vue props
interface SecondaryButtonProps {
  text: string           // button text to display
  href: string           // link URL
  target?: string        // link target attribute (default: '_self')
  ariaLabel: string      // required for a11y (ADR-012)
}
```

### 设计规范

- **Secondary 样式**:
  - 背景: `bg-transparent`
  - 边框: `border-2 border-ochre`
  - 文字: `text-ochre` + `font-medium`
  - 圆角: `rounded-lg` (sketchy 手绘圆角)
  - 内边距: `px-fib-5 py-fib-3`（与 Primary 一致）
- **subtle hover 动效**:
  - hover 时背景色变浅: `hover:bg-ochre/10`
  - transition: `transition-colors duration-300 ease-in-out`
- **focus-ring**:
  - `focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2`
- **ReducedMotion**:
  - `@media (prefers-reduced-motion: reduce)` 下禁用 transition

### 与 Primary 按钮的差异

| 特性 | Primary | Secondary |
|------|---------|-----------|
| 背景色 | `bg-ochre` (实色填充) | `bg-transparent` (透明) |
| 边框 | 无 | `border-2 border-ochre` |
| 文字颜色 | `text-cream-50` (白色) | `text-ochre` |
| hover 动效 | `scale-105` 呼吸效果 | `bg-ochre/10` 背景变浅 |
| click 动效 | `scale-95` 弹性反馈 | 无（更轻量） |
| 视觉权重 | 高（最多 1 个/视窗） | 中（不限数量） |
| 使用场景 | 主要转化行动 | 次要辅助行动 |

### 测试策略

- **SecondaryButton.test.ts**: 使用 `@vue/test-utils` mount 组件，验证:
  - 渲染 text prop 内容
  - href 和 target prop 正确传递到 `<a>` 元素
  - ariaLabel 传递到按钮元素
  - Secondary 样式类存在: `border-ochre`, `bg-transparent`, `text-ochre`
  - hover/focus CSS 类存在
  - target="_blank" 时自动添加 `rel="noopener noreferrer"`
- **HeroSection.test.ts 更新**: 验证次级按钮渲染、文案和跳转 URL

### 文件创建清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/CTAs/SecondaryButton.vue` | 新建 | 次级 CTA 按钮组件 |
| `src/components/CTAs/__tests__/SecondaryButton.test.ts` | 新建 | 组件单元测试 |
| `src/components/Hero/HeroSection.vue` | 修改 | 集成 SecondaryButton 组件 |
| `src/components/Hero/__tests__/HeroSection.test.ts` | 修改 | 更新测试用例 |

### Project Structure Notes

- `src/components/CTAs/` 目录已存在（Story 3.3 已创建）
- SecondaryButton 与 PrimaryButton 放在同一目录，便于管理 CTA 组件家族
- 遵循现有组件模式: `<script setup lang="ts">` + `<template>` + `<style scoped>`

### Implementation Plan

1. **Phase 1: 创建 SecondaryButton 组件**
   - 复用 PrimaryButton 的结构，调整样式为 Secondary
   - 移除 debounce 逻辑（次级按钮无需防抖）
   - 简化 hover/click 动效（更轻量）

2. **Phase 2: 集成到 HeroSection**
   - 在 PrimaryButton 旁边添加 SecondaryButton
   - 调整按钮组布局（flex row，gap-fib-3）
   - 确保响应式布局（移动端竖排）

3. **Phase 3: 测试覆盖**
   - 编写 SecondaryButton 单元测试（7-8 个测试用例）
   - 更新 HeroSection 测试（验证次级按钮存在）
   - 运行完整测试套件确保无回归

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.4: 次级 CTA 按钮] — Acceptance Criteria 和 FR 映射
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Button Hierarchy] — 按钮层级和样式规范
- [Source: _bmad-output/planning-artifacts/project-context.md#§8.7] — 设计系统色彩 token 用法
- [Source: _bmad-output/implementation-artifacts/stories/3-3-primary-cta-button.md] — PrimaryButton 实现参考

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

None required — implementation was straightforward without blocking issues.

### Completion Notes List

- Created `SecondaryButton.vue` component following the same structure as `PrimaryButton.vue` but with Secondary styling (transparent background, ochre border)
- Removed debounce logic from Secondary button (unnecessary for lower-hierarchy CTAs)
- Integrated `SecondaryButton` into `HeroSection.vue`, replacing the temporary `<a>` element with proper component
- All 8 SecondaryButton tests pass (props, href/target, ariaLabel, rel="noopener noreferrer", styling)
- HeroSection tests pass (11 tests verifying secondary CTA renders correctly)
- Fixed Vue component prop naming: used `ariaLabel` (camelCase) instead of `aria-label` (kebab-case) for type safety
- TypeScript `vue-tsc` type checking passes with no errors
- ESLint passes with no warnings
- Production build successful (1.25s build time)

### File List

**Created:**
- `src/components/CTAs/SecondaryButton.vue`
- `src/components/CTAs/__tests__/SecondaryButton.test.ts`

**Modified:**
- `src/components/Hero/HeroSection.vue` (imported SecondaryButton, replaced temporary `<a>` with `<SecondaryButton>`)

### Change Log

- 2026-02-10: Story 3.4 created — ready for development
- 2026-02-10: Story 3.4 completed — SecondaryButton implemented, tested, and integrated
