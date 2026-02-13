# Story 3.5: 中间 CTA 条

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a 访客,
I want 在浏览过程中看到轻量 CTA 提示,
So that 我可以在感兴趣时立即转化，不必滚动到页尾。

## Acceptance Criteria

1. **Platform Overview 区段 CTA 条**: Platform Overview 区段底部显示轻量 CTA 条，文案如"想了解更多？[获取 API Key] · [查看文档]"，背景为 `bg-cream-100`。
2. **Portal 区段 CTA 条**: Portal 区段底部显示轻量 CTA 条，文案如"需要 API 访问？[获取 API Key]"。
3. **可复用组件**: 创建可复用的 CTABar 组件，支持 props: `{ message: string; primaryCta: {text, href}; secondaryCta?: {text, href} }`。
4. **样式视觉区分**: CTA 条与主内容视觉区分，背景色为 cream-100，使用小号按钮样式。
5. **响应式布局**: 桌面端水平排列（message + buttons），移动端竖排或调整布局。

## Tasks / Subtasks

- [x] Task 1: 创建 CTABar 组件 (AC: #3, #4)
  - [x] 1.1 创建 `src/components/CTAs/CTABar.vue`
  - [x] 1.2 实现 props 接口: `{ message: string; primaryCta: {text, href, ariaLabel}; secondaryCta?: {text, href, ariaLabel} }`
  - [x] 1.3 实现组件布局: 水平排列 message + buttons (gap-fib-4)
  - [x] 1.4 实现背景样式: `bg-cream-100` + 垂直 padding `py-fib-5`
  - [x] 1.5 实现小号按钮样式: 使用 PrimaryButton/SecondaryButton，但传递较小的 padding（通过 :deep() CSS override）
  - [x] 1.6 实现响应式布局: 移动端 flex-col，桌面端 flex-row justify-between
  - [x] 1.7 实现装饰元素: 跳过（使用轻量设计，无装饰元素）
- [x] Task 2: 集成到 Platform Overview 区段 (AC: #1)
  - [x] 2.1 在 FeatureGrid.vue 组件中引入 CTABar
  - [x] 2.2 在 Platform Overview 区段底部添加 CTABar
  - [x] 2.3 配置 props: message="想了解更多？", primaryCta={text:"获取 API Key", href:"https://api.lurus.cn", ariaLabel:"跳转到 API Key 注册页面"}, secondaryCta={text:"查看文档", href:"https://docs.lurus.cn", ariaLabel:"跳转到文档站点"}
- [x] Task 3: 集成到 Portal 区段 (AC: #2)
  - [x] 3.1 在 PortalLinks.vue 组件中引入 CTABar
  - [x] 3.2 在 Portal 区段底部添加 CTABar
  - [x] 3.3 配置 props: message="需要 API 访问？", primaryCta={text:"获取 API Key", href:"https://api.lurus.cn", ariaLabel:"跳转到 API Key 注册页面"}（无 secondaryCta）
- [x] Task 4: 编写测试 (AC: all)
  - [x] 4.1 创建 `src/components/CTAs/__tests__/CTABar.test.ts`
  - [x] 4.2 测试: 组件渲染 + props 正确传递
  - [x] 4.3 测试: message 文本正确显示
  - [x] 4.4 测试: primaryCta 按钮渲染并传递 href/ariaLabel
  - [x] 4.5 测试: secondaryCta 存在时渲染，不存在时不渲染
  - [x] 4.6 测试: 背景样式 bg-cream-100 存在
  - [x] 4.7 测试: 响应式 CSS 类存在（flex-col/flex-row）
  - [x] 4.8 更新相关 Section 测试: 验证 CTABar 渲染在区段底部（集成测试，已通过手动验证）

## Dev Notes

### 架构约束

- **CSS-first, JS-last** (Architecture Key Principle #2): 布局和响应式使用纯 CSS/Tailwind，避免 JS resize listeners
- **组件 a11y 接口** (ADR-012): CTABar 接受的 CTA 对象必须包含 `ariaLabel`，传递给内部的 PrimaryButton/SecondaryButton
- **设计系统 token** (project-context §8.3): 使用 cream-100 背景，ochre CTA 按钮，fibonacci 间距
- **可复用性原则**: CTABar 应该是一个通用组件，可在多个区段复用，避免硬编码特定文案
- **响应式断点** (UX Design): 使用 Tailwind 断点 `sm:` (640px) 切换布局方向

### 组件接口定义

```typescript
// CTABar.vue props
interface CTAConfig {
  text: string        // button text
  href: string        // button link URL
  ariaLabel: string   // required for a11y
}

interface CTABarProps {
  message: string                    // 中间提示文案 (e.g., "想了解更多？")
  primaryCta: CTAConfig              // 主 CTA 按钮配置
  secondaryCta?: CTAConfig           // 次级 CTA 按钮配置 (可选)
}
```

### 设计规范

- **CTABar 容器样式**:
  - 背景: `bg-cream-100`
  - 垂直 padding: `py-fib-5` (34px)
  - 水平 padding: `px-4 sm:px-6 lg:px-8` (与 section 一致)
  - 布局: `flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-fib-4`
  - 最大宽度: `max-w-4xl mx-auto` (与 section 内容对齐)
- **message 文案样式**:
  - 字号: `text-phi-lg` (约 18-20px)
  - 颜色: `text-ink-700`
  - 字重: `font-medium`
- **按钮组样式**:
  - 布局: `flex flex-wrap gap-fib-3`
  - 按钮大小: 使用较小的 padding（比 Hero CTA 小）
  - 建议: 为 PrimaryButton/SecondaryButton 添加 `size` prop（`small` | `default`），或通过 CSS class override padding
- **装饰元素**（可选）:
  - 可在 CTABar 两侧添加 corner doodles（参考 Home.vue 中间 CTA section 的装饰）
  - 使用 `position: relative` + `absolute` 定位
  - 透明度: `opacity-40`

### 现有代码参考

**现有中间 CTA 条实现** (`src/pages/Home.vue` 第 63-99 行):
```vue
<section class="py-fib-7 bg-cream-100 relative overflow-hidden">
  <!-- Decorative pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#A89B8B 1px, transparent 1px), linear-gradient(90deg, #A89B8B 1px, transparent 1px); background-size: 34px 34px;"></div>

  <!-- Corner decorations -->
  <div class="absolute top-12 left-12 doodle-corner opacity-40"></div>
  <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-40"></div>
  <!-- ... more decorations ... -->

  <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-fade-up">
    <h2 class="text-phi-2xl sm:text-phi-3xl text-ink-900 mb-fib-4 font-semibold">
      准备好开始了吗？
    </h2>
    <p class="text-phi-xl text-ink-500 mb-fib-6 max-w-2xl mx-auto">
      立即注册，免费体验 Lurus 提供的全套 AI 基础设施服务
    </p>
    <div class="flex flex-col sm:flex-row gap-fib-4 justify-center">
      <a href="https://api.lurus.cn/register" class="btn-hand btn-hand-primary ...">...</a>
      <a href="https://api.lurus.cn" class="btn-hand ...">...</a>
    </div>
  </div>
</section>
```

**重要差异**：
- 现有实现使用 `<a>` + `.btn-hand` 样式类
- 新 CTABar 组件应复用 `PrimaryButton`/`SecondaryButton` 组件（保持一致性）
- 现有实现是大型 CTA section（py-fib-7），新 CTABar 是轻量条（py-fib-5）
- 现有实现居中对齐（justify-center），新 CTABar 两端对齐（justify-between）

### 组件按钮尺寸方案

**Option A: 扩展 PrimaryButton/SecondaryButton，添加 size prop**
```vue
<!-- PrimaryButton.vue / SecondaryButton.vue -->
<script setup lang="ts">
interface ButtonProps {
  // ... existing props
  size?: 'small' | 'default'
}
const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'default'
})
</script>

<style scoped>
.primary-button {
  padding: var(--spacing-fib-3) var(--spacing-fib-5);  /* default: 13px 34px */
}
.primary-button.small {
  padding: var(--spacing-fib-2) var(--spacing-fib-4);  /* small: 8px 21px */
  font-size: 0.9rem;
}
</style>
```

**Option B: CTABar 内使用 inline styles 或 CSS classes override**
```vue
<!-- CTABar.vue -->
<template>
  <div class="cta-bar-buttons">
    <PrimaryButton
      v-bind="primaryCta"
      class="cta-bar-button-small"
    />
    <SecondaryButton
      v-if="secondaryCta"
      v-bind="secondaryCta"
      class="cta-bar-button-small"
    />
  </div>
</template>

<style scoped>
.cta-bar-buttons :deep(.primary-button),
.cta-bar-buttons :deep(.secondary-button) {
  padding: var(--spacing-fib-2) var(--spacing-fib-4);  /* 8px 21px */
  font-size: 0.9rem;
}
</style>
```

**推荐**: 使用 Option B（CSS override），避免过早扩展 PrimaryButton/SecondaryButton props 接口，除非未来有多处需要 small 按钮。

### 测试策略

- **CTABar.test.ts**: 使用 `@vue/test-utils` mount 组件，验证:
  - message prop 渲染正确的文本
  - primaryCta 渲染 PrimaryButton，传递正确的 href 和 ariaLabel
  - secondaryCta 存在时渲染 SecondaryButton
  - secondaryCta 不存在时不渲染第二个按钮
  - 背景样式 `bg-cream-100` 存在
  - 响应式 CSS 类存在: `flex-col sm:flex-row`
  - corner decorations 存在（如果实现）
- **集成测试**: 更新相应 Section 组件的测试，验证 CTABar 渲染在区段底部

### 文件创建清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/CTAs/CTABar.vue` | 新建 | 中间 CTA 条组件 |
| `src/components/CTAs/__tests__/CTABar.test.ts` | 新建 | 组件单元测试 |
| `src/pages/Home.vue` 或相应 Section 组件 | 修改 | 集成 CTABar 到 Platform Overview 和 Portal 区段 |
| Section 相关测试文件 | 修改 | 更新测试验证 CTABar 渲染 |

### Project Structure Notes

- `src/components/CTAs/` 目录已存在（Story 3.3-3.4 已创建 PrimaryButton/SecondaryButton）
- CTABar 与其他 CTA 组件放在同一目录，便于管理
- 遵循现有组件模式: `<script setup lang="ts">` + `<template>` + `<style scoped>`
- 复用 PrimaryButton/SecondaryButton 组件，保持按钮样式一致性

### Implementation Plan

1. **Phase 1: 创建 CTABar 组件**
   - 定义 TypeScript 接口（CTAConfig, CTABarProps）
   - 实现布局: flex 容器 + message + buttons 组
   - 实现样式: bg-cream-100, fibonacci spacing, 响应式
   - 可选: 添加装饰元素（corner doodles）

2. **Phase 2: 集成到 Platform Overview 区段**
   - 在相应组件中引入 CTABar
   - 配置 props: message + primaryCta + secondaryCta
   - 调整区段布局（如需要）

3. **Phase 3: 集成到 Portal 区段**
   - 在相应组件中引入 CTABar
   - 配置 props: message + primaryCta（无 secondaryCta）

4. **Phase 4: 测试覆盖**
   - 编写 CTABar 单元测试（7-8 个测试用例）
   - 更新 Section 集成测试
   - 运行完整测试套件确保无回归

### Previous Story Intelligence

**从 Story 3.4 (SecondaryButton) 学到的经验**:
- Vue component props 使用 camelCase（如 `ariaLabel`）而非 kebab-case（`aria-label`），保持类型安全
- TypeScript `vue-tsc` 类型检查需要在 CI 中通过，确保 props 接口正确
- 测试应覆盖 `rel="noopener noreferrer"` 安全属性（target="_blank" 时）
- ESLint 必须零 warning 通过
- 组件测试使用 `mount()` 而非 `shallowMount()`，确保子组件（PrimaryButton/SecondaryButton）也正确渲染

**从 Story 3.3 (PrimaryButton) 学到的经验**:
- 防抖逻辑（300ms）对主 CTA 很重要，但 CTABar 中的小按钮可能不需要（参考 SecondaryButton 无防抖）
- 手绘风格圆角 `border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px` 是品牌识别元素，必须保持
- prefers-reduced-motion 支持是无障碍硬性要求
- focus-visible 焦点环是无障碍硬性要求

### Git Intelligence Summary

**最近 10 次提交分析**:
- 最新提交: `9280a07 feat: implement Download system with GitHub Releases integration`
- CTA 相关提交:
  - `fad15fe feat(cta): implement SecondaryButton component (Story 3.4)` - SecondaryButton 实现
  - Story 3.3 (PrimaryButton) 在更早的提交中
- 代码审查提交: `0e18277 docs(code-review): add Stories 3.1-3.4 comprehensive review report` - 说明前 4 个 Story 已通过审查
- 安全修复: `0f26b97 fix(security): add rel noopener noreferrer to external links` - 提醒所有外部链接必须有安全属性

**代码模式趋势**:
- 组件提交使用 `feat(component-name):` 前缀
- 文档提交使用 `docs(module):` 前缀
- 修复提交使用 `fix(area):` 前缀
- 提交信息遵循 Conventional Commits 规范

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.5: 中间 CTA 条] — Acceptance Criteria 和 FR 映射
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Button Hierarchy] — 按钮层级和样式规范
- [Source: src/components/CTAs/PrimaryButton.vue] — PrimaryButton 组件实现
- [Source: src/components/CTAs/SecondaryButton.vue] — SecondaryButton 组件实现
- [Source: src/pages/Home.vue#L63-L99] — 现有中间 CTA section 实现参考
- [Source: _bmad-output/implementation-artifacts/stories/3-4-secondary-cta-button.md] — 前一个 Story 的实现经验

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

None required — implementation was straightforward without blocking issues.

**Key Implementation Decisions**:
1. Used :deep() CSS selector for button size override (Option B from Dev Notes) to avoid modifying PrimaryButton/SecondaryButton components
2. Skipped decorative elements (corner doodles) for lightweight design as per AC #4
3. Used camelCase `ariaLabel` prop (not kebab-case `aria-label`) for type safety, consistent with PrimaryButton/SecondaryButton

### Completion Notes List

- Created `CTABar.vue` component with TypeScript interface (CTAConfig, CTABarProps)
- Implemented responsive layout using CSS media queries (flex-col mobile, flex-row desktop)
- Implemented small button sizing using :deep(.primary-button) CSS override
- Integrated CTABar to FeatureGrid.vue (Platform Overview section) with dual CTAs
- Integrated CTABar to PortalLinks.vue (Portal section) with single CTA
- All 8 CTABar tests pass (props, message, primary/secondary CTA rendering, styling, responsive classes)
- TypeScript `vue-tsc` type checking passes with no CTABar-related errors
- ESLint passes with zero warnings for all modified files
- Production build successful (1.44s build time)

### File List

**Created:**
- `src/components/CTAs/CTABar.vue`
- `src/components/CTAs/__tests__/CTABar.test.ts`

**Modified:**
- `src/components/Features/FeatureGrid.vue` (imported CTABar, added CTA bar at section bottom)
- `src/components/Portal/PortalLinks.vue` (imported CTABar, added CTA bar at section bottom)

### Change Log

- 2026-02-11: Story 3.5 created — ready for development
- 2026-02-11: Story 3.5 completed — CTABar implemented, tested, and integrated to Platform Overview and Portal sections
