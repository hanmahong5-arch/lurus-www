# Story 6.2: 产品子卡组件

Status: done

## Story

As a 访客,
I want 通过产品卡片了解每个产品,
So that 我可以找到感兴趣的产品并深入了解。

## Acceptance Criteria

1. **4 张产品子卡**: Products 区段显示 4 张产品卡: API Gateway (赭金), GuShen (鼠尾草绿), Webmail (产品色), Switch (赤陶橙)。每张卡有对应的产品色标识。
2. **卡片内容完整**: 每张卡片包含: 产品色 icon + 标题 + tagline + use case 描述 + 产品描述 + 特性标签 + CTA 按钮。
3. **CTA 按钮**: 每张卡片底部有"了解更多"CTA 按钮，点击在新标签页打开对应产品域名。链接包含 `rel="noopener noreferrer"`。Switch 产品 URL 为 `#` 时不添加 target/rel。
4. **Hover 效果**: 卡片 hover 时使用 `card-sketchy:hover` 效果（偏移 + 阴影加深），CTA 箭头右移。
5. **响应式布局**: 桌面端 2x2 网格 (`md:grid-cols-2`)，移动端单列堆叠 (`grid-cols-1`)。
6. **产品色边框**: 每张卡片使用对应的产品色边框 (`.card-api`, `.card-gushen`, `.card-webmail`, `.card-switch`)。
7. **统计数据**: 每张卡片右上角显示产品统计数据 (value + label)。
8. **特性标签**: 最多显示 2 个特性标签，超出部分显示 "+N" 计数。
9. **子卡组件提取**: 将子卡从 ProductShowcase.vue 的 inline template 提取为独立的 `ProductSubCard.vue` 组件，接收 Product 类型 props。
10. **滚动揭示**: 子卡网格使用 `reveal-stagger` CSS 类实现交错渐入动效。
11. **无障碍**: 外部链接使用语义化 `<a>` 标签；装饰性 SVG 使用 `aria-hidden="true"`；产品图标有隐含的产品名信息。
12. **测试**: ProductSubCard 组件测试覆盖: 渲染所有必要内容、外链属性、hover 类名、props 传递、aria 属性。

## Tasks / Subtasks

- [x] Task 1: 创建 ProductSubCard 组件 (AC: #1, #2, #3, #4, #6, #7, #8, #11)
  - [x] 1.1 创建 `src/components/Products/ProductSubCard.vue`
  - [x] 1.2 定义 props: `product: Product` (从 `src/types/products.ts` 导入)
  - [x] 1.3 实现卡片结构: icon 区 + 统计区 + 标题 + tagline + useCase + 描述 + 特性标签 + CTA
  - [x] 1.4 使用 `card-sketchy` 基础样式 + 动态 `card-${product.id}` 产品色边框
  - [x] 1.5 CTA 按钮: 外部 URL 使用 `target="_blank" rel="noopener noreferrer"`; `#` URL 不添加
  - [x] 1.6 统计数据: 右上角显示 `product.stats.value` + `product.stats.label`
  - [x] 1.7 特性标签: `product.features.slice(0, 2)` + 溢出 "+N" 计数
  - [x] 1.8 Icon: 使用 `productIconPaths` 映射 SVG path, `aria-hidden="true"`

- [x] Task 2: 重构 ProductShowcase 使用 ProductSubCard (AC: #5, #9, #10)
  - [x] 2.1 在 ProductShowcase.vue 中 import ProductSubCard
  - [x] 2.2 替换子卡 inline template 为 `<ProductSubCard :product="product" />`
  - [x] 2.3 保持 `reveal-stagger` 网格容器和 2x2 响应式布局
  - [x] 2.4 确保 `data-testid="product-card"` 在 ProductSubCard 根元素上

- [x] Task 3: 编写 ProductSubCard 组件测试 (AC: #12)
  - [x] 3.1 创建 `src/components/Products/__tests__/ProductSubCard.test.ts`
  - [x] 3.2 测试: 渲染产品名称、tagline、useCase、描述
  - [x] 3.3 测试: 外部链接包含 `rel="noopener noreferrer"` 和 `target="_blank"`
  - [x] 3.4 测试: `#` URL 不包含 target/rel 属性
  - [x] 3.5 测试: 显示最多 2 个特性标签 + 溢出计数
  - [x] 3.6 测试: 统计数据显示 value 和 label
  - [x] 3.7 测试: SVG icon 有 `aria-hidden="true"`
  - [x] 3.8 测试: 产品色边框 class 正确应用

- [x] Task 4: 更新现有测试 (AC: #12)
  - [x] 4.1 更新 `ProductShowcase.test.ts` 确保重构后测试仍通过
  - [x] 4.2 验证所有现有断言在组件提取后保持兼容

## Dev Notes

### 架构约束

- **组件提取**: 6-1 建立了子卡的 inline 模板，6-2 将其提取为独立组件以提高可维护性和可测试性
- **数据集中化** (ADR-006): 产品数据从 `src/data/products.ts` 导入，组件只负责渲染
- **零硬编码**: 产品名称、URL、useCase、图标路径全部通过 props 传入
- **设计系统 token**: cream/ink/ochre 色彩体系，禁止 Tailwind 默认调色板
- **CSS-first**: hover 动效用纯 CSS，`card-sketchy:hover` 已定义在 main.css
- **Scoped style**: `<style scoped>` 必须 `@reference "../../styles/main.css"`

### 现有子卡 HTML 结构（来自 ProductShowcase.vue）

当前子卡在 ProductShowcase.vue 中的 inline 模板已经包含完整的 UI 逻辑:
- Icon 区 (14x14 圆角 + SVG path)
- 统计区 (右上角 value + label)
- 标题 (phi-xl + hover 渐变色)
- Tagline + UseCase + Description
- 特性标签 (最多 2 + 溢出计数)
- CTA 按钮 (箭头 + hover 右移动效)

提取时保持现有结构不变，只改变组织方式。

### 与相邻 Story 的关系

- 6-1 (done): 建立了区段骨架 + 主卡 + 基础子卡 inline 模板
- **6-2 (本 story)**: 提取子卡为独立组件 + 完善组件测试
- 6-3 (backlog): 将为子卡添加产品截图/代码块展示区域 + 降级逻辑
- 6-4 (backlog): 添加统计数字区段

### 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/Products/ProductSubCard.vue` | 新建 | 独立子卡组件 |
| `src/components/Products/ProductShowcase.vue` | 修改 | 使用 ProductSubCard 替换 inline 模板 |
| `src/components/Products/__tests__/ProductSubCard.test.ts` | 新建 | 子卡组件测试 |
| `src/components/Products/__tests__/ProductShowcase.test.ts` | 修改 | 确保重构后兼容 |
