# Story 2.3: 下拉菜单系统

Status: done

## Story

As a 访客,
I want 展开导航栏的下拉菜单查看产品和资源链接,
so that 我可以快速找到并访问感兴趣的内容。

## Acceptance Criteria

1. **AC1**: Products 下拉菜单显示: API, GuShen, Switch, Docs, Deaigc
2. **AC2**: Resources 下拉菜单显示: Portal, Docs
3. **AC3**: 点击菜单外部区域关闭下拉菜单
4. **AC4**: Escape 键关闭下拉菜单，焦点返回触发元素
5. **AC5**: 菜单数据从 src/data/navItems.ts 读取

## Tasks

- [x] Task 1: 更新 navigation types 支持 children (已有)
- [x] Task 2: 更新 navItems.ts 添加下拉菜单数据
- [x] Task 3: 创建 NavDropdown 组件
- [x] Task 4: 更新 Navbar.vue 集成下拉菜单
- [x] Task 5: 添加键盘和点击外部关闭

## Dev Agent Record


## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
