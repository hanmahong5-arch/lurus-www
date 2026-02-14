# Story 5.1: 平台能力卡片网格

Status: done

## Story

As a 访客,
I want 浏览 6 张平台能力卡片,
So that 我可以了解 Lurus API Gateway 的核心功能。

## Acceptance Criteria

1. **6 个能力卡片**: Platform Overview 区段显示 6 个能力图标卡: 50+ 模型、负载均衡、自动回退、响应缓存、实时监控、OpenAI 兼容。每卡含图标 + 标题 + 一句描述。
2. **数据集中化**: 6 张卡片数据从 `src/data/platformCapabilities.ts` 导入，不在组件内硬编码。数据文件有对应 TypeScript 类型定义。
3. **卡片样式**: 使用 `card-sketchy` 容器样式。使用 cream/ink/ochre 设计 token，禁止 Tailwind 默认调色板。
4. **hover 动效**: 卡片 hover 时显示 `hover-breathe` 微动效。ReducedMotion (`prefers-reduced-motion: reduce`) 时禁用。
5. **Badge 标签**: 区段顶部显示 "AI Gateway" Badge 标签。
6. **响应式布局**: 桌面端 3 列 (3x2) 网格，平板 2 列，移动端单列堆叠。
7. **滚动揭示**: 卡片使用 `reveal-stagger` CSS 类，配合 `useScrollReveal` composable 实现渐显动画。
8. **无障碍**: 区段使用语义化 HTML `<section>` + `aria-label`。装饰性图标使用 `aria-hidden="true"`。
9. **重构现有组件**: 用新的 `PlatformCapabilities.vue` 替换现有的 `FeatureGrid.vue`（更新数据、文案、图标），在 `Home.vue` 中更新引用。现有 FeatureGrid 的 CTABar 集成需保留。
10. **测试**: 组件测试覆盖渲染、数据传递、卡片数量、响应式类、a11y 属性。

## Tasks / Subtasks

- [x] Task 1: 创建数据文件和类型 (AC: #2)
  - [x] 1.1 创建 `src/types/platform.ts`，定义 `PlatformCapability` 接口 (`id`, `icon`, `title`, `description`)
  - [x] 1.2 创建 `src/data/platformCapabilities.ts`，导出 6 张卡片数据（50+ 模型、负载均衡、自动回退、响应缓存、实时监控、OpenAI 兼容），使用 `satisfies` 类型约束
  - [x] 1.3 导出 `platformCapabilityIcons` SVG path 记录，按 icon id 映射
  - [x] 1.4 更新 `src/data/README.md` 添加新数据文件索引条目
- [x] Task 2: 创建 PlatformCapabilities 组件 (AC: #1, #3, #4, #5, #6, #7, #8)
  - [x] 2.1 创建 `src/components/Features/PlatformCapabilities.vue`
  - [x] 2.2 导入 `platformCapabilities` 和 `platformCapabilityIcons` 数据
  - [x] 2.3 实现 "AI Gateway" Badge 标签 (顶部 `border-sketchy-light` 容器)
  - [x] 2.4 实现区段标题和副标题
  - [x] 2.5 实现 3 列网格 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
  - [x] 2.6 每卡: 图标容器 (`card-sketchy`) + SVG 图标 + 标题 + 描述文本
  - [x] 2.7 hover 效果: `hover-breathe` class + ReducedMotion 检测
  - [x] 2.8 滚动揭示: 网格容器添加 `reveal-stagger` class
  - [x] 2.9 语义化: `<section id="platform" aria-label="平台能力">` + 装饰图标 `aria-hidden="true"`
  - [x] 2.10 保留 CTABar 集成 (从 FeatureGrid 迁移配置)
- [x] Task 3: 集成到 Home.vue (AC: #9)
  - [x] 3.1 在 `Home.vue` 中替换 `FeatureGrid` 为 `PlatformCapabilities`
  - [x] 3.2 更新 import 语句
  - [x] 3.3 验证页面布局和区段顺序不变
- [x] Task 4: 编写测试 (AC: #10)
  - [x] 4.1 创建 `src/components/Features/__tests__/PlatformCapabilities.test.ts`
  - [x] 4.2 测试: 渲染 6 张能力卡片
  - [x] 4.3 测试: 每卡含图标、标题、描述
  - [x] 4.4 测试: "AI Gateway" Badge 存在
  - [x] 4.5 测试: section 具有正确的 aria-label
  - [x] 4.6 测试: 装饰性 SVG 图标有 aria-hidden="true"
  - [x] 4.7 测试: 数据文件导出 6 个条目且类型正确
  - [x] 4.8 创建 `src/data/__tests__/platformCapabilities.test.ts` 数据文件测试

## Dev Notes

### 架构约束

- **数据集中化** (ADR-006): 所有内容数据放 `src/data/`，组件只负责渲染
- **零硬编码**: 卡片文案、图标路径、颜色全部从数据文件导入
- **设计系统 token** (project-context §8.3): 使用 cream/ink/ochre 色彩体系，禁止 Tailwind 默认调色板
- **组件 a11y** (ADR-012): section 需 aria-label，交互/装饰元素需适当 ARIA
- **CSS-first, JS-last** (Key Principle #2): hover 动效用纯 CSS
- **Scoped style** (project-context §7.5): `<style scoped>` 必须 `@reference "../../styles/main.css"`

### 与现有 FeatureGrid 的关系

现有 `FeatureGrid.vue` 展示 6 个"核心优势"卡片（企业级安全、极致性能、统一接口等），这是 Wave 1 的占位内容。Story 5.1 需要用 PRD S3 规格的"平台能力"卡片替换它:

| 现有 FeatureGrid | 新 PlatformCapabilities |
|------------------|------------------------|
| "核心优势" Badge | "AI Gateway" Badge |
| 企业级安全 | 50+ 模型 |
| 极致性能 | 负载均衡 |
| 统一接口 | 自动回退 |
| 弹性扩展 | 响应缓存 |
| 实时监控 | 实时监控 |
| 专业支持 | OpenAI 兼容 |

**策略**: 创建新组件 `PlatformCapabilities.vue`，保留 FeatureGrid 的 layout 骨架和 CTABar 集成，更新数据和文案。`FeatureGrid.vue` 可保留但不再被 Home.vue 引用。

### 6 张卡片数据规格

| ID | 图标 | 标题 | 描述 |
|----|------|------|------|
| models | layers | 50+ AI 模型 | 一站式接入 Claude、GPT、Gemini、DeepSeek 等主流模型 |
| load-balancing | scale | 智能负载均衡 | 多供应商自动分流，确保最优延迟和可用性 |
| auto-fallback | shield | 自动回退 | 主模型异常时自动切换备用供应商，零停机体验 |
| response-cache | zap | 响应缓存 | 相同请求智能缓存，降低成本、提升响应速度 |
| monitoring | chart | 实时监控 | 完整调用链追踪，可视化用量和性能分析面板 |
| openai-compat | code | OpenAI 兼容 | 兼容 OpenAI SDK 接口，一行代码迁移 |

### 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/platform.ts` | 新建 | PlatformCapability 接口 |
| `src/data/platformCapabilities.ts` | 新建 | 6 张卡片数据 + 图标路径 |
| `src/data/__tests__/platformCapabilities.test.ts` | 新建 | 数据文件测试 |
| `src/components/Features/PlatformCapabilities.vue` | 新建 | 新组件 |
| `src/components/Features/__tests__/PlatformCapabilities.test.ts` | 新建 | 组件测试 |
| `src/pages/Home.vue` | 修改 | 替换 FeatureGrid → PlatformCapabilities |
| `src/data/README.md` | 修改 | 添加新数据文件索引 |

### 组件接口

```typescript
// PlatformCapabilities.vue - no external props needed
// All data self-contained from src/data/platformCapabilities.ts
// CTABar config inline (same as FeatureGrid)
```

### 测试策略

- **数据文件测试**: 验证导出 6 个条目，每个条目具有 id/icon/title/description 字段
- **组件测试**: mount 组件 → 验证 6 张卡片渲染、Badge 文本、aria 属性、图标存在
- 使用 `@vue/test-utils` 的 `mount`，不需要 mock 外部依赖

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.1] — AC 和 FR 映射
- [Source: _bmad-output/planning-artifacts/prd.md#S3 Platform Overview] — 6 个能力卡片规格
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-006] — 数据集中化
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口
- [Source: src/components/Features/FeatureGrid.vue] — 现有组件结构参考
- [Source: src/styles/main.css] — card-sketchy、hover-breathe、reveal-stagger 样式定义

## Dev Agent Record

### Completion Notes List

- Created `PlatformCapability` type interface and `PlatformCapabilityIconPaths` type in `src/types/platform.ts`
- Created `platformCapabilities` data file with 6 entries (models, load-balancing, auto-fallback, response-cache, monitoring, openai-compat) and icon SVG paths
- Created `PlatformCapabilities.vue` component with 3-column responsive grid, card-sketchy containers, AI Gateway badge, hover-breathe effect, scroll reveal animation, CTABar integration
- Replaced `FeatureGrid` import with `PlatformCapabilities` in `Home.vue` — layout and section order preserved
- Updated `src/data/README.md` with new data file index entry
- All decorative elements properly marked `aria-hidden="true"`, section has `aria-label` and semantic `id="platform"`
- hover-breathe CSS implemented in scoped style with ReducedMotion disable (`prefers-reduced-motion: reduce`)
- 20 new tests: 5 data file tests + 15 component tests (rendering, accessibility, layout, CTABar integration)
- tsc --noEmit: zero errors; ESLint: zero errors/warnings; vite build: success; full test suite: 277 passed

### File List

- `src/types/platform.ts` (new) — PlatformCapability interface and icon paths type
- `src/data/platformCapabilities.ts` (new) — 6 capability items + SVG icon paths
- `src/data/__tests__/platformCapabilities.test.ts` (new) — 5 data tests
- `src/components/Features/PlatformCapabilities.vue` (new) — Platform capabilities grid component
- `src/components/Features/__tests__/PlatformCapabilities.test.ts` (new) — 15 component tests
- `src/pages/Home.vue` (modified) — FeatureGrid → PlatformCapabilities
- `src/data/README.md` (modified) — Added platformCapabilities.ts entry

### Change Log

- 2026-02-13: Story 5.1 implemented — PlatformCapabilities component with 6 AI Gateway capability cards, data-driven from centralized data file, hover-breathe effects, scroll reveal, a11y compliance. 20 new tests added. All quality gates pass.
