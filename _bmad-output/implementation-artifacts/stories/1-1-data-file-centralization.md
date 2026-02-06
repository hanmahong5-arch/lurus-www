# Story 1.1: 数据文件集中化

Status: done

## Story

As a 管理员,
I want 所有网站内容数据集中存放在 src/data/ 目录,
so that 我可以通过编辑单一位置的文件来更新网站内容，无需搜索散落在组件中的硬编码数据。

## Acceptance Criteria

1. **AC1**: src/data/ 目录包含以下数据文件:
   - navItems.ts (导航菜单项)
   - products.ts (产品列表)
   - stats.ts (统计数字)
   - externalRoutes.ts (外部重定向映射)
   - chatModels.ts (Chat 模型选项)
   - portalLinks.ts (已存在，保持不变)

2. **AC2**: 所有组件通过 import 使用这些数据文件，不再有内联硬编码

3. **AC3**: main.ts 中的重定向逻辑使用 externalRoutes.ts

4. **AC4**: useAIChat 中的模型列表使用 chatModels.ts

5. **AC5**: src/data/README.md 索引文件存在，列出所有数据文件及其用途

## Tasks / Subtasks

- [x] Task 1: 创建 navItems.ts (AC: #1)
  - [x] 从现有组件提取导航数据
  - [x] 定义 NavItem 接口结构
  - [x] 导出 navItems 常量

- [x] Task 2: 创建 products.ts (AC: #1)
  - [x] 定义产品数据结构 (name, description, url, color, icon)
  - [x] 包含 5 个产品: API Gateway, GuShen, Switch, Docs, Deaigc

- [x] Task 3: 创建 stats.ts (AC: #1)
  - [x] 提取现有统计数字
  - [x] 定义 Stat 接口 (value, label, color)

- [x] Task 4: 创建 externalRoutes.ts (AC: #1, #3)
  - [x] 定义外部重定向映射
  - [x] 更新 main.ts 使用此文件

- [x] Task 5: 创建 chatModels.ts (AC: #1, #4)
  - [x] 定义 AI 模型列表
  - [x] 更新 useAIChat.ts 使用此文件

- [x] Task 6: 更新组件导入 (AC: #2)
  - [x] 更新 Navbar 组件使用 navItems
  - [x] 更新产品相关组件使用 products
  - [x] 更新 Home.vue 使用 stats 和 trustBadges

- [x] Task 7: 创建 README.md 索引 (AC: #5)
  - [x] 列出所有数据文件
  - [x] 说明每个文件用途和修改方法

## Dev Notes

### 项目结构

```
src/
├── data/
│   ├── README.md          # 新建 - 数据目录索引
│   ├── navItems.ts        # 新建 - 导航菜单数据
│   ├── products.ts        # 新建 - 产品列表数据
│   ├── stats.ts           # 新建 - 统计数字数据
│   ├── externalRoutes.ts  # 新建 - 外部重定向映射
│   ├── chatModels.ts      # 新建 - Chat 模型选项
│   └── portalLinks.ts     # 已存在 - 门户链接
```

### 技术要求

- **TypeScript**: 使用 `as const satisfies readonly Type[]` 模式确保类型安全
- **导出模式**: 使用命名导出，便于 tree-shaking
- **ADR-006/007**: 遵循数据集中化架构决策

### 数据格式示例

```typescript
// navItems.ts
export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export const navItems = [
  { label: 'Products', children: [...] },
  { label: 'Resources', children: [...] },
] as const satisfies readonly NavItem[]
```

### 现有代码参考

- 检查 `src/components/` 中的硬编码数据
- 检查 `main.ts` 中的重定向逻辑
- 检查 `src/composables/useAIChat.ts` 中的模型列表
- 参考现有 `src/data/portalLinks.ts` 格式

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-006]
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-007]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.1]

## Dev Agent Record

### Debug Log References

- Build verified: `npm run build` - success (1.51s)

### Completion Notes List

- Created 6 data files in src/data/
- Updated 4 components to use centralized data
- All TypeScript imports working correctly
- Build passes with no errors

### File List

**Created:**
- src/data/navItems.ts
- src/data/products.ts
- src/data/stats.ts
- src/data/externalRoutes.ts
- src/data/chatModels.ts
- src/data/README.md

**Modified:**
- src/components/Layout/Navbar.vue (import navItems, ctaLinks)
- src/components/Products/ProductShowcase.vue (import products, productIconPaths, curlExample)
- src/composables/useAIChat.ts (import chatModels, quickPrompts, chatConfig)
- src/main.ts (import getExternalRedirect)
- src/pages/Home.vue (import stats, trustBadges, trustBadgeIconPaths)
- src/types/common.ts (TrustBadge 添加 iconColor 字段)
- src/data/stats.ts (trustBadges 添加 iconColor, 新增 trustBadgeIconPaths)

## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED with fixes. 修复 4 项 issue: Home.vue 改用 stats.ts 数据驱动（消除硬编码 stats/trust badges）、Task checklist 全部勾选、移除 AI 模型名称、补充 Change Log。53 测试通过。
