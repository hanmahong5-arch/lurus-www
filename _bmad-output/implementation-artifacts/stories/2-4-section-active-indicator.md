# Story 2.4: 区段活动指示器

Status: done

## Story

As a 访客,
I want 导航栏高亮显示当前所在区段,
so that 我知道自己在页面的哪个位置。

## Acceptance Criteria

1. **AC1**: IntersectionObserver 检测当前可见区段
2. **AC2**: 对应导航项显示活动状态 (`border-b-2 border-ochre`)
3. **AC3**: 多个区段同时可见时，取占据视口比例最大的区段
4. **AC4**: 指示器平滑过渡，无闪烁

## Tasks

- [x] Task 1: 创建 useActiveSection composable
- [x] Task 2: 在 Navbar 中集成活动状态显示
- [x] Task 3: 添加平滑过渡样式

## Dev Agent Record

### Implementation Plan

- Task 1: `useActiveSection` composable 使用 IntersectionObserver 检测 products/features/portal 三个区段的可见比例，自动取最大比例的区段作为活动区段（AC1, AC3）
- Task 2: Navbar.vue 通过 `isNavItemActive()` 将活动状态传给 NavDropdown 的 `active` prop，NavDropdown 根据 active 显示 `border-ochre` 或 `border-transparent`（AC2）
- Task 3: NavDropdown 按钮始终保留 `border-b-2`，活动/非活动切换仅变更 border 颜色（ochre ↔ transparent），配合 `transition-all duration-200` 实现平滑过渡，避免 border 出现/消失引起的布局跳动（AC4）

### Completion Notes

- useActiveSection composable 已完整实现，含 11 项阈值、rootMargin 偏移、Map 追踪比例
- NavDropdown 修复了非活动状态缺少 border-b-2 的问题（改用 border-transparent 占位），确保状态切换无布局跳动
- 新增 11 个 useActiveSection 单元测试，7 个 NavDropdown 单元测试
- 全量 53 个测试通过，零回归

## File List

- `src/composables/useActiveSection.ts` — 修改（移除 features、提取常量、添加类型守卫）
- `src/composables/__tests__/useActiveSection.test.ts` — 新增（review 后更新：移除 features 相关用例）
- `src/components/Layout/NavDropdown.vue` — 修改（border 始终存在颜色切换；review 后移除死代码 emit）
- `src/components/Layout/__tests__/NavDropdown.test.ts` — 新增
- `src/components/Layout/Navbar.vue` — 修改（集成 useActiveSection + isNavItemActive + sectionMap）

## Change Log

- 2026-02-06: 完成 Story 2.4 所有 3 个 Task，新增 18 个测试（11 composable + 7 component），修复 NavDropdown 平滑过渡问题
- 2026-02-06: Senior Developer Review (AI) — APPROVED with fixes. 修复 8 项 issue: 移除未映射的 features section 观察（UX 空隙）、提取魔法数字为常量、添加 SectionId 类型守卫、移除 NavDropdown 死代码 emit、修正 File List 文档（Navbar.vue 实际有修改）。53 测试通过，零回归。
