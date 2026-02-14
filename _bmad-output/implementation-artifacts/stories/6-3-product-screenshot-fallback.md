# Story 6.3: 产品截图与降级

Status: done

## Story

As a 访客,
I want 在产品卡中看到真实截图或适当的代码/内容降级,
So that 我可以预览产品界面建立信任。

## Acceptance Criteria

1. **产品展示区域**: 每张 ProductSubCard 在 icon/stats 行下方新增一个展示区域（截图或代码块或功能列表），位于标题上方。
2. **截图模式**: 当产品数据中 `screenshotSrc` 非空且图片加载成功时，显示截图图片。使用 `loading="lazy"` 懒加载，容器有固定宽高比防止 CLS。
3. **GuShen 降级**: GuShen 产品卡无截图时，显示策略代码片段（Python 风格），配合自然语言描述文案。
4. **API Gateway 展示**: API Gateway 产品卡始终显示 CodeShowcase curl 示例，描述"3 行代码接入 50+ AI 模型"。
5. **Webmail/Switch 降级**: 无截图时显示功能亮点列表（简洁的 icon + 文字列表形式）。
6. **图片加载失败**: 截图 `<img>` 加载出错时自动切换到对应的降级方案，不显示破碎图标。
7. **数据集中化 (ADR-006)**: 截图路径、降级代码、降级内容全部定义在 `src/data/products.ts` 中，组件只负责渲染。类型定义在 `src/types/products.ts`。
8. **无障碍**: 截图有描述性 alt 文本；CodeShowcase 有 ariaLabel；装饰性元素使用 `aria-hidden="true"`。
9. **设计系统**: 展示区使用 `card-sketchy` 内嵌样式，与现有卡片风格一致。使用 cream/ink/ochre token，不用 Tailwind 默认调色板。
10. **测试**: 组件测试覆盖：截图渲染、图片加载失败降级、CodeShowcase 降级渲染、功能列表降级渲染、lazy loading 属性、alt 文本。

## Tasks / Subtasks

- [x] Task 1: 扩展产品类型定义 (AC: #7)
  - [x] 1.1 在 `src/types/products.ts` 添加 `ProductShowcaseType` 联合类型 (`'screenshot' | 'code' | 'features'`)
  - [x] 1.2 在 `Product` 接口添加 `showcase` 可选字段，包含 `type`、`screenshotSrc`、`screenshotAlt`、`fallbackCode`、`fallbackLanguage`、`fallbackAriaLabel`、`fallbackFeatures`

- [x] Task 2: 更新产品数据 (AC: #3, #4, #5, #7)
  - [x] 2.1 为 API Gateway 添加 showcase 数据: type='code', 含 curl 示例
  - [x] 2.2 为 GuShen 添加 showcase 数据: type='screenshot' (screenshotSrc 为空触发降级), 含策略代码片段降级
  - [x] 2.3 为 Webmail 添加 showcase 数据: type='features', 含功能亮点列表
  - [x] 2.4 为 Switch 添加 showcase 数据: type='features', 含功能亮点列表
  - [x] 2.5 更新产品数据测试

- [x] Task 3: 创建 ProductShowcaseArea 组件 (AC: #1, #2, #3, #4, #5, #6, #8, #9)
  - [x] 3.1 创建 `src/components/Products/ProductShowcaseArea.vue`
  - [x] 3.2 实现截图模式: img + lazy loading + 宽高比容器 + 错误处理
  - [x] 3.3 实现代码模式: 使用 CodeShowcase 组件
  - [x] 3.4 实现功能列表模式: icon + 文字列表
  - [x] 3.5 实现图片加载失败降级逻辑

- [x] Task 4: 集成到 ProductSubCard (AC: #1)
  - [x] 4.1 在 ProductSubCard.vue 中 import 并使用 ProductShowcaseArea
  - [x] 4.2 展示区域放在 icon/stats 行下方、标题上方

- [x] Task 5: 编写测试 (AC: #10)
  - [x] 5.1 创建 `src/components/Products/__tests__/ProductShowcaseArea.test.ts`
  - [x] 5.2 测试: 截图模式渲染 img 标签
  - [x] 5.3 测试: 图片加载失败切换到降级
  - [x] 5.4 测试: 代码模式渲染 CodeShowcase
  - [x] 5.5 测试: 功能列表模式渲染列表项
  - [x] 5.6 测试: lazy loading 属性
  - [x] 5.7 测试: alt 文本/ariaLabel 正确传递
  - [x] 5.8 测试: 无 showcase 数据时不渲染展示区域
  - [x] 5.9 更新 ProductSubCard.test.ts 适配新结构

## Dev Notes

### Architecture

- **DashboardPreview 参考**: 复用 Story 5.3 建立的截图+降级模式 (ref/computed + @error handler)
- **数据集中化** (ADR-006): 所有展示内容在 `src/data/products.ts`，组件只渲染
- **零硬编码**: 代码片段、图片路径、功能列表全部通过 props 传入
- **CSS-first**: 使用现有 card-sketchy、cream/ink/ochre token

### 展示区域规格

| 产品 | type | 主模式 | 降级模式 |
|------|------|--------|----------|
| API Gateway | code | CodeShowcase curl 示例 | N/A (始终代码) |
| GuShen | screenshot | 策略编辑器截图 | Python 策略代码片段 |
| Webmail | features | 功能亮点列表 | N/A (始终列表) |
| Switch | features | 功能亮点列表 | N/A (始终列表) |

### 与相邻 Story 的关系

- 6-1 (done): 建立了区段骨架 + 主卡
- 6-2 (done): 提取了 ProductSubCard 独立组件
- **6-3 (本 story)**: 为子卡添加产品截图/代码块展示区域 + 降级逻辑
- 6-4 (backlog): 添加统计数字区段

### File List

| File | Operation | Description |
|------|-----------|-------------|
| `src/types/products.ts` | Modified | Added ProductShowcaseType, ProductShowcase interface, showcase field to Product |
| `src/data/products.ts` | Modified | Added showcase data for all 4 products |
| `src/data/products.test.ts` | Modified | Added 6 tests for showcase data validation |
| `src/components/Products/ProductShowcaseArea.vue` | Created | New showcase area component with 3 display modes + fallback |
| `src/components/Products/ProductSubCard.vue` | Modified | Integrated ProductShowcaseArea between icon row and title |
| `src/components/Products/__tests__/ProductShowcaseArea.test.ts` | Created | 12 tests for showcase area component |
| `src/components/Products/__tests__/ProductSubCard.test.ts` | Modified | Added 3 showcase integration tests |

## Dev Agent Record

### Session Log
- 2026-02-13: Story created and fully implemented in TDD cycle

### Change Log
- Types: Added `ProductShowcaseType` union type, `ProductShowcase` interface, optional `showcase` field to `Product`
- Data: Each product now has showcase config (API=code, GuShen=screenshot+fallback, Webmail/Switch=features)
- Component: `ProductShowcaseArea.vue` handles 3 display modes with automatic screenshot-to-code fallback
- Integration: `ProductSubCard.vue` renders showcase area between icon/stats and title
- Tests: 62 product-related tests pass (12 new showcase area + 3 new integration + 6 new data tests)

### Verification
```
bun run test -- --run
  37 test files, 441 passed, 4 skipped (pre-existing)

vue-tsc --noEmit
  0 new errors (pre-existing errors only in Download/PlatformIcon.vue, Features/CodeExampleShowcase.vue, Features/DashboardPreview.vue)
```
