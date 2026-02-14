# Story 5.2: 代码示例展示

Status: done

## Story

As a 开发者访客,
I want 在 Platform Overview 区段看到完整的 curl 请求和 JSON 响应示例,
So that 我可以了解 API 的使用方式和返回格式，建立技术信任。

## Acceptance Criteria

1. **代码展示区集成**: Platform Overview 区段（PlatformCapabilities 组件内或紧邻其后）包含 CodeExampleShowcase 组件，展示完整的 API 调用示例。
2. **请求示例**: 显示一个完整的 curl 请求，展示典型的 chat completion API 调用（含 Authorization header、Content-Type、JSON body）。
3. **响应示例**: 显示对应的 JSON 响应示例，展示 chat completion 返回格式（含 model、choices、usage 字段）。
4. **CSS-only 语法高亮**: 复用现有 `CodeShowcase` 组件进行代码渲染。增强 tokenizer 支持 JSON 语法高亮（key、string value、number、boolean、null）。
5. **需 API Key 标注**: 请求示例的 CodeShowcase 启用 `showAuthTag` prop，显示"需 API Key"标注 (FR18)。
6. **数据集中化**: curl 请求和 JSON 响应内容从 `src/data/codeExamples.ts` 导入，不在组件内硬编码。数据文件有对应 TypeScript 类型定义。
7. **Tab 切换**: 提供 Request / Response 两个 tab 切换（默认显示 Request）。Tab 切换无页面跳转，纯前端切换。
8. **响应式布局**: 桌面端代码展示区与能力卡片网格并排（左卡片右代码），平板及以下全宽堆叠（卡片在上、代码在下）。
9. **滚动揭示**: 代码展示区使用 `reveal-fade-up` CSS 类配合 `useScrollReveal`。
10. **无障碍**: Tab 使用 `role="tablist"` / `role="tab"` / `role="tabpanel"` + `aria-selected` + `aria-controls` + 键盘导航（左右箭头切换 tab）。CodeShowcase 的 `ariaLabel` 正确描述内容。
11. **设计 token**: 使用 cream/ink/ochre 设计 token，禁止 Tailwind 默认调色板。Tab 激活态使用 ochre 色。
12. **测试**: 组件测试覆盖渲染、tab 切换、键盘导航、a11y 属性、数据文件验证。

## Tasks / Subtasks

- [x] Task 1: 创建数据文件和类型 (AC: #6)
  - [x] 1.1 创建 `src/types/codeExample.ts`，定义 `CodeExample` 接口 (`id`, `label`, `language`, `code`, `showAuthTag`, `ariaLabel`)
  - [x] 1.2 创建 `src/data/codeExamples.ts`，导出 `codeExamples` 数组：request (curl chat completion) + response (JSON)
  - [x] 1.3 更新 `src/types/index.ts` 添加 CodeExample 类型导出
  - [x] 1.4 更新 `src/data/README.md` 添加新数据文件索引条目

- [x] Task 2: 增强 CodeShowcase tokenizer 支持 JSON (AC: #4)
  - [x] 2.1 在 CodeShowcase.vue 的 `tokenize()` 函数中添加 JSON 语言支持
  - [x] 2.2 JSON token 类型: `key`（对象键名）、`string`（字符串值）、`number`（数字）、`boolean`（true/false）、`null`
  - [x] 2.3 添加对应 CSS token 类: `.token-key`, `.token-number`, `.token-boolean`, `.token-null`
  - [x] 2.4 补充 CodeShowcase 测试：JSON tokenize 测试用例

- [x] Task 3: 创建 CodeExampleShowcase 组件 (AC: #1, #7, #8, #9, #10, #11)
  - [x] 3.1 创建 `src/components/Features/CodeExampleShowcase.vue`
  - [x] 3.2 导入 `codeExamples` 数据和 `CodeShowcase` 组件
  - [x] 3.3 实现 Tab 切换 UI: `role="tablist"` 容器 + `role="tab"` 按钮 + `role="tabpanel"` 内容区
  - [x] 3.4 Tab 键盘导航: 左右箭头键切换 tab，Home/End 跳转首尾 tab
  - [x] 3.5 Tab 激活态样式: ochre 底边 + 文字高亮
  - [x] 3.6 滚动揭示: 外层容器 `reveal-fade-up` class
  - [x] 3.7 设计: 使用 `card-sketchy` 或 ink-900 背景配合代码深色主题

- [x] Task 4: 修改 PlatformCapabilities 组件布局 (AC: #8)
  - [x] 4.1 重构 PlatformCapabilities.vue 布局：桌面端分左右两栏（左 2/3 卡片网格，右 1/3 代码展示）
  - [x] 4.2 代码展示区使用 `<slot name="code">` 或直接内嵌 CodeExampleShowcase
  - [x] 4.3 平板及以下：全宽堆叠，卡片网格在上，代码展示在下
  - [x] 4.4 确保现有 PlatformCapabilities 测试仍然通过

- [x] Task 5: 集成到 Home.vue (AC: #1)
  - [x] 5.1 确认 CodeExampleShowcase 在 PlatformCapabilities 区段中正确渲染
  - [x] 5.2 验证页面布局和区段顺序不变

- [x] Task 6: 编写测试 (AC: #12)
  - [x] 6.1 创建 `src/data/__tests__/codeExamples.test.ts` 数据文件测试
  - [x] 6.2 创建 `src/components/Features/__tests__/CodeExampleShowcase.test.ts` 组件测试
  - [x] 6.3 测试: 渲染 Request 和 Response tab
  - [x] 6.4 测试: 默认显示 Request tab
  - [x] 6.5 测试: 点击切换 tab
  - [x] 6.6 测试: 键盘左右箭头切换 tab
  - [x] 6.7 测试: tab a11y 属性 (role, aria-selected, aria-controls)
  - [x] 6.8 测试: CodeShowcase 传入正确的 props (code, language, showAuthTag, ariaLabel)
  - [x] 6.9 测试: 数据文件导出正确数量条目且类型正确
  - [x] 6.10 补充 CodeShowcase JSON tokenizer 测试

## Dev Notes

### 架构约束

- **数据集中化** (ADR-006): 代码示例内容放 `src/data/codeExamples.ts`，组件只负责渲染和交互
- **零硬编码**: 代码示例、tab 标签全从数据文件导入
- **CSS-first, JS-last** (Key Principle #2): Tab 切换用 Vue reactivity，但视觉效果用纯 CSS
- **零重型库** (ADR Principle #7): 不引入 Prism.js 等语法高亮库；CSS-only token 着色
- **Scoped style**: `<style scoped>` 必须 `@reference "../../styles/main.css"`
- **组件 a11y** (ADR-012): Tab 使用 WAI-ARIA Tabs pattern

### 代码示例内容规格

**Request (curl chat completion):**
```bash
curl https://api.lurus.cn/v1/chat/completions \
  -H "Authorization: Bearer $LURUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

**Response (JSON):**
```json
{
  "id": "chatcmpl-abc123",
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 9,
    "total_tokens": 17
  }
}
```

### JSON Tokenizer 设计

CodeShowcase 当前只支持 bash tokenizer。需要扩展 `tokenize()` 以支持 JSON:

| Token Type | 匹配规则 | CSS 颜色 |
|------------|---------|----------|
| `key` | 对象键 `"xxx":` | ochre |
| `string` | 字符串值 `"xxx"` (非 key) | #86EFAC (green) |
| `number` | 数字字面量 | #7DD3FC (blue) |
| `boolean` | `true` / `false` | #F9A8D4 (pink) |
| `null` | `null` | var(--color-ink-300) |

### 布局方案

```
Desktop (lg+):
┌──────────────────────────────────────────────┐
│ AI Gateway Badge + 标题 + 副标题              │
├────────────────────┬─────────────────────────┤
│  6 卡片网格 (2x3)   │  CodeExampleShowcase    │
│  (lg:col-span-7)    │  [Request] [Response]   │
│                     │  ┌──────────────────┐   │
│                     │  │ curl ...          │   │
│                     │  │                   │   │
│                     │  └──────────────────┘   │
│  (lg:col-span-5)    │                         │
├────────────────────┴─────────────────────────┤
│ CTA Bar                                       │
└──────────────────────────────────────────────┘

Tablet/Mobile:
┌──────────────────────┐
│ Badge + 标题          │
├──────────────────────┤
│ 6 卡片网格 (堆叠)     │
├──────────────────────┤
│ CodeExampleShowcase   │
├──────────────────────┤
│ CTA Bar               │
└──────────────────────┘
```

### 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/codeExample.ts` | 新建 | CodeExample 接口 |
| `src/types/index.ts` | 修改 | 添加 CodeExample 导出 |
| `src/data/codeExamples.ts` | 新建 | Request/Response 代码示例数据 |
| `src/data/__tests__/codeExamples.test.ts` | 新建 | 数据文件测试 |
| `src/data/README.md` | 修改 | 添加新数据文件索引 |
| `src/components/TechDemo/CodeShowcase.vue` | 修改 | 增强 tokenizer 支持 JSON |
| `src/components/TechDemo/__tests__/CodeShowcase.test.ts` | 修改 | 补充 JSON tokenizer 测试 |
| `src/components/Features/CodeExampleShowcase.vue` | 新建 | Tab 切换代码展示组件 |
| `src/components/Features/__tests__/CodeExampleShowcase.test.ts` | 新建 | 组件测试 |
| `src/components/Features/PlatformCapabilities.vue` | 修改 | 调整布局，嵌入代码展示 |

### 测试策略

- **数据文件测试**: 验证导出 2 个条目（request + response），每个条目具有所有字段
- **CodeShowcase JSON 测试**: 验证 JSON 内容被正确 tokenize（key vs string value vs number）
- **组件测试**: mount CodeExampleShowcase → 验证 tab 渲染、切换、键盘导航、a11y 属性
- 使用 `@vue/test-utils` 的 `mount`，mock CodeShowcase 以隔离测试

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.2] — AC 和 FR 映射
- [Source: _bmad-output/planning-artifacts/prd.md#S3 Platform Overview] — 代码高亮规格
- [Source: src/components/TechDemo/CodeShowcase.vue] — 现有代码展示组件
- [Source: src/data/products.ts#curlExample] — 现有 curl 示例参考
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-006] — 数据集中化
- [Source: _bmad-output/planning-artifacts/architecture.md#First Principles] — CSS-only 语法高亮


## Dev Agent Record

### Completion Notes List

- Created  type interface in - Created  data file with 2 entries (request curl + response JSON) in - Enhanced  tokenizer: added  and  with CSS-only syntax highlighting for JSON (key/string/number/boolean/null tokens)
- Created  component with WAI-ARIA Tabs pattern (Request/Response tabs), keyboard navigation (ArrowLeft/Right, Home/End), ochre active state
- Restructured  to two-column layout: left 7/12 capability grid + right 5/12 code showcase on desktop, stacked on mobile
- Updated  with CodeExample type export
- Updated  with codeExamples.ts entry
- All decorative elements properly marked, section has proper ARIA attributes
- 31 new tests: 7 data tests + 4 JSON tokenizer tests + 20 component tests (CodeExampleShowcase tabs, keyboard nav, a11y)
- tsc --noEmit: zero errors; ESLint: zero errors/warnings; vite build: success; full test suite: 308 passed

### File List

-  (new) -- CodeExample interface
-  (modified) -- Added CodeExample type re-export
-  (new) -- Request/Response code examples
-  (new) -- 7 data tests
-  (modified) -- Added codeExamples.ts index entry
-  (modified) -- Added JSON tokenizer
-  (modified) -- Added 4 JSON tokenizer tests + unsupported language test
-  (new) -- Tab-based code showcase component
-  (new) -- 20 component tests
-  (modified) -- Two-column layout with code showcase
-  (modified) -- Updated for new layout

### Change Log

- 2026-02-13: Story 5.2 implemented -- CodeExampleShowcase with Request/Response tabs, JSON syntax highlighting, WAI-ARIA keyboard navigation, two-column layout in Platform Overview section. 31 new tests. All quality gates pass.
