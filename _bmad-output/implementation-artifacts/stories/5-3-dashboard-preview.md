# Story 5.3: 仪表盘预览

Status: done

## Story

As a 访客,
I want 看到 Lurus 控制台的仪表盘预览,
So that 我可以了解监控和管理界面的样子。

## Acceptance Criteria

1. **仪表盘预览区**: Platform Overview 区段中（CodeExampleShowcase 下方或紧邻），包含 DashboardPreview 组件，展示 Lurus API 控制台仪表盘预览。
2. **截图优先**: 当 Dashboard 截图可用时，以 `<img>` 展示，包裹在 `card-sketchy` 容器中。截图展示关键监控指标（调用量、延迟、模型分布等）。
3. **降级策略**: 当 Dashboard 截图不可用（图片加载失败或资产缺失）时，降级为 CodeShowcase 代码块，展示 API 监控数据 JSON 响应示例（从数据文件导入）。
4. **数据集中化**: 仪表盘预览配置（截图路径、降级代码内容、标题、描述）从 `src/data/dashboardPreview.ts` 导入，不在组件内硬编码。数据文件有对应 TypeScript 类型定义。
5. **懒加载**: 截图使用 `loading="lazy"` 属性延迟加载，不影响首屏 LCP。
6. **CLS 防护**: 截图容器有固定宽高比（aspect-ratio）placeholder，防止图片加载导致布局偏移 (CLS = 0)。
7. **响应式布局**: 桌面端预览区全宽（位于代码展示区下方），移动端全宽堆叠。
8. **滚动揭示**: 预览区使用 `reveal-fade-up` CSS 类配合 `useScrollReveal`。
9. **无障碍**: 截图有描述性 `alt` 文本。降级代码块有正确 `ariaLabel`。容器使用语义化 `<figure>` + `<figcaption>`。
10. **设计 token**: 使用 cream/ink/ochre 设计 token，禁止 Tailwind 默认调色板。容器使用 `card-sketchy` 样式。
11. **测试**: 组件测试覆盖截图渲染、降级触发、懒加载属性、CLS placeholder、a11y 属性、数据文件验证。

## Tasks / Subtasks

- [x] Task 1: 创建数据文件和类型 (AC: #4)
  - [x] 1.1 创建 `src/types/dashboardPreview.ts`，定义 `DashboardPreviewConfig` 接口 (`screenshotSrc`, `screenshotAlt`, `fallbackCode`, `fallbackLanguage`, `fallbackAriaLabel`, `title`, `caption`)
  - [x] 1.2 创建 `src/data/dashboardPreview.ts`，导出预览配置：截图路径（当前无截图资产，设为空字符串触发降级）、降级 API 监控 JSON 示例、标题和描述
  - [x] 1.3 更新 `src/types/index.ts` 添加 DashboardPreviewConfig 类型导出
  - [x] 1.4 更新 `src/data/README.md` 添加新数据文件索引条目

- [x] Task 2: 创建 DashboardPreview 组件 (AC: #1, #2, #3, #5, #6, #7, #8, #9, #10)
  - [x] 2.1 创建 `src/components/Features/DashboardPreview.vue`
  - [x] 2.2 导入 `dashboardPreviewConfig` 数据和 `CodeShowcase` 组件
  - [x] 2.3 实现截图展示模式：`<figure>` 容器 + `card-sketchy` 样式 + `<img loading="lazy">` + `<figcaption>`
  - [x] 2.4 实现截图加载失败检测：`@error` 事件 → 切换到降级模式
  - [x] 2.5 实现截图缺失检测：当 `screenshotSrc` 为空字符串时直接使用降级模式
  - [x] 2.6 实现降级模式：渲染 CodeShowcase 组件，展示 API 监控数据 JSON 示例
  - [x] 2.7 CLS 防护：外层容器使用 `aspect-video` (16:9) 或固定 min-height placeholder
  - [x] 2.8 滚动揭示：外层容器 `reveal-fade-up` class
  - [x] 2.9 设计 token：`card-sketchy` 容器、cream/ink/ochre 配色

- [x] Task 3: 集成到 PlatformCapabilities 区段 (AC: #1, #7)
  - [x] 3.1 在 `PlatformCapabilities.vue` 的两列布局下方（CTA Bar 上方）添加 DashboardPreview 组件
  - [x] 3.2 全宽布局（`lg:col-span-12`），位于能力卡片+代码展示双栏和 CTABar 之间
  - [x] 3.3 确保现有 PlatformCapabilities 测试仍然通过

- [x] Task 4: 编写测试 (AC: #11)
  - [x] 4.1 创建 `src/data/__tests__/dashboardPreview.test.ts` 数据文件测试
  - [x] 4.2 创建 `src/components/Features/__tests__/DashboardPreview.test.ts` 组件测试
  - [x] 4.3 测试: 当 screenshotSrc 为空时渲染降级 CodeShowcase
  - [x] 4.4 测试: 当 screenshotSrc 存在时渲染 img 元素
  - [x] 4.5 测试: img 元素有 loading="lazy" 属性
  - [x] 4.6 测试: 容器有 aspect-ratio placeholder 防止 CLS
  - [x] 4.7 测试: figure 元素和 figcaption 存在
  - [x] 4.8 测试: 截图有描述性 alt 文本
  - [x] 4.9 测试: 降级模式传入正确 CodeShowcase props
  - [x] 4.10 测试: 数据文件导出正确字段且类型正确
  - [x] 4.11 测试: img @error 事件触发降级

## Dev Notes

### 架构约束

- **数据集中化** (ADR-006): 预览配置放 `src/data/dashboardPreview.ts`，组件只负责渲染和降级逻辑
- **零硬编码**: 截图路径、降级代码、标题文案全从数据文件导入
- **资产降级策略** (PRD §资产降级策略): Dashboard 截图不可用时用 CodeShowcase 代码块替代
- **CSS-first, JS-last** (Key Principle #2): 视觉效果用纯 CSS，降级逻辑用 Vue reactivity
- **零重型库** (ADR Principle #7): 不引入图片画廊库，原生 `<img>` + CSS
- **Scoped style**: `<style scoped>` 必须 `@reference "../../styles/main.css"`
- **组件 a11y** (ADR-012): `<figure>` + `<figcaption>` 语义化，img 有 alt，CodeShowcase 有 ariaLabel

### 当前资产状态

项目目前 **没有 Dashboard 截图资产**（`public/` 目录无图片文件）。因此：
- `screenshotSrc` 设为空字符串 `''`
- 组件启动即进入降级模式（CodeShowcase 代码块）
- 未来有截图后只需更新 `src/data/dashboardPreview.ts` 的路径即可启用截图模式

### 降级代码内容规格

API 监控仪表盘数据 JSON 示例（模拟 `/v1/dashboard/stats` 响应）：

```json
{
  "period": "2026-02-13",
  "total_requests": 12847,
  "avg_latency_ms": 245,
  "models": {
    "deepseek-chat": 5621,
    "gpt-4o": 3892,
    "claude-sonnet": 2104,
    "gemini-pro": 1230
  },
  "success_rate": 99.7,
  "cache_hit_rate": 34.2
}
```

### 布局方案

```
Platform Overview Section:
┌──────────────────────────────────────────────┐
│ AI Gateway Badge + 标题 + 副标题              │
├────────────────────┬─────────────────────────┤
│  6 卡片网格 (2x3)   │  CodeExampleShowcase    │
│  (lg:col-span-7)    │  (lg:col-span-5)        │
├────────────────────┴─────────────────────────┤
│ DashboardPreview (全宽)                       │
│  ┌──────────────────────────────────────┐    │
│  │ figure (card-sketchy)                 │    │
│  │  Screenshot OR CodeShowcase fallback  │    │
│  │  <figcaption> 描述文案 </figcaption>  │    │
│  └──────────────────────────────────────┘    │
├──────────────────────────────────────────────┤
│ CTA Bar                                       │
└──────────────────────────────────────────────┘
```

### 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/dashboardPreview.ts` | 新建 | DashboardPreviewConfig 接口 |
| `src/types/index.ts` | 修改 | 添加 DashboardPreviewConfig 导出 |
| `src/data/dashboardPreview.ts` | 新建 | 预览配置数据 |
| `src/data/__tests__/dashboardPreview.test.ts` | 新建 | 数据文件测试 |
| `src/data/README.md` | 修改 | 添加新数据文件索引 |
| `src/components/Features/DashboardPreview.vue` | 新建 | 仪表盘预览组件 |
| `src/components/Features/__tests__/DashboardPreview.test.ts` | 新建 | 组件测试 |
| `src/components/Features/PlatformCapabilities.vue` | 修改 | 集成 DashboardPreview |

### 组件接口

```typescript
// DashboardPreview.vue - no external props needed
// All data self-contained from src/data/dashboardPreview.ts
// Renders screenshot or CodeShowcase fallback based on asset availability
```

### 测试策略

- **数据文件测试**: 验证导出配置对象具有所有必要字段，类型正确
- **组件测试 (截图模式)**: 设置 screenshotSrc 有值时 → 验证 img 渲染、lazy loading、alt 文本
- **组件测试 (降级模式)**: screenshotSrc 为空 → 验证 CodeShowcase 渲染、props 正确传递
- **组件测试 (错误降级)**: 模拟 img @error → 验证切换到 CodeShowcase
- **组件测试 (CLS)**: 验证容器有 aspect-ratio 或 min-height
- 使用 `@vue/test-utils` 的 `mount`，mock CodeShowcase 以隔离测试

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.3] — AC 和 FR 映射
- [Source: _bmad-output/planning-artifacts/prd.md#S3 Platform Overview] — Dashboard 预览规格
- [Source: _bmad-output/planning-artifacts/prd.md#资产降级策略] — 截图降级方案
- [Source: src/components/TechDemo/CodeShowcase.vue] — 降级时复用的代码展示组件
- [Source: src/components/Features/PlatformCapabilities.vue] — 集成目标组件
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-006] — 数据集中化
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-012] — 组件 a11y 接口


## Dev Agent Record

### Completion Notes List

- Created DashboardPreviewConfig type interface in src/types/dashboardPreview.ts
- Created dashboardPreviewConfig data file with screenshot path (empty = fallback), fallback JSON monitoring data, title and caption
- Created DashboardPreview.vue component with screenshot/fallback dual mode, card-sketchy container, figure/figcaption semantics, lazy loading, CLS prevention via aspect-ratio, scroll reveal animation
- Integrated DashboardPreview into PlatformCapabilities.vue below the two-column grid layout and above CTABar
- Updated src/types/index.ts with DashboardPreviewConfig type re-export
- Updated src/data/README.md with dashboardPreview.ts entry and usage documentation
- Updated existing PlatformCapabilities tests to stub DashboardPreview, added integration test for DashboardPreview presence
- 29 new tests: 9 data tests + 20 component tests (fallback mode, screenshot mode, img error degradation, lazy loading, CLS, a11y, styling)
- Review fixes: replaced custom CSS with Fibonacci/phi design tokens (mt-fib-5, text-phi-xl, gap-fib-2, mb-fib-4), refactored tests to use buildMockComponent factory pattern instead of Object.defineProperty
- tsc --noEmit: zero errors; ESLint: zero errors/warnings; vite build: success; full test suite: 338 passed (29 new)

### File List

- src/types/dashboardPreview.ts (new) -- DashboardPreviewConfig interface
- src/types/index.ts (modified) -- Added DashboardPreviewConfig type re-export
- src/data/dashboardPreview.ts (new) -- Dashboard preview config with fallback JSON
- src/data/__tests__/dashboardPreview.test.ts (new) -- 9 data tests
- src/data/README.md (modified) -- Added dashboardPreview.ts entry
- src/components/Features/DashboardPreview.vue (new) -- Dashboard preview component
- src/components/Features/__tests__/DashboardPreview.test.ts (new) -- 18 component tests
- src/components/Features/PlatformCapabilities.vue (modified) -- Integrated DashboardPreview
- src/components/Features/__tests__/PlatformCapabilities.test.ts (modified) -- Stub DashboardPreview + integration test

### Change Log

- 2026-02-13: Story 5.3 implemented -- DashboardPreview component with screenshot/fallback dual mode, data-driven from centralized config, card-sketchy container, figure/figcaption semantics, lazy loading, CLS prevention. Currently in fallback mode (no screenshot asset). 27 new tests added. All quality gates pass.
