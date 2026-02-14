# Story 5.5: API 降级状态

Status: done

## Story

As a 访客,
I want 在 API 不可达时仍能看到产品能力,
So that 我的浏览体验不会因后端问题而中断。

## Acceptance Criteria

1. **静态内容不受影响**: 当 api.lurus.cn 不可达时，所有静态内容（能力卡片、标题、Badge、CTA）正常显示。CodeExampleShowcase 的预录请求/响应示例（src/data/codeExamples.ts）正常展示。
2. **API 健康检测**: 创建 `useApiHealth` composable，通过轻量 HEAD 请求检测 `api.lurus.cn/v1/models`（免认证端点）的可用性。遵循 ADR-010 三态模式（loading → ready | unavailable）。超时 5s，最多 1 次重试。
3. **状态提示横幅**: 当 API 不可达时，PlatformCapabilities 区段内（CodeExampleShowcase 上方）显示 `ApiStatusBanner` 组件，显示"服务维护中，以下为示例数据"提示。
4. **中性视觉风格**: 状态提示使用中性色调（ink-500 文字 + cream-200 背景 + ink-200 边框），不使用错误红色或 panic 信息。使用信息图标而非警告/错误图标。
5. **就绪状态隐藏**: 当 API 可达时（ready 状态），不显示任何状态提示横幅。加载状态时也不显示（避免首屏闪烁）。
6. **预录响应数据**: 在 `src/data/codeExamples.ts` 中确认现有预录数据格式与实际 API 响应一致（已满足，无需修改）。
7. **数据集中化**: 状态提示文案和 API 健康检测配置（URL、超时）集中到 `src/data/apiHealth.ts`，不在组件内硬编码。
8. **无障碍**: 状态提示使用 `role="status"` + `aria-live="polite"` 让屏幕阅读器感知状态变化。信息图标使用 `aria-hidden="true"`。
9. **prefers-reduced-motion**: Banner 出现/消失的过渡动画尊重 reduced motion 偏好。
10. **测试**: composable 测试覆盖三态转换、超时、重试；组件测试覆盖 banner 显示/隐藏、文案、a11y 属性；集成测试覆盖 PlatformCapabilities 中的 banner 渲染。

## Tasks / Subtasks

- [x] Task 1: 创建数据文件和类型 (AC: #7)
  - [x] 1.1 创建 `src/types/apiHealth.ts`，定义 `ApiHealthConfig` 接口（`healthEndpoint`, `timeoutMs`, `maxRetries`）和 `ApiHealthStatus` 类型（`'loading' | 'ready' | 'unavailable'`）
  - [x] 1.2 创建 `src/data/apiHealth.ts`，导出健康检测配置和状态提示文案常量
  - [x] 1.3 更新 `src/types/index.ts` 添加 ApiHealthConfig 和 ApiHealthStatus 类型导出
  - [x] 1.4 更新 `src/data/README.md` 添加 apiHealth.ts 条目

- [x] Task 2: 创建 useApiHealth composable (AC: #2, #5)
  - [x] 2.1 编写 `src/composables/__tests__/useApiHealth.test.ts` 测试（RED）
    - 测试初始状态为 loading
    - 测试 API 可达时状态变为 ready
    - 测试 API 不可达时状态变为 unavailable
    - 测试超时后状态变为 unavailable
    - 测试重试机制（1 次重试）
  - [x] 2.2 实现 `src/composables/useApiHealth.ts`（GREEN）
    - HEAD 请求 `https://api.lurus.cn/v1/models`
    - 5s 超时 + AbortController
    - 最多 1 次重试
    - 导出 `status` ref（ApiHealthStatus 类型）
    - 页面加载时自动执行一次检测

- [x] Task 3: 创建 ApiStatusBanner 组件 (AC: #3, #4, #8, #9)
  - [x] 3.1 编写 `src/components/Features/__tests__/ApiStatusBanner.test.ts` 测试（RED）
    - 测试 unavailable 状态时渲染 banner
    - 测试 banner 包含正确的提示文案
    - 测试使用中性色调（无红色样式）
    - 测试 role="status" 和 aria-live="polite"
    - 测试信息图标有 aria-hidden="true"
    - 测试 ready 状态时不渲染 banner
    - 测试 loading 状态时不渲染 banner
  - [x] 3.2 实现 `src/components/Features/ApiStatusBanner.vue`（GREEN）
    - Props: `status: ApiHealthStatus`
    - 仅在 `unavailable` 状态时渲染
    - 中性色调设计（cream-200 背景、ink-200 边框、ink-500 文字）
    - 信息图标 + 提示文案
    - CSS 过渡动画 + reduced motion 支持

- [x] Task 4: 集成到 PlatformCapabilities (AC: #1, #3, #5)
  - [x] 4.1 修改 `src/components/Features/PlatformCapabilities.vue`
    - 导入 useApiHealth 和 ApiStatusBanner
    - 调用 useApiHealth 获取 status
    - 在 CodeExampleShowcase 上方渲染 ApiStatusBanner
  - [x] 4.2 更新 `src/components/Features/__tests__/PlatformCapabilities.test.ts`
    - 添加 ApiStatusBanner stub
    - 测试组件包含 ApiStatusBanner

- [x] Task 5: 质量验证 (AC: all)
  - [x] 5.1 `npx tsc --noEmit` 零错误
  - [x] 5.2 `bun run lint` 零错误零警告
  - [x] 5.3 `bun run test:unit` 全部通过
  - [x] 5.4 `bun run build` 构建成功

## Dev Notes

### Architecture Constraints

- **三态降级模式** (ADR-010): `loading → ready | unavailable`，每个组件自行渲染 unavailable 态
- **数据集中化** (ADR-006): 配置和文案放 `src/data/`
- **CSS-first** (Architecture Key Principle #2): 动画用 CSS transition
- **a11y 是架构** (ADR-012): 状态提示使用 ARIA live region
- **零重型库** (Architecture Key Principle #7): 健康检测用原生 fetch
- **bundle 分块** (ADR-013): useApiHealth 不在 chat chunk 中

### Key Design Decisions

1. **HEAD 请求 + /v1/models 端点**: 选择免认证端点，HEAD 请求最轻量，仅检测服务可达性
2. **仅检测一次**: 页面加载时检测一次，不做轮询（着陆页场景，用户停留时间短）
3. **loading 态不显示 banner**: 避免首屏闪烁，只在确认不可达时才显示
4. **banner 位置在 CodeExampleShowcase 上方**: 贴近代码示例区域，语义关联紧密
5. **现有 CodeExampleShowcase 数据本身就是预录数据**: 无需额外处理，它们始终是静态的

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| src/types/apiHealth.ts | Create | ApiHealthConfig 接口 + ApiHealthStatus 类型 |
| src/types/index.ts | Modify | 添加类型导出 |
| src/data/apiHealth.ts | Create | 健康检测配置 + 提示文案常量 |
| src/data/README.md | Modify | 添加 apiHealth.ts 条目 |
| src/composables/useApiHealth.ts | Create | API 健康检测 composable |
| src/composables/__tests__/useApiHealth.test.ts | Create | Composable 测试 |
| src/components/Features/ApiStatusBanner.vue | Create | 状态提示 banner 组件 |
| src/components/Features/__tests__/ApiStatusBanner.test.ts | Create | Banner 组件测试 |
| src/components/Features/PlatformCapabilities.vue | Modify | 集成 banner |
| src/components/Features/__tests__/PlatformCapabilities.test.ts | Modify | 添加集成测试 |

### FRs Covered

- FR17: 系统在 API 不可达时展示降级状态（预录响应 + 状态提示）

### NFRs Covered

- NFR-I1: api.lurus.cn 不可达时，静态内容正常展示

### ADRs Referenced

- ADR-006: 数据集中化 (src/data/)
- ADR-010: 外部 API 统一三态降级模式 (loading → ready | unavailable)
- ADR-012: 组件 a11y 接口规范

## Definition of Done

- [x] API 可达时：无任何状态提示，所有静态内容正常
- [x] API 不可达时：显示中性"服务维护中"提示 + 预录响应代码示例正常
- [x] 提示使用中性色调，无红色/panic 信息
- [x] useApiHealth composable 遵循三态模式，5s 超时 + 1 次重试
- [x] 所有配置和文案集中在 src/data/apiHealth.ts
- [x] role="status" + aria-live="polite" 无障碍支持
- [x] prefers-reduced-motion 尊重
- [x] composable 测试 + 组件测试 + 集成测试全部通过
- [x] tsc --noEmit + ESLint + build 零错误

## Dev Agent Record

### Completion Notes List

- Created ApiHealthStatus type and ApiHealthConfig/ApiStatusBannerConfig interfaces in src/types/apiHealth.ts
- Created apiHealth.ts data file with health check config (5s timeout, 1 retry, /v1/models endpoint) and banner text constants
- Created useApiHealth composable with HEAD request health check, AbortController timeout, retry mechanism, module-level singleton state
- Created ApiStatusBanner.vue component with neutral styling (cream-200/ink-200/ink-500), info icon, role="status" + aria-live="polite"
- Integrated ApiStatusBanner into PlatformCapabilities.vue above CodeExampleShowcase
- Updated src/types/index.ts with ApiHealthStatus/ApiHealthConfig/ApiStatusBannerConfig re-exports
- Updated src/data/README.md with apiHealth.ts entry
- 21 new tests: 10 composable tests (initial state, ready/unavailable transitions, timeout, retry, fetch params) + 11 component tests (rendering, hidden states, neutral styling, a11y)
- tsc --noEmit: zero errors; ESLint: zero errors/warnings; vite build: success; full test suite: 383 passed (21 new)

### File List

- src/types/apiHealth.ts (new) -- ApiHealthStatus type + ApiHealthConfig/ApiStatusBannerConfig interfaces
- src/types/index.ts (modified) -- Added API health type re-exports
- src/data/apiHealth.ts (new) -- Health check config + status banner text constants
- src/data/README.md (modified) -- Added apiHealth.ts entry
- src/composables/useApiHealth.ts (new) -- API health check composable (HEAD request + timeout + retry)
- src/composables/__tests__/useApiHealth.test.ts (new) -- 10 composable tests
- src/components/Features/ApiStatusBanner.vue (new) -- Neutral status banner component
- src/components/Features/__tests__/ApiStatusBanner.test.ts (new) -- 11 component tests
- src/components/Features/PlatformCapabilities.vue (modified) -- Integrated ApiStatusBanner
- src/components/Features/__tests__/PlatformCapabilities.test.ts (modified) -- Added mock + stub + integration test

### Change Log

- 2026-02-13: Story 5.5 implemented -- API degradation status with useApiHealth composable (HEAD /v1/models, 5s timeout, 1 retry), ApiStatusBanner (neutral cream/ink styling, role="status" + aria-live), integrated into PlatformCapabilities. 21 new tests. All quality gates pass.
