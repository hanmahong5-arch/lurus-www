# Story 3.6: Final CTA 区段

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a 访客,
I want 在页面底部看到品牌标语和行动号召,
So that 我在浏览完内容后可以采取下一步行动。

## Acceptance Criteria

1. **品牌标语显示**: 页面底部 (Footer 之前) Final CTA 区段显示品牌标语，使用 Caveat 字体和 phi-2xl 大小，文案如"全栈自建，匠心品质。"
2. **双按钮 CTA**: 显示双按钮组，包含 [获取 API Key] (Primary) 和 [联系我们] (Secondary)。
3. **居中布局**: 内容居中对齐，上下有大面积留白 (fib-7 间距)。
4. **语义化标记**: 使用 `<section>` 标签，包含 `aria-label="行动号召"`。
5. **响应式适配**: 移动端按钮竖排，桌面端水平排列。

## Tasks / Subtasks

- [ ] Task 1: 创建 FinalCTA 组件 (AC: #1, #2, #3, #4)
  - [ ] 1.1 创建 `src/components/CTAs/FinalCTA.vue`
  - [ ] 1.2 实现品牌标语: Caveat 字体, text-phi-2xl, text-ink-900
  - [ ] 1.3 实现双按钮组: 使用 PrimaryButton + SecondaryButton
  - [ ] 1.4 实现居中布局: max-w-4xl mx-auto, text-center
  - [ ] 1.5 实现上下间距: py-fib-7 (55px vertical padding)
  - [ ] 1.6 实现响应式: 按钮组 flex-col sm:flex-row gap-fib-4
  - [ ] 1.7 添加语义标记: `<section aria-label="行动号召">`
- [ ] Task 2: 集成到页面布局 (AC: all)
  - [ ] 2.1 在 `src/pages/Home.vue` 中引入 FinalCTA
  - [ ] 2.2 将 FinalCTA 放置在 Footer 之前（页面最后一个内容区段）
  - [ ] 2.3 确保与现有区段间距一致
- [ ] Task 3: 编写测试 (AC: all)
  - [ ] 3.1 创建 `src/components/CTAs/__tests__/FinalCTA.test.ts`
  - [ ] 3.2 测试: 品牌标语文本正确渲染
  - [ ] 3.3 测试: Caveat 字体类 font-caveat 存在
  - [ ] 3.4 测试: phi-2xl 大小类存在
  - [ ] 3.5 测试: PrimaryButton 渲染并传递正确的 href 和 ariaLabel
  - [ ] 3.6 测试: SecondaryButton 渲染并传递正确的 href 和 ariaLabel
  - [ ] 3.7 测试: section 标签存在且有 aria-label 属性
  - [ ] 3.8 测试: 响应式 CSS 类存在 (flex-col, sm:flex-row)
  - [ ] 3.9 测试: 垂直 padding py-fib-7 存在

## Dev Notes

### 架构约束

- **CSS-first, JS-last** (Architecture Key Principle #2): 布局和响应式使用纯 CSS/Tailwind，避免 JS resize listeners
- **组件 a11y 接口** (ADR-012): FinalCTA 使用语义化 `<section>` 标签，并包含 `aria-label`
- **设计系统 token** (project-context §8.3): 使用 Caveat 字体（品牌标语），fibonacci 间距 (fib-7)
- **无障碍** (ADR-012): 所有按钮必须传递 `ariaLabel` prop，键盘导航和 focus-visible 焦点环
- **语义化 HTML**: 使用 `<section>` 而非 `<div>`，提升 SEO 和可访问性

### 组件结构设计

```vue
<template>
  <section aria-label="行动号召" class="py-fib-7 bg-cream-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Brand Tagline -->
      <h2 class="font-caveat text-phi-2xl text-ink-900 mb-fib-5">
        全栈自建，匠心品质。
      </h2>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-fib-4 justify-center items-center">
        <PrimaryButton
          text="获取 API Key"
          href="https://api.lurus.cn"
          ariaLabel="跳转到 API Key 注册页面"
        />
        <SecondaryButton
          text="联系我们"
          href="https://lurus.cn/contact"
          ariaLabel="跳转到联系我们页面"
        />
      </div>
    </div>
  </section>
</template>
```

### 设计规范

- **区段样式**:
  - 背景: `bg-cream-50` (浅色背景，与页面其他区段区分)
  - 垂直 padding: `py-fib-7` (55px)
  - 水平 padding: `px-4 sm:px-6 lg:px-8` (与其他区段一致)
  - 最大宽度: `max-w-4xl mx-auto` (内容居中)
  - 文本对齐: `text-center`

- **品牌标语样式**:
  - 字体: `font-caveat` (Caveat 手绘字体，品牌识别元素)
  - 字号: `text-phi-2xl` (约 32-38px，响应式缩放)
  - 颜色: `text-ink-900` (深色墨水色)
  - 下边距: `mb-fib-5` (34px，与按钮组间距)
  - 语义: 使用 `<h2>` 标签（区段主标题）

- **按钮组样式**:
  - 布局: `flex flex-col sm:flex-row gap-fib-4 justify-center items-center`
  - 移动端: 竖排 (flex-col)，按钮占满宽度
  - 桌面端: 水平排列 (sm:flex-row)，居中对齐
  - 间距: `gap-fib-4` (21px)
  - 对齐: `justify-center items-center` (水平垂直居中)

- **按钮配置**:
  - 主按钮 (PrimaryButton):
    - 文本: "获取 API Key"
    - 链接: `https://api.lurus.cn`
    - ariaLabel: "跳转到 API Key 注册页面"
  - 次级按钮 (SecondaryButton):
    - 文本: "联系我们"
    - 链接: `https://lurus.cn/contact` (待确定最终 URL)
    - ariaLabel: "跳转到联系我们页面"

### 现有代码参考

**Home.vue 中现有的中间 CTA section** (`src/pages/Home.vue` 第 63-99 行):
```vue
<section class="py-fib-7 bg-cream-100 relative overflow-hidden">
  <!-- Decorative pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="..."></div>

  <!-- Corner decorations -->
  <div class="absolute top-12 left-12 doodle-corner opacity-40"></div>
  <div class="absolute top-12 right-12 doodle-corner -scale-x-100 opacity-40"></div>

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
- 现有实现使用 `<a>` + `.btn-hand` 样式类（旧实现）
- **Final CTA 应复用 `PrimaryButton` 和 `SecondaryButton` 组件**（保持一致性，参考 Story 3.5 CTABar）
- 现有实现有装饰元素（corner doodles, decorative pattern），Final CTA 可以保持简洁或添加类似装饰（可选）
- 现有实现使用 `reveal-fade-up` 动画类（可选，Final CTA 可添加相同动画）

**PrimaryButton 和 SecondaryButton 组件** (Story 3.3-3.4 已实现):
- 两个组件都接受 `{ text: string; href: string; ariaLabel: string }` props
- 已包含手绘风格圆角、hover 动效、focus-visible 焦点环
- PrimaryButton 有 300ms 防抖（防止重复点击）
- SecondaryButton 无防抖（次级操作）
- 都支持 `target="_blank"` 外部链接，自动添加 `rel="noopener noreferrer"` 安全属性

### 装饰元素选项（可选）

**Option A: 简洁设计（无装饰）**
- 适合: 页面底部已经有很多视觉元素（Platform Cards, Portal Links, Footer）
- 优势: 保持轻量，视觉焦点在品牌标语和 CTA 按钮
- 实现: 使用 `bg-cream-50` 浅色背景区分区段即可

**Option B: 添加装饰元素（与现有中间 CTA section 保持一致）**
- 适合: 需要品牌一致性，Final CTA 作为页面"高潮"
- 装饰元素:
  - Decorative grid pattern (subtle, opacity-[0.02])
  - Corner doodles (doodle-corner class, opacity-40)
- 实现: 复用现有装饰 CSS classes，添加 `position: relative` + `overflow-hidden`

**推荐**: 使用 **Option A (简洁设计)**，理由：
1. 页面底部已有 Portal Links 区段（视觉密度较高）
2. Final CTA 作为"收尾"，简洁设计更利于视觉引导至按钮
3. 品牌标语 (Caveat 字体) 本身已经是强识别元素
4. 可以在后续迭代中添加装饰（不影响功能）

### 品牌标语文案

**来自 AC**: "全栈自建，匠心品质。"

**替代方案** (如需要在实现时调整):
- "全栈自建，匠心品质。" (AC 原文，简洁有力)
- "自建全栈，匠心服务。" (强调服务)
- "全栈，始于匠心。" (更精简)

**推荐**: 使用 AC 原文 **"全栈自建，匠心品质。"**，除非产品负责人要求调整。

### 响应式行为

| 视口宽度 | 布局 | 标语字号 | 按钮排列 |
|---------|------|---------|---------|
| < 640px (mobile) | 单列 | text-phi-2xl | 竖排 (flex-col) |
| ≥ 640px (tablet+) | 单列 | text-phi-2xl | 水平 (flex-row) |
| ≥ 1024px (desktop) | 单列 | text-phi-2xl | 水平 (flex-row) |

**注意**: 品牌标语在移动端**不缩小**（保持 phi-2xl），确保品牌识别。如果移动端显示过大，可添加 `sm:text-phi-3xl` 在桌面端放大（但 AC 要求 phi-2xl，不建议修改）。

### 测试策略

- **FinalCTA.test.ts**: 使用 `@vue/test-utils` mount 组件，验证:
  - 品牌标语文本 "全栈自建，匠心品质。" 渲染
  - Caveat 字体类 `font-caveat` 存在
  - phi-2xl 大小类 `text-phi-2xl` 存在
  - PrimaryButton 渲染，传递正确的 text/href/ariaLabel
  - SecondaryButton 渲染，传递正确的 text/href/ariaLabel
  - `<section>` 标签存在，包含 `aria-label="行动号召"` 属性
  - 响应式 CSS 类存在: `flex-col sm:flex-row`
  - 垂直 padding `py-fib-7` 存在
  - 居中布局 `max-w-4xl mx-auto text-center` 存在

- **E2E 测试** (可选，Playwright):
  - 页面底部显示 Final CTA 区段
  - 点击 "获取 API Key" 按钮跳转到正确 URL
  - 点击 "联系我们" 按钮跳转到正确 URL
  - 键盘导航 (Tab) 可聚焦按钮，Enter 可激活

### 文件创建清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/CTAs/FinalCTA.vue` | 新建 | Final CTA 区段组件 |
| `src/components/CTAs/__tests__/FinalCTA.test.ts` | 新建 | 组件单元测试 |
| `src/pages/Home.vue` | 修改 | 引入 FinalCTA，放置在 Footer 之前 |

### Project Structure Notes

- `src/components/CTAs/` 目录已存在 (Story 3.3-3.5 创建)
- FinalCTA 与其他 CTA 组件放在同一目录，便于管理
- 遵循现有组件模式: `<script setup lang="ts">` + `<template>` + `<style scoped>`
- 复用 PrimaryButton/SecondaryButton 组件，保持按钮样式一致性

### Implementation Plan

1. **Phase 1: 创建 FinalCTA 组件**
   - 创建 `src/components/CTAs/FinalCTA.vue`
   - 实现区段布局: `<section>` + `aria-label` + bg-cream-50 + py-fib-7
   - 实现品牌标语: `<h2>` + font-caveat + text-phi-2xl + "全栈自建，匠心品质。"
   - 实现按钮组: flex 容器 + PrimaryButton + SecondaryButton
   - 实现响应式: flex-col (mobile) / flex-row (desktop)

2. **Phase 2: 集成到 Home.vue**
   - 在 `src/pages/Home.vue` 中引入 FinalCTA
   - 将 FinalCTA 放置在 Footer 组件之前（页面最后一个内容区段）
   - 确保与上下区段间距一致（无额外 margin/padding）

3. **Phase 3: 测试覆盖**
   - 编写 FinalCTA 单元测试 (9 个测试用例)
   - 运行 `bun run test:unit` 确保所有测试通过
   - 运行 `bun run typecheck` 确保 TypeScript 类型检查通过
   - 运行 `bun run lint` 确保 ESLint 零警告

4. **Phase 4: 视觉验证**
   - 运行 `bun run dev` 启动开发服务器
   - 在浏览器中滚动至页面底部，验证 Final CTA 区段显示
   - 验证品牌标语 Caveat 字体正确渲染
   - 验证按钮组在移动端/桌面端响应式正确
   - 验证点击按钮跳转到正确 URL
   - 验证键盘导航 (Tab + Enter) 正常工作

### Previous Story Intelligence

**从 Story 3.5 (CTABar) 学到的经验**:
- 复用 PrimaryButton/SecondaryButton 时，使用 camelCase props (`ariaLabel`) 而非 kebab-case
- 使用 :deep() CSS selector 可以覆盖子组件样式，但 Final CTA 使用默认按钮大小，无需 override
- 响应式布局使用 Tailwind 断点 (`sm:`, `md:`, `lg:`) 而非 JS resize listeners
- 测试必须覆盖所有 AC 点：布局、样式、文本内容、语义标记

**从 Story 3.4 (SecondaryButton) 学到的经验**:
- SecondaryButton 无防抖逻辑，适合次级操作
- 外部链接自动添加 `target="_blank"` 和 `rel="noopener noreferrer"` 安全属性
- TypeScript `vue-tsc` 类型检查必须零错误

**从 Story 3.3 (PrimaryButton) 学到的经验**:
- PrimaryButton 有 300ms 防抖，防止用户快速重复点击
- 手绘风格圆角 `border-radius: 3px 10px 5px 12px / 12px 5px 10px 3px` 是品牌识别元素
- hover-breathe 和 click-elastic 动效是品牌交互风格
- prefers-reduced-motion 支持是无障碍硬性要求

**从 Story 3.2 (Hero 双列布局) 学到的经验**:
- 使用 `max-w-4xl mx-auto` 保持内容宽度一致性
- 响应式布局: 移动端堆叠 (flex-col)，桌面端并排 (flex-row)
- 使用 fibonacci spacing (fib-4, fib-5, fib-6, fib-7) 保持视觉节奏

### Git Intelligence Summary

**最近提交分析**:
- 最新提交: `9280a07 feat: implement Download system with GitHub Releases integration`
- CTA 相关提交:
  - `feat(cta): implement SecondaryButton component (Story 3.4)`
  - `feat(cta): implement PrimaryButton component (Story 3.3)`
  - Story 3.5 (CTABar) 提交信息待查（可能在最近 10 次提交之前）
- 代码审查提交: `0e18277 docs(code-review): add Stories 3.1-3.4 comprehensive review report`
- 安全修复: `fix(security): add rel noopener noreferrer to external links`

**提交信息规范**:
- 使用 Conventional Commits 格式: `feat(component):`, `fix(area):`, `docs(module):`
- 组件提交使用 `feat(cta):` 前缀
- 在提交信息中注明 Story ID: `(Story 3.6)`

### Known Issues & Risks

**潜在问题**:
1. **"联系我们" 链接 URL 待确定**: AC 未明确最终 URL，可能是:
   - `https://lurus.cn/contact` (建议，本站内页面)
   - `mailto:contact@lurus.cn` (邮箱链接)
   - `https://docs.lurus.cn/contact` (文档站联系页)
   - **行动**: 在实现前与产品负责人确认，或使用占位 URL `https://lurus.cn/contact`

2. **Caveat 字体加载**: 确保 Caveat 字体已在项目中正确配置 (Story 2.1 应已完成)
   - **行动**: 在实现前检查 `src/assets/fonts/` 是否包含 Caveat 字体文件
   - **行动**: 确认 `tailwind.config.js` 中 `fontFamily.caveat` 配置正确

3. **与现有中间 CTA section 的冲突**: Home.vue 中已有一个中间 CTA section (第 63-99 行)
   - **风险**: 两个 CTA section 可能视觉冲突或文案重复
   - **行动**: 在集成时检查是否需要调整现有 section 的文案或样式
   - **备选方案**: 如果冲突，考虑移除现有中间 CTA section，仅保留 Final CTA

### Decision Points

**决策点 1: 是否添加装饰元素？**
- **选项 A**: 简洁设计（无装饰），仅使用 bg-cream-50 背景区分
- **选项 B**: 添加装饰元素（corner doodles, decorative pattern），与现有中间 CTA section 一致
- **推荐**: 选项 A（简洁设计）
- **理由**: 页面底部视觉密度较高，简洁设计更利于引导至 CTA 按钮

**决策点 2: 是否添加 reveal-fade-up 动画？**
- **选项 A**: 添加 `reveal-fade-up` 动画类（与现有中间 CTA section 一致）
- **选项 B**: 无动画（简洁实现）
- **推荐**: 选项 B（无动画）
- **理由**: Final CTA 位于页面底部，用户滚动到此时已浏览大量内容，过多动画可能分散注意力；如果需要动画，可以在后续迭代添加

**决策点 3: "联系我们" 链接 URL？**
- **选项 A**: `https://lurus.cn/contact` (本站联系页面，需创建)
- **选项 B**: `mailto:contact@lurus.cn` (邮箱链接)
- **选项 C**: `https://docs.lurus.cn/contact` (文档站联系页)
- **推荐**: 选项 A（本站联系页面）
- **理由**: 保持用户在本站内，提供更丰富的联系方式选择（邮箱、微信、GitHub 等）
- **行动**: 如 `/contact` 页面不存在，暂时链接到 `https://docs.lurus.cn` 或 `mailto:contact@lurus.cn`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.6: Final CTA 区段] — Acceptance Criteria 和 FR 映射
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Button Hierarchy] — 按钮层级和样式规范
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography] — Caveat 字体使用规范
- [Source: src/components/CTAs/PrimaryButton.vue] — PrimaryButton 组件实现
- [Source: src/components/CTAs/SecondaryButton.vue] — SecondaryButton 组件实现
- [Source: src/pages/Home.vue#L63-L99] — 现有中间 CTA section 实现参考
- [Source: _bmad-output/implementation-artifacts/stories/3-5-mid-cta-bar.md] — CTABar Story (前一个 Story)
- [Source: _bmad-output/implementation-artifacts/stories/3-4-secondary-cta-button.md] — SecondaryButton Story
- [Source: _bmad-output/implementation-artifacts/stories/3-3-primary-cta-button.md] — PrimaryButton Story

## Dev Agent Record

### Agent Model Used

_To be filled by dev agent_

### Debug Log References

_To be filled by dev agent_

### Completion Notes List

_To be filled by dev agent upon completion_

### File List

**Created:**
- `src/components/CTAs/FinalCTA.vue` (to be created)
- `src/components/CTAs/__tests__/FinalCTA.test.ts` (to be created)

**Modified:**
- `src/pages/Home.vue` (to be modified, add FinalCTA before Footer)

### Change Log

- 2026-02-11: Story 3.6 created — ready for development
