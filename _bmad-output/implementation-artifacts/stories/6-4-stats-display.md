# Story 6.4: 统计数字展示

Status: ready-for-dev

## Story

As a 访客,
I want 在产品区附近看到量化统计数字,
So that 我可以对平台规模有直观认识。

## Acceptance Criteria

1. **StatsDisplay 组件**: 创建独立的 `StatsDisplay.vue` 组件，在 Products 区段之后渲染，展示关键统计数字作为信任锚点。
2. **统计内容**: 显示来自 `src/data/stats.ts` 的关键指标（99.9% 可用性, 50+ 模型, <100ms 延迟, 10M+ API 调用/天），每个指标用各自的产品色突出显示。
3. **数据集中化 (ADR-006)**: 所有统计数据从 `src/data/stats.ts` 读取，组件不硬编码任何数值。
4. **信任锚点样式**: 统计卡片使用 `border-sketchy` + `bg-cream-100` 样式，与产品区段视觉关联。Wave 1 无计数动画。
5. **响应式布局**: 桌面端 4 列 (`md:grid-cols-4`)，移动端 2 列 (`grid-cols-2`)。
6. **滚动揭示**: 统计卡片网格使用 `reveal-stagger` CSS 类实现交错渐入动效。
7. **无障碍**: section 使用 `aria-label`; 装饰性元素使用 `aria-hidden="true"`。
8. **设计系统**: 使用 cream/ink/ochre token，禁止 Tailwind 默认调色板。数值使用 `text-phi-2xl font-bold`，标签使用 `text-ink-500`。
9. **从 Home.vue 提取**: 将 Home.vue 中现有的 inline Stats section 提取为独立组件，保持现有视觉效果。
10. **测试**: 组件测试覆盖: 渲染所有 4 个统计项、每项显示 value 和 label、section aria-label、装饰元素 aria-hidden、reveal-stagger class、数据来源正确性。

## Tasks / Subtasks

- [ ] Task 1: 创建 StatsDisplay 组件 (TDD: RED → GREEN) (AC: #1, #2, #3, #4, #5, #6, #7, #8, #9)
  - [ ] 1.1 编写组件测试 `src/components/Products/__tests__/StatsDisplay.test.ts`
  - [ ] 1.2 创建 `src/components/Products/StatsDisplay.vue`，从 Home.vue 提取 Stats section
  - [ ] 1.3 使用 `stats` 数据 from `src/data/stats.ts`
  - [ ] 1.4 Section 包含 `aria-label`, 装饰元素包含 `aria-hidden="true"`
  - [ ] 1.5 使用 `reveal-stagger` 动效, `border-sketchy`, `bg-cream-100`
  - [ ] 1.6 响应式: `grid-cols-2 md:grid-cols-4`

- [ ] Task 2: 更新 Home.vue (AC: #9)
  - [ ] 2.1 在 Home.vue 中用 `<StatsDisplay />` 替换 inline Stats section
  - [ ] 2.2 移除 Home.vue 中不再需要的 stats 相关 import (如果 StatsDisplay 自行导入)

- [ ] Task 3: 运行验证 (AC: #10)
  - [ ] 3.1 `bun run test` 全部通过
  - [ ] 3.2 `bun run typecheck` 零新增错误

## Dev Notes

### Architecture

- **提取重构**: Home.vue 已有 inline Stats section，本 story 将其提取为独立组件以提高可维护性
- **数据集中化** (ADR-006): stats 数据已存在于 `src/data/stats.ts`，组件直接导入
- **零硬编码**: 所有数值、标签、颜色来自数据文件
- **CSS-first**: hover 动效使用纯 CSS `hover:shadow-paper-hover transition-all`
- **Scoped style**: `<style scoped>` 使用 `@reference "../../styles/main.css"`

### 现有 Stats Section (Home.vue)

当前 Stats 区段已在 Home.vue lines 81-98 中以 inline template 实现:
- `py-16 bg-cream-50` 容器
- doodle-corner 装饰元素
- `grid-cols-2 md:grid-cols-4` 网格
- 每个 stat: `border-sketchy bg-cream-100` 卡片, value (`text-phi-2xl font-bold`) + label (`text-ink-500`)

提取时保持现有视觉效果不变，只改变组织方式。

### 与相邻 Story 的关系

- 6-1 (done): 建立了区段骨架 + 主卡
- 6-2 (done): 提取了 ProductSubCard 独立组件
- 6-3 (done): 添加了产品截图/代码块展示区域 + 降级逻辑
- **6-4 (本 story)**: 添加统计数字展示组件，Epic 6 最后一个 story

### File List

| File | Operation | Description |
|------|-----------|-------------|
| `src/components/Products/__tests__/StatsDisplay.test.ts` | Created | Component tests |
| `src/components/Products/StatsDisplay.vue` | Created | Stats display component |
| `src/pages/Home.vue` | Modified | Replace inline Stats with StatsDisplay component |
