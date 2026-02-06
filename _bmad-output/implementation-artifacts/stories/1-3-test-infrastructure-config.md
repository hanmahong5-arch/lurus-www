# Story 1.3: 测试基础设施配置

Status: done

## Story

As a 开发者,
I want 项目配置好 Vitest 和 Playwright 测试框架,
so that 我可以编写和运行单元测试、组件测试和 E2E 测试。

## Acceptance Criteria

1. **AC1**: 配置文件存在:
   - vitest.config.ts (Vitest 配置，含 @vue/test-utils)
   - playwright.config.ts (Playwright 配置)

2. **AC2**: package.json 包含测试脚本:
   - `test:unit` 运行 Vitest
   - `test:e2e` 运行 Playwright
   - `test` 运行所有测试

3. **AC3**: 依赖已安装: vitest, @vue/test-utils, playwright, @axe-core/playwright

4. **AC4**: `bun run test:unit` 成功启动

## Tasks

- [x] Task 1: 安装测试依赖
- [x] Task 2: 创建 vitest.config.ts
- [x] Task 3: 创建 playwright.config.ts
- [x] Task 4: 添加 package.json 脚本
- [x] Task 5: 创建示例测试文件
- [x] Task 6: 验证测试运行

## Dev Notes

- ADR-011: 测试策略 (Vitest 4.x + Playwright 1.58 + @axe-core/playwright)
- 使用 happy-dom 作为 Vitest 环境（轻量级）

## Dev Agent Record

### Completion Notes

- Installed: vitest, @vue/test-utils, happy-dom, @playwright/test, @axe-core/playwright
- Created vitest.config.ts with happy-dom environment
- Created playwright.config.ts with webServer and a11y testing
- Added test scripts to package.json
- Created 7 unit tests (all passing)
- Created e2e test skeleton with accessibility checks

### Verification

```
npm run test:unit → 7 passed (617ms)
```

### File List

**Created:**
- vitest.config.ts
- playwright.config.ts
- src/data/navItems.test.ts
- src/data/products.test.ts
- e2e/home.spec.ts

**Modified:**
- package.json (test scripts + devDependencies)

## Change Log

- 2026-02-06: Senior Developer Review (AI) — APPROVED. Task checkboxes corrected, AI model name removed.
