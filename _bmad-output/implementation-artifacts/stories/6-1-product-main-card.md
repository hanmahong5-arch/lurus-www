# Story 6.1: 产品主卡与区段重构

Status: done

## Story

As a 访客,
I want 看到产品生态的全景概览,
So that 我可以理解 Lurus 的全栈自建规模。

## Acceptance Criteria

1. **Badge 标签**: Products 区段顶部显示 "Product Ecosystem" Badge 标签，替换现有 "产品矩阵" 标签。
2. **主卡全宽**: 区段顶部显示全宽主卡，展示核心文案"全栈自建，从 AI 网关到量化交易到企业邮件"，传达平台全景。
3. **主卡包含平台架构插图（可选）**: 主卡可包含手绘风格的平台架构示意 SVG。如无插图可用，展示产品列表 + 品牌标语即可。
4. **主卡样式**: 使用 `card-sketchy` 容器，cream/ink/ochre 设计 token。标题使用 `phi-2xl`，描述文字使用 `phi-lg`。
5. **子卡网格保留**: 主卡下方保留 2x2 产品子卡网格（桌面端），移动端单列堆叠。子卡沿用现有产品数据，但布局从 4 列调整为 2x2。
6. **区段标题更新**: 区段标题改为 "探索产品生态"（或等效），副标题体现全栈自建差异化。
7. **Webmail 产品**: 产品数据中新增 Webmail 邮件产品（替换 Docs 和 Deaigc），子卡显示 4 个核心产品: API Gateway、GuShen、Webmail、Switch。
8. **产品数据更新**: 更新 `src/data/products.ts`，每个产品添加 `useCase` 一句话描述字段。更新类型定义。
9. **无障碍**: 区段使用 `<section id="products" aria-label="产品生态">`。装饰性元素使用 `aria-hidden="true"`。
10. **滚动揭示**: 使用 `reveal-stagger` / `reveal-fade-up` CSS 类。
11. **测试**: 组件测试覆盖主卡渲染、Badge 文案、子卡数量（4 张）、aria-label 属性、产品数据完整性。

## Tasks / Subtasks

- [x] Task 1: 更新产品数据和类型 (AC: #7, #8)
  - [x] 1.1 更新 `src/types/products.ts`，添加 `useCase` 字段到 `Product` 接口
  - [x] 1.2 更新 `src/data/products.ts`: 移除 Docs 和 Deaigc，新增 Webmail 产品数据
  - [x] 1.3 为每个产品添加 `useCase` 一句话描述（API: "3 行代码接入 50+ AI 模型"，GuShen: "自然语言描述 → AI 生成量化策略"，Webmail: "自建企业邮件，中国送达率优化"，Switch: "Go + Web 跨平台桌面应用"）
  - [x] 1.4 添加 Webmail 的 SVG icon path 到 `productIconPaths`
  - [x] 1.5 更新产品数据测试 `src/data/products.test.ts`

- [x] Task 2: 重构 ProductShowcase 组件 (AC: #1, #2, #3, #4, #5, #6, #9, #10)
  - [x] 2.1 替换 Badge 文案为 "Product Ecosystem"
  - [x] 2.2 更新区段标题和副标题
  - [x] 2.3 创建主卡区域: 全宽 `card-sketchy` 容器，展示全栈自建文案
  - [x] 2.4 主卡包含手绘风格平台架构 SVG（展示 API → 各产品的连接关系）
  - [x] 2.5 子卡网格改为 `grid-cols-1 md:grid-cols-2` (2x2 布局)
  - [x] 2.6 移除 featured product 独立展示逻辑（所有产品统一在子卡网格）
  - [x] 2.7 子卡内添加 `useCase` 描述展示
  - [x] 2.8 确保 `reveal-stagger` 和 `reveal-fade-up` 动效
  - [x] 2.9 语义化: `<section id="products" aria-label="产品生态">`

- [x] Task 3: 编写组件测试 (AC: #11)
  - [x] 3.1 创建/更新 `src/components/Products/__tests__/ProductShowcase.test.ts`
  - [x] 3.2 测试: 主卡渲染且包含全栈自建文案
  - [x] 3.3 测试: "Product Ecosystem" Badge 存在
  - [x] 3.4 测试: 显示 4 张产品子卡
  - [x] 3.5 测试: section 具有 id="products" 和 aria-label
  - [x] 3.6 测试: 每张子卡包含产品名、描述、useCase
  - [x] 3.7 测试: 外部链接包含 rel="noopener noreferrer"
  - [x] 3.8 测试: 产品数据文件导出正确数量且类型完整

- [x] Task 4: 更新数据文件索引 (AC: #8)
  - [x] 4.1 更新 `src/data/README.md` 反映产品数据变更

## Dev Notes

### 架构约束

- **数据集中化** (ADR-006): 产品文案放 `src/data/products.ts`，组件只负责渲染
- **零硬编码**: 产品名称、URL、useCase、图标路径全部从数据文件导入
- **设计系统 token**: cream/ink/ochre 色彩体系，禁止 Tailwind 默认调色板
- **CSS-first** (Key Principle #2): hover 动效用纯 CSS `hover-breathe`
- **Scoped style**: `<style scoped>` 必须 `@reference "../../styles/main.css"`

### 产品数据规格（4 张子卡）

| ID | 名称 | 色标 | useCase |
|----|------|------|---------|
| api | Lurus API | 赭金 `product-api` | 3 行代码接入 50+ AI 模型 |
| gushen | GuShen | 鼠尾草绿 `product-gushen` | 自然语言描述 → AI 生成量化策略 |
| webmail | Webmail | 产品色 `product-deaigc` (复用) | 自建企业邮件，中国送达率优化 |
| switch | Switch | 赤陶橙 `product-switch` | Go + Web 跨平台桌面应用 |

### 主卡设计

主卡横跨全宽，作为产品生态的概览入口:
- 左侧: 标题"全栈自建" + 副标题描述 + 4 个产品色点标签
- 右侧: 简约的平台架构 SVG（Lurus 核心 → 4 个产品节点）
- 整体传达"一个团队，全栈自建"的差异化信息

### 与 Story 6-2/6-3 的关系

- 6-1 建立区段骨架 + 主卡 + 基础子卡结构
- 6-2 增强子卡组件（产品截图/代码块 + CTA 按钮）
- 6-3 处理截图加载和降级逻辑

### 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/products.ts` | 修改 | 添加 useCase 字段 |
| `src/data/products.ts` | 修改 | 更新产品列表，新增 Webmail，添加 useCase |
| `src/data/products.test.ts` | 修改 | 更新测试适配新数据结构 |
| `src/components/Products/ProductShowcase.vue` | 重构 | 主卡 + 2x2 子卡 + Badge 更新 |
| `src/components/Products/__tests__/ProductShowcase.test.ts` | 新建 | 组件测试 |
| `src/data/README.md` | 修改 | 更新索引 |
