# Story 4.1: Chat 条件加载架构

Status: done

## Story

As a 开发者,
I want Chat 组件通过环境变量控制是否加载,
So that 在 Chat 后端未就绪时可以完全排除 Chat 功能，不影响发布。

## Acceptance Criteria

1. **环境变量控制**: `.env` 中 `VITE_CHAT_ENABLED=false` 时，Chat 相关组件不加载、不渲染。`VITE_CHAT_ENABLED=true` 时正常加载。
2. **defineAsyncComponent 懒加载**: Chat 组件通过 `defineAsyncComponent` 懒加载，Chat 代码打包到独立 chunk。
3. **条件渲染**: `App.vue` 中使用 `v-if="isChatEnabled"` 条件渲染 Chat 组件。
4. **Bundle 分块**: `vite.config.ts` 中 `manualChunks` 将 `components/Chat/*` 打包为 `chat` chunk。
5. **Feature flag composable**: 创建 `useChatFeature` composable 封装 Chat 可用性逻辑，供多个组件复用。
6. **Tree-shaking 验证**: `VITE_CHAT_ENABLED=false` 时，production build 中 Chat chunk 不出现在首屏加载中。

## Tasks / Subtasks

- [x] Task 1: 创建 Chat feature flag composable (AC: #1, #5)
  - [x] 1.1 创建 `src/composables/useChatFeature.ts`，导出 `isChatEnabled` computed
  - [x] 1.2 读取 `import.meta.env.VITE_CHAT_ENABLED`，支持 `'true'`/`'false'` 字符串比较
  - [x] 1.3 创建单元测试 `src/composables/__tests__/useChatFeature.test.ts`
- [x] Task 2: 改造 App.vue Chat 加载逻辑 (AC: #2, #3)
  - [x] 2.1 移除 AIChatSidebar 的静态 import
  - [x] 2.2 使用 `defineAsyncComponent` 动态导入 AIChatSidebar
  - [x] 2.3 使用 `v-if="isChatEnabled"` 包裹 Chat 组件
  - [x] 2.4 添加加载错误处理（loadingComponent / errorComponent 可选）
- [x] Task 3: 配置 Vite manual chunks (AC: #4)
  - [x] 3.1 在 `vite.config.ts` 的 `manualChunks` 中添加 chat chunk 配置
  - [x] 3.2 将 `src/components/Chat/` 下所有文件 + chat 相关 composables 分入 `chat` chunk
- [x] Task 4: 编写测试 (AC: all)
  - [x] 4.1 useChatFeature composable 单元测试（enabled/disabled 两种状态）
  - [x] 4.2 App.vue 条件渲染测试（mock env var）

## Dev Notes

### Architecture Constraints

- **Chat 是插件，不是核心** (Architecture Key Principle #1): 页面无 Chat = 100% 正常
- **defineAsyncComponent** (ADR-001): 首屏静态组件即时加载，折叠下方组件懒加载
- **Bundle 分块** (ADR-013): vendor / chat / app 三块分离
- **环境变量** (ADR-015): 所有环境变量使用 `VITE_` 前缀

### Existing Code to Modify

| File | Operation | Description |
|------|-----------|-------------|
| `src/App.vue` | Modify | 静态 import → defineAsyncComponent + v-if |
| `vite.config.ts` | Modify | 添加 chat manualChunks |
| `src/composables/useChatFeature.ts` | Create | Chat feature flag composable |
| `src/composables/__tests__/useChatFeature.test.ts` | Create | 单元测试 |
| `src/components/__tests__/App.test.ts` | Create | App.vue 条件渲染测试 |

### Testing Strategy

- useChatFeature: mock `import.meta.env.VITE_CHAT_ENABLED` 测试 true/false 两种场景
- App.vue: 使用 `@vue/test-utils` mount，验证 Chat 组件的条件渲染
- Vite build: 验证 chunk 输出包含独立的 chat chunk

## Definition of Done

- [x] Code compiles without TypeScript errors
- [x] All unit tests pass
- [x] ESLint passes with zero errors
- [x] useChatFeature composable correctly reads env var
- [x] App.vue conditionally loads Chat via defineAsyncComponent
- [x] vite.config.ts has chat manual chunk configuration
- [x] Chat disabled: AIChatSidebar not rendered in DOM
- [x] Chat enabled: AIChatSidebar renders and functions correctly
